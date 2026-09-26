import { getAuth } from '@clerk/express'
import type { Request, Response, NextFunction } from 'express'
import { getLocalUser } from '../lib/users'
import { isStaff } from '../lib/roles'
import { db } from '../db'
import { orderItems, orders, products, users } from '../db/schema'
import { asc, desc, eq, inArray } from 'drizzle-orm'
import {
  getStreamChatServer,
  streamChatDisplayName,
  streamUSerId
} from '../lib/stream'

import { getEnv } from '../lib/env'

const env = getEnv()

export async function listOrders (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, isAuthenticated } = getAuth(req)
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const localUser = await getLocalUser(userId)
    if (!localUser) {
      res.status(503).json({ error: 'Account not synced yet.' })
      return
    }

    const rows = isStaff(localUser.role)
      ? await db.select().from(orders).orderBy(desc(orders.createdAt))
      : await db
          .select()
          .from(orders)
          .where(eq(orders.userId, localUser.id))
          .orderBy(desc(orders.createdAt))

    const ordersIds = rows.map(o => o.id)
    const previewByOrder = new Map()

    if (ordersIds.length > 0) {
      const itemRows = await db
        .select({
          orderId: orderItems.orderId,
          quantity: orderItems.quantity,
          name: products.name,
          slug: products.slug,
          imageUrl: products.imageUrl
        })
        .from(orderItems)
        .innerJoin(products, eq(orderItems.productId, products.id))
        .where(inArray(orderItems.orderId, ordersIds))
        .orderBy(asc(orderItems.id))

      for (const row of itemRows) {
        const list = previewByOrder.get(row.orderId) ?? []
        list.push({
          name: row.name,
          slug: row.slug,
          imageUrl: row.imageUrl,
          quantity: row.quantity
        })
        previewByOrder.set(row.orderId, list)
      }
    }

    const ordersPayload = rows.map(o => ({
      ...o,
      previwsItems: previewByOrder.get(o.id) ?? []
    }))

    res.status(201).json({ orders: ordersPayload })
  } catch (error) {
    next(error)
  }
}

export async function getOrder (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, isAuthenticated } = getAuth(req)
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const localUser = await getLocalUser(userId)
    if (!localUser) {
      res.status(503).json({ error: 'Account not synced yet.' })
      return
    }

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, req.params.id as string))
      .limit(1)

    if (!order) {
      res.status(404).json({ error: 'Not found.' })
      return
    }

    const canAccess = order.userId === localUser.id || isStaff(localUser.role)
    if (!canAccess) {
      res.status(404).json({ error: 'Not found.' })
      return
    }

    const items = await db
      .select({
        id: orderItems.id,
        quantity: orderItems.quantity,
        price: orderItems.unitPriceCents,
        product: products
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, order.id))

    res.json({ order, items })
  } catch (error) {
    next(error)
  }
}

export async function createStreamChannel (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, isAuthenticated } = getAuth(req)
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const server = getStreamChatServer(env)

    const localUser = await getLocalUser(userId)
    if (!localUser) {
      res.status(503).json({ error: 'Account not synced yet.' })
      return
    }

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, req.params.id as string))
      .limit(1)

    if (!order) {
      res.status(404).json({ error: 'Not found.' })
      return
    }

    const isOwner = order.userId === localUser.id
    if (!isOwner && !isStaff(localUser.role)) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    if (order.status !== 'paid') {
      res
        .status(403)
        .json({ error: 'Order must be paid to open support chat.' })
      return
    }

    const streamChatUserId = streamUSerId(userId)

    await server.upsertUser({
      id: streamChatUserId,
      name: streamChatDisplayName(
        localUser.role,
        localUser.displayName,
        localUser.email
      )
    })

    const channelId = `order-${order.id}`

    const channelData = {
      name: `Support . order ${order.id.slice(0, 8)}`,
      created_by_id: streamChatUserId
    }

    const channel = server.channel('messaging', channelId, channelData)

    await channel.create()

    await channel.addMembers([streamChatUserId])

    res.json({
      channelType: 'messaging',
      channelId,
      streamUSerId: streamChatUserId
    })
  } catch (error) {
    next(error)
  }
}


declare module 'stream-chat' {
  interface CustomMessageData {
    video_invite?: boolean
    join_url?: string
  }
}

export async function createVideoInvite (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, isAuthenticated } = getAuth(req)
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const server = getStreamChatServer(env)

    const localUser = await getLocalUser(userId)
    if (!localUser) {
      res.status(503).json({ error: 'Account not synced yet.' })
      return
    }

    if (!isStaff(localUser.role)) {
      res
        .status(403)
        .json({ error: 'Only support or admin can send a video invite.' })
      return
    }

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, req.params.id as string))
      .limit(1)

    if (!order || order.status !== 'paid') {
      res.status(404).json({ error: 'Order not found or not paid.' })
      return
    }

    const [owner] = await db
      .select()
      .from(users)
      .where(eq(users.id, order.userId))
      .limit(1)

    const customerSid = streamUSerId(owner.clerkUserId)
    await server.upsertUser({
      id: customerSid,
      name: owner.displayName ?? owner.email ?? 'Customer'
    })

    const staffStreamUserId = streamUSerId(userId)
    await server.upsertUser({
      id: staffStreamUserId,
      name: streamChatDisplayName(
        localUser.role,
        localUser.displayName,
        localUser.email
      )
    })

    const channelId = `order-${order.id}`
    const channelData = {
      name: `Support . order ${order.id.slice(0, 8)}`,
      created_by_id: customerSid
    }
    const channel = server.channel('messaging', channelId, channelData)

    await channel.create()
    await channel.addMembers([customerSid, staffStreamUserId])

    const joinUrl = `${env.FRONTEND_URL.replace(/\/+$/, '')}/orders/${
      order.id
    }/call`

    await channel.sendMessage({
      text: `Video call - tap Join below (same link for every one): ${joinUrl}`,
      user_id: staffStreamUserId,
      video_invite: true,
      join_url: joinUrl
    })
  } catch (error) {
    next(error)
  }
}

import { getAuth } from '@clerk/express'
import type { Request, Response, NextFunction } from 'express'
import { getLocalUser } from '../lib/users'
import { isAdmin } from '../lib/roles'
import ImageKit from '@imagekit/nodejs'
import { getEnv } from '../lib/env'
import { db } from '../db'
import { orderItems, products } from '../db/schema'
import { count, desc, eq } from 'drizzle-orm'
import { productsSchema, productUpdate } from '../lib/types'
import z from 'zod'
import { deleteImageKitAssest } from '../lib/imageKit'

const env = getEnv()

function buildProductUpdateSet (body: z.infer<typeof productUpdate>) {
  const data: Partial<typeof products.$inferInsert> = {}
  if (body.slug !== undefined) data.slug = body.slug
  if (body.name !== undefined) data.name = body.name
  if (body.category !== undefined) data.category = body.category
  if (body.description !== undefined) data.description = body.description
  if (body.priceCents !== undefined) data.price = body.priceCents
  if (body.currency !== undefined) data.currency = body.currency
  if (body.imageUrl !== undefined)
    data.imageUrl = body.imageUrl === '' ? null : body.imageUrl
  if (body.imageKitFieldId !== undefined)
    data.imageKitField =
      body.imageKitFieldId === '' ? null : body.imageKitFieldId
  if (body.active !== undefined) data.active = body.active
  return data
}

export async function requireAdmin (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, isAuthenticated } = getAuth(req)
    if (!isAuthenticated || !userId) {
      res.status(401).json({ error: 'Unauthorized.' })
      return
    }

    const user = await getLocalUser(userId)

    if (!isAdmin(user.role)) {
      res.status(403).json({ error: 'Admin only.' })
      return
    }
    next()
  } catch (error) {
    next(error)
  }
}

export function getImageKitAuth (
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const client = new ImageKit({ privateKey: env.IMAGEKIT_PRIVATE_KEY })

    const auth = client.helper.getAuthenticationParameters()

    res.json({
      ...auth,
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      URLEndpoints: env.IMAGEKIT_URL_ENDPOINT
    })
  } catch (error) {
    next(error)
  }
}

export async function listAdminProducts (
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const rows = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
    res.json({ products: rows })
  } catch (error) {
    next(error)
  }
}

export async function createAdminProducts (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = productsSchema.safeParse(req.body)
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: 'Invalid body', details: parsed.error.flatten() })
      return
    }

    const { imageUrl, imageKitFieldId, ...rest } = parsed.data
    const [row] = await db
      .insert(products)
      .values({
        ...rest,
        price: parsed.data.priceCents,
        imageUrl: imageUrl || null,
        imageKitField: imageKitFieldId || null
      })
      .returning()

    res.status(201).json({ product: row })
  } catch (error) {
    next(error)
  }
}

export async function updateAdminProduct (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = productUpdate.safeParse(req.body)
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: 'Invalid body', details: parsed.error.flatten() })
      return
    }

    const data = buildProductUpdateSet(parsed.data)

    if (Object.keys(data).length === 0) {
      res.status(400).json({ error: 'No fields to update.' })
      return
    }

    const [row] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, req.params.id as string))
      .returning()

    if (!row) {
      res.status(404).json({ error: 'Not found.' })
      return
    }

    res.json({ product: row })
  } catch (error) {
    next(error)
  }
}

export async function deleteAdminProduct (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id as string

    const [[exciting], [countRow]] = await Promise.all([
      db.select().from(products).where(eq(products.id, id)),
      db
        .select({ c: count() })
        .from(orderItems)
        .where(eq(orderItems.productId, id))
    ])

    if (!exciting) return res.status(404).json({ error: 'Not found.' })

    if (Number(countRow?.c ?? 0) > 0) {
      return res.status(409).json({
        error:
          'This product in one or more orders and cannot be deleted. Deactivate it instead.'
      })
    }

    await deleteImageKitAssest(env, exciting.imageKitField)
    await db.delete(products).where(eq(products.id, id))

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}


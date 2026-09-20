import type { Request, Response, NextFunction } from 'express'
import { getEnv } from '../lib/env'
import { getAuth } from '@clerk/express'
import { cartSchema } from '../lib/types'
import { getLocalUser } from '../lib/users'
import { db } from '../db'
import { checkoutSessions, products } from '../db/schema'
import { and, eq, inArray } from 'drizzle-orm'
import { CheckoutLine } from '../db/schema'
import { polarCreateCheckout } from '../lib/polar'

const env = getEnv()

export async function createCheckout (
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

    const parseData = cartSchema.safeParse(req.body)
    if (!parseData.success) {
      res
        .status(400)
        .json({ error: 'Invalid Cart', details: parseData.error.flatten() })
      return
    }

    if (!env.POLAR_ACCESS_TOKEN) {
      res.status(503).json({ error: 'Payments are not configured.' })
      return
    }

    const localUser = await getLocalUser(userId)
    if (!localUser) {
      res.status(503).json({ error: 'Account not synced yet.' })
      return
    }

    const uniqueIds = [...new Set(parseData.data.items.map(i => i.productId))]

    const prodRows = await db
      .select()
      .from(products)
      .where(and(inArray(products.id, uniqueIds), eq(products.active, true)))

    if (prodRows.length !== uniqueIds.length) {
      res.status(400).json({ error: 'One or more products are invalid.' })
      return
    }

    const byId = new Map(prodRows.map(p => [p.id, p]))
    let totalCents = 0
    const lines: CheckoutLine[] = []

    for (const line of parseData.data.items) {
      const p = byId.get(line.productId)

      if (!p) {
        res.status(400).json({ error: 'Product not found in store.' })
        return
      }

      totalCents += p.price * line.quantity

      lines.push({
        productId: p.id,
        quantity: line.quantity,
        unitPriceCents: p.price
      })
    }

    if (totalCents < 10) {
      res.status(400).json({
        error: 'Total below Polar minimum (e.g. USD requires at least 10 cents)'
      })
      return
    }

    const [session] = await db
      .insert(checkoutSessions)
      .values({
        userId: localUser.id,
        lines,
        totalCents,
        currency: 'usd'
      })
      .returning()

    const successUrl = `${env.FRONTEND_URL}/checkout/return?checkout_id={CHECKOUT_ID}`
    const returnUrl = `${env.FRONTEND_URL}/cart`

    const checkout = await polarCreateCheckout(env, {
      products: [env.POLAR_CHEKOUT_PRODUCT_ID],
      prices: {
        [env.POLAR_CHEKOUT_PRODUCT_ID]: [
          {
            amount_type: 'fixed',
            price_currency: 'usd',
            price_amount: totalCents
          }
        ]
      },
      success_url: successUrl,
      return_url: returnUrl,
      external_customer_id: userId,
      metadata: { checkout_session_id: session.id }
    })

    await db
      .update(checkoutSessions)
      .set({ polarCheckoutId: checkout.id })
      .where(eq(checkoutSessions.id, session.id))

    res.json({ checkoutUrl: checkout.url })
  } catch (error) {
    next(error)
  }
}

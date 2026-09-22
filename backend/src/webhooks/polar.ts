import { Request, Response } from 'express'
import { getEnv } from '../lib/env'
import { checkoutSessions, orderItems, orders } from '../db/schema'
import { db } from '../db'
import { eq, or } from 'drizzle-orm'
import { Webhook } from 'standardwebhooks'

const getHeader = (req: Request, name: string): string | undefined => {
  const val = req.headers[name]
  return Array.isArray(val) ? val[0] : val
}

export async function polarWebhookHandler (req: Request, res: Response) {
  const env = getEnv()

  if (!env.POLAR_WEBHOOK_SECRET) {
    return res.status(503).send('Polar webhooks not configured.')
  }

  try {
    const id = getHeader(req, 'webhooks-id')
    const ts = getHeader(req, 'webhooks-timestamp')
    const sig = getHeader(req, 'webhooks-signature')

    if (!id || !ts || !sig) {
      return res.status(400).json({ error: 'Missing webhook headers.' })
    }

    const raw =
      req.body instanceof Buffer ? req.body : Buffer.from(String(req.body))
    new Webhook(
      Buffer.from(env.POLAR_WEBHOOK_SECRET, 'utf-8').toString('base64')
    ).verify(raw, {
      'webhook-id': id,
      'webhook-timestamp': ts,
      'webhook-signature': sig
    })

    const event = JSON.parse(raw.toString('utf-8'))

    if (event.type === 'order.paid' && event.data) {
      const data = event.data
      const polarOrderId = data.id
      const checkoutId = data.checkout_id
      const sessionId = data.metadata?.checkout_session_id

      if (!sessionId) {
        return res.json({ ok: true })
      }

      const [existingOrder] = await db
        .select()
        .from(orders)
        .where(
          or(
            polarOrderId ? eq(orders.polarOrderId, polarOrderId) : undefined,
            checkoutId ? eq(orders.polarCheckoutId, checkoutId) : undefined
          )
        )
        .limit(1)

      if (existingOrder?.status === 'paid') {
        return res.json({ ok: true, duplicate: true })
      }

      const success = await db.transaction(async tx => {
        const [session] = await tx
          .select()
          .from(checkoutSessions)
          .where(eq(checkoutSessions.id, sessionId))
          .for('update')
        if (!session) return false

        const [newOrder] = await tx
          .insert(orders)
          .values({
            userId: session.userId,
            status: 'paid',
            totalCents: session.totalCents,
            polarCheckoutId: checkoutId ?? session.polarCheckoutId ?? null,
            polarOrderId: polarOrderId ?? null
          })
          .returning()

        if (session.lines?.length) {
          await tx.insert(orderItems).values(
            session.lines.map((line: any) => ({
              orderId: newOrder.id,
              productId: line.productId,
              quantity: line.quantity,
              unitPriceCents: line.unitPriceCents
            }))
          )
        }

        await tx
          .delete(checkoutSessions)
          .where(eq(checkoutSessions.id, sessionId))
        return true
      })

      if (!success) {
        console.error('Polar fulfillment failed for session:', sessionId)
        return res.status(500).json({ error: 'Checkout fulfillment failed.' })
      }

      return res.json({ ok: true, duplicate: true })
    }

    return res.json({ ok: true })
  } catch (error) {
    console.error('Polar webhook error', error)
    return res.status(400).json({ error: 'Invalid webhook' })
  }
}

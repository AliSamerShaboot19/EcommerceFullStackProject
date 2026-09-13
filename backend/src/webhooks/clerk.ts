import type { Request, Response } from 'express'
import { verifyWebhook } from '@clerk/express/webhooks' // التحديث هنا 👈
import { parseRole } from '../lib/roles'
import { db } from '../db/index'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

export async function clerkWebhookHandler (req: Request, res: Response) {
  try {
    const evt = await verifyWebhook(req)

    if (evt.type === 'user.created' || evt.type === 'user.updated') {
      const user = evt.data

      const email =
        user.email_addresses?.find(e => e.id === user.primary_email_address_id)
          ?.email_address ?? user.email_addresses?.[0]?.email_address

      const displayName =
        [user.first_name, user.last_name].filter(Boolean).join(' ') ||
        user.username ||
        'User'

      const role = parseRole(user.public_metadata?.role)

      await db
        .insert(users)
        .values({ clerkUserId: user.id, email, displayName, role })
        .onConflictDoUpdate({
          target: users.clerkUserId,
          set: { email, displayName, role, updatedAt: new Date() }
        })
    }

    if (evt.type === 'user.deleted') {
      const id = evt.data.id
      if (id) {
        await db.delete(users).where(eq(users.clerkUserId, id))
      }
    }

    res.json({ ok: true })
  } catch (error) {
    console.error('Clerk webhook error:', error)
    res.status(400).json({ error: 'Invalid webhook' })
  }
}

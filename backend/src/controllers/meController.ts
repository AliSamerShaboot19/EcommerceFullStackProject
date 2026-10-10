import { getAuth } from '@clerk/express'
import type { Request, Response, NextFunction } from 'express'
import { getLocalUser } from '../lib/users'
export async function getMe (req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, isAuthenticated } = getAuth(req)
    if (!isAuthenticated || !userId) {
      res.status(401).json('Unauthorized.')
      return
    }
    const user = await getLocalUser(userId)
    res.json({ user })
  } catch (e) {
    if (e instanceof Error && 'cause' in e) {
      console.error('=== REAL DATABASE ERROR ===')
      console.error('Query:', e.message)
      console.error('Cause:', (e as any).cause)
      console.error('SQLSTATE Code:', (e.cause as any)?.code)
    }

    next(e)
  }
}

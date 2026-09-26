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
  } catch (error) {
    next(error)
  }
}

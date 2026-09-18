import { eq } from 'drizzle-orm'
import { db } from '../db/index'
import { users } from '../db/schema'

export async function getLocalUser (clerkUserId: string) {
  const [raw] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .limit(1)

  return raw
}

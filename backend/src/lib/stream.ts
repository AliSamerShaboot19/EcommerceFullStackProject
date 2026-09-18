import { StreamChat } from 'stream-chat'
import type { ENV } from '../lib/env'
import type { UserRole } from '../db/schema'

export function streamChatDisplayName (
  role: UserRole,
  displayName: string | null,
  email: string
): string {
  const base = displayName ?? email.split('@')[0]
  if (role === 'admin') return `Admin . ${base}`
  if (role === 'support') return `Support . ${base}`
  return base
}

export function getStreamChatServer (env: ENV) {
  return StreamChat.getInstance(env.STREAM_API_KEY, env.STREAM_API_SECRET)
}

export function streamUSerId (clerkUserId: string) {
  return `clerk_${clerkUserId}`
}


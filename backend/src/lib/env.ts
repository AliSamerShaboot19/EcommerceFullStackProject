import { z } from 'zod'
import { envSchema } from './types'

export type ENV = z.infer<typeof envSchema>

export function loadEnv () {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors)
    throw new Error('Inavlid environment variables.')
  }

  return parsed.data
}

let cachedEnv: ENV | null = null

export function getEnv () {
  if (!cachedEnv) {
    cachedEnv = loadEnv()
  }
  return cachedEnv
}

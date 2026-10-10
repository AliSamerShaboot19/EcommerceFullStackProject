import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import dns from 'node:dns'

// 🚀 مهم جداً: IPv4 أولاً لتجنب IPv6 blackhole
dns.setDefaultResultOrder('ipv4first')

// 🎯 التحقق من وجود DATABASE_URL قبل المتابعة
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables')
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,

  max: 10,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 15000,

  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,

  ssl: { rejectUnauthorized: false }
})

pool.on('error', err => {
  console.error('[DB Pool] Unexpected error on idle client:', err.message)
})

pool.on('connect', () => {
  console.log('[DB Pool] New client connected')
})

pool.on('remove', () => {
  console.log('[DB Pool] Client removed from pool')
})

export const db = drizzle(pool)

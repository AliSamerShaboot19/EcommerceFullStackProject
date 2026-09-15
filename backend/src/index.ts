import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import fs from 'fs'

import { clerkMiddleware } from '@clerk/express'
import { clerkWebhookHandler } from './webhooks/clerk'
import { getEnv } from './lib/env'
import job from './lib/cron'

const app = express()
const env = getEnv()

const rawjson = express.raw({ type: 'application/json', limit: '1mb' })

app.use('/webhooks/clerk', rawjson, (req, res) => {
  void clerkWebhookHandler(req, res)
})

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

const publicDir = path.join(process.cwd(), 'public')
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir))

  app.get('/*any', (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next()
    }

    if (req.path.startsWith('/api') || req.path.startsWith('/webhooks')) {
      return next()
    }

    res.sendFile(path.join(publicDir, 'index.html'), err => {
      if (err) {
        next(err)
      }
    })
  })
}

app.listen(env.PORT, () => {
  console.log('Server is running on port : ', env.PORT)
  if (env.NODE_ENV === 'production') job.start()
})

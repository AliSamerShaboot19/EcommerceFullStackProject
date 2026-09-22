import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'dotenv/config'

import { clerkMiddleware } from '@clerk/express'
import { clerkWebhookHandler } from './webhooks/clerk'
import { getEnv } from './lib/env'
import job from './lib/cron'

import * as Sentry from '@sentry/node'

import meRouter from './routes/meRouter'
import productRouter from './routes/productRouter'
import streamRouter from './routes/streamRouter'
import checkoutRouter from './routes/checkoutRouter'
import { configureSpaRouting } from './routes/spaRouter'
import { polarWebhookHandler } from './webhooks/polar'
import { sentryClerkUserMiddleware } from './middleware/sentryClerkUser'

const app = express()
const env = getEnv()

const rawjson = express.raw({ type: 'application/json', limit: '1mb' })

app.use('/webhooks/clerk', rawjson, (req, res) => {
  void clerkWebhookHandler(req, res)
})

app.use('/webhooks/polar', rawjson, (req, res) => {
  void polarWebhookHandler(req, res)
})

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())
app.use(sentryClerkUserMiddleware)

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/me', meRouter)
app.use('/api/products', productRouter)
app.use('/api/stream', streamRouter)
app.use('/api/checkout', checkoutRouter)

configureSpaRouting(app)

Sentry.setupExpressErrorHandler(app)
app.use((_err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const sentryId = (res as express.Response & { sentry?: string }).sentry

  res.status(500).json({
    error: 'Internal server error.',
    ...(sentryId !== undefined && { sentryId })
  })
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.listen(env.PORT, () => {
  console.log('Server is running on port : ', env.PORT)
  if (env.NODE_ENV === 'production') job.start()
})

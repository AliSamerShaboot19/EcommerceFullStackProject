import 'dotenv/config'
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

const dsn = process.env.SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? 'development',
    integrations: [nodeProfilingIntegration()],
    enableLogs: true,
    tracesSampleRate: 1.0,
    profileLifecycle: 'trace',
    sendDefaultPii: true,
  })
}

import 'dotenv/config'
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

const dsn = process.env.SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn:"https://5ad3326dca388fffe42b697a6ca8e975@o4512056223858688.ingest.us.sentry.io/4512056244502528",
    environment: process.env.NODE_ENV ?? 'development',
    integrations: [nodeProfilingIntegration()],
    enableLogs: true,
    tracesSampleRate: 1.0,
    profileLifecycle: 'trace',
    sendDefaultPii: true,
    debug:true
  })
}

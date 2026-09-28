import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Sentry from '@sentry/react'
import { BrowserRouter } from 'react-router'
import { SentryErrorFallback } from './components/SentryErrorFallback.jsx'
import SentryUserSync from './components/SentryUserSync.jsx'

const queryClient = new QueryClient()

const apiBase = import.meta.env.VITE_API_URL ?? ''

const tracePropagationTargets =
  apiBase.length > 0
    ? [apiBase]
    : typeof window !== 'undefined'
    ? [window.location.origin]
    : []

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  environment: import.meta.env.NODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false
    })
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
  sendDefaultPii: true
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider>
      <SentryUserSync />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Sentry.ErrorBoundary fallback={<SentryErrorFallback />}>
            <App />
          </Sentry.ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
)

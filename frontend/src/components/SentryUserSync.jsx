import { useEffect } from 'react'
import { useAuth } from '@clerk/react'
import * as Sentry from '@sentry/react'

const SentryUserSync = () => {
  const { isLoaded, userId } = useAuth()
  useEffect(() => {
    Sentry.setUser(userId ? { id: userId } : null)
  }, [isLoaded, userId])
  return null
}
export default SentryUserSync

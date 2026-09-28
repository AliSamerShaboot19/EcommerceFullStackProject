import { Link } from 'react-router'
import { AlertTriangle } from 'lucide-react'

export const SentryErrorFallback = () => {
  return (
    <div className='flex flex-col items-center justify-center p-6 w-full'>
      <div className='alert alert-error max-w-md rounded-box border border-base-300 bg-base-100 p-8 shadow-sm flex flex-col items-center text-center'>
        <AlertTriangle className='h-10 w-10 text-error mb-2' />

        <div>
          <h3 className='font-bold text-lg text-base-content'>
            Something went wrong!
          </h3>
          <p className='text-sm text-base-content/70 mt-1'>
            An unexpected error occurred. Our team has been notified.
          </p>
        </div>
      </div>

      <Link to='/' className='btn btn-primary btn-sm mt-6'>
        Back to shop
      </Link>
    </div>
  )
}

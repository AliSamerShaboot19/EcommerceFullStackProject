import { AlertTriangleIcon } from 'lucide-react'

export default function PageError ({ message, action }) {
  return (
    <div
      data-theme='night'
      className='flex items-center justify-center min-h-100 px-4 py-12 bg-base-100 text-base-content'
    >
      <div className='card w-full max-w-md bg-base-200 border border-base-300 shadow-2xl items-center text-center p-8 transition-all duration-300'>
        <div className='p-4 rounded-full bg-error/10 text-error mb-4 animate-pulse'>
          <AlertTriangleIcon className='w-12 h-12' aria-hidden='true' />
        </div>

        <h2 className='text-3xl font-black tracking-tight text-error mb-2'>
          Oops! Something went wrong
        </h2>

        <p className='text-sm text-base-content/70 leading-relaxed max-w-xs mt-2'>
          {message ||
            'We encountered an unexpected problem. Please verify details and try running the operation again.'}
        </p>

        {action && (
          <div className='card-actions mt-6 w-full'>
            <button
              onClick={action.onClick}
              className='btn btn-primary btn-block sm:btn-wide font-bold shadow-lg shadow-primary/20 transition-all duration-300 normal-case'
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

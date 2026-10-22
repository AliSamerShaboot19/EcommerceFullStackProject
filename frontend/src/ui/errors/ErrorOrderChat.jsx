import { AlertCircleIcon } from 'lucide-react'

const ErrorOrderChat = () => {
  return (
    <div
      data-theme='night'
      className='flex items-center justify-center min-h-[60vh] p-4'
    >
      <div className='card max-w-sm bg-base-100 shadow-2xl border border-error/20 text-center p-6 space-y-4'>
        <div className='w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto'>
          <AlertCircleIcon className='w-8 h-8' />
        </div>
        <div>
          <h3 className='text-lg font-bold text-error'>Connection Failed</h3>
          <p className='text-sm text-base-content/60 mt-1'>
            An error occurred while loading your message room channel. Please
            reload.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorOrderChat

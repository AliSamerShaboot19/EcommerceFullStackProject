import { AlertCircleIcon } from 'lucide-react'

const ErrorPaid = () => {
  return (
    <div
      data-theme='night'
      className='flex items-center justify-center min-h-[60vh] p-4'
    >
      <div className='card max-w-sm bg-base-100 shadow-2xl border border-base-200/50 text-center p-6 space-y-4'>
        <div className='w-16 h-16 bg-warning/10 text-warning rounded-full flex items-center justify-center mx-auto'>
          <AlertCircleIcon className='w-8 h-8' />
        </div>
        <div>
          <h3 className='text-lg font-bold'>Payment Required</h3>
          <p className='text-sm text-base-content/60 mt-1'>
            Please complete your payment process to unlock the order support
            live chat.
          </p>
        </div>
      </div>
    </div>
  )
}
export default ErrorPaid

import { Loader2Icon } from 'lucide-react'

const ErrorChannelClient = () => {
  return (
    <div
      data-theme='night'
      className='flex flex-col items-center justify-center min-h-[60vh] p-4 space-y-3'
    >
      <Loader2Icon className='w-10 h-10 text-primary animate-spin' />
      <p className='text-sm font-medium text-base-content/60'>
        Establishing secure streaming chat pipeline...
      </p>
    </div>
  )
}
export default ErrorChannelClient

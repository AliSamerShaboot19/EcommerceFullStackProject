import { LoaderIcon } from 'lucide-react'

const PageLoader = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-base-100/60 backdrop-blur-sm'>
      <div className='flex flex-col items-center gap-3 p-6 rounded-2xl bg-base-200 shadow-xl border border-base-300'>
        <LoaderIcon className='w-10 h-10 animate-spin text-primary' />
        <span className='text-sm font-medium text-base-content/70 tracking-wide'>
          Loading...
        </span>
      </div>
    </div>
  )
}

export default PageLoader

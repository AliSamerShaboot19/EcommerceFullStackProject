import { RefreshCcwIcon } from 'lucide-react'
import PageError from '../../components/PageError'

const ProductNotFound = () => {
  return (
    <PageError
      message={'Product not found.'}
      action={{
        onClick: () => window.location.reload(),
        label: (
          <span className='flex items-center gap-2 w-full'>
            <RefreshCcwIcon className='w-4 h-4' /> Try Again
          </span>
        )
      }}
    />
  )
}
export default ProductNotFound

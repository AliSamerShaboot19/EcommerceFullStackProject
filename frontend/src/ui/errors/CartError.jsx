import PageError from '../../components/PageError'
import { RefreshCcwIcon } from 'lucide-react'

const CartError = () => {
  return (
    <PageError
      message={
        'We encountered an issue while loading the your production catalog.'
      }
      action={{
        onClick: () => window.location.reload(),
        label: (
          <span className='flex items-center gap-2'>
            <RefreshCcwIcon className='w-4 h-4' /> Try Again
          </span>
        )
      }}
    />
  )
}

export default CartError

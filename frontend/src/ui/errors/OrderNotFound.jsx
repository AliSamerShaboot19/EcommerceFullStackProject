import PageError from '../../components/PageError'
import { RefreshCcwIcon } from 'lucide-react'

const OrderNotFound = () => {
  return (
    <PageError
      message={'Could not load orders.'}
      action={{
        onClick: () => window.location.reload(),
        label: (
          <button className='btn btn-primary btn-md shadow-lg shadow-primary/20 gap-2 normal-case rounded-xl'>
            <RefreshCcwIcon className='w-4 h-4 animate-spin-reverse' /> Try
            Again
          </button>
        )
      }}
    />
  )
}

export default OrderNotFound

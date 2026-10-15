import { ShoppingBagIcon } from 'lucide-react'
import { Link } from 'react-router'

const OrdersEmpty = () => {
  return (
    <div className='card bg-base-200/50 border border-base-300/80 rounded-2xl p-10 text-center max-w-md mx-auto shadow-xl backdrop-blur-sm'>
      <div className='w-16 h-16 bg-base-300/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500'>
        <ShoppingBagIcon className='w-8 h-8' />
      </div>
      <h3 className='text-xl font-bold mb-2'>No orders found</h3>
      <p className='text-sm text-slate-400 mb-6'>
        Looks like you haven't placed any orders yet.
      </p>
      <Link
        to={'/'}
        className='btn btn-primary btn-block normal-case rounded-xl shadow-lg shadow-primary/20'
      >
        Browse the Shop
      </Link>
    </div>
  )
}

export default OrdersEmpty

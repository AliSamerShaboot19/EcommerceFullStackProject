import { ShoppingBagIcon } from 'lucide-react'
import { Link } from 'react-router'

const CartEmpty = () => {
  return (
    <div className='card bg-base-200 shadow-xl border border-base-100 py-16 text-center'>
      <div className='card-body items-center'>
        <ShoppingBagIcon className='w-16 h-16 text-base-content/30 mb-4' />
        <h2 className='card-title text-2xl text-neutral-content font-bold mb-2'>
          Your cart is empty
        </h2>
        <p className='text-base-content/60 max-w-sm mb-6'>
          Looks like you haven't added anything to your cart yet.
        </p>
        <div className='card-actions'>
          <Link
            to='/'
            className='btn btn-primary btn-wide shadow-lg shadow-primary/20'
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartEmpty

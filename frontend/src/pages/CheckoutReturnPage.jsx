import { Link, useSearchParams } from 'react-router'
import { useCartStore } from '../store/cart'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  CheckCircleIcon,
  PackageIcon,
  MessageSquareIcon,
  VideoIcon,
  ExternalLinkIcon
} from 'lucide-react'

const CheckoutReturnPage = () => {
  const clearCart = useCartStore(s => s.clear)
  const [params] = useSearchParams()
  const checkoutId = params.get('checkout_id')
  const queryClient = useQueryClient()

  useEffect(() => {
    clearCart()
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  }, [queryClient, clearCart])

  return (
    <div className='min-h-screen  flex items-center justify-center p-4 antialiased selection:bg-primary selection:text-primary-content'>
      <div className='card w-full max-w-lg bg-base-100 shadow-2xl border border-neutral overflow-hidden transform transition-all duration-350 hover:scale-[1.01]'>
        <div className='h-1.5 bg-linear-to-r from-success to-primary w-full' />

        <div className='card-body items-center text-center p-8 sm:p-12'>
          <div className='w-20 h-20 bg-success/10 text-success border border-success/20 rounded-full flex items-center justify-center mb-4 shadow-inner animate-pulse'>
            <CheckCircleIcon className='w-12 h-12 stroke-[2.5]' />
          </div>

          <h1 className='card-title text-3xl font-black tracking-tight text-base-content mb-2'>
            Thank You for Your Order!
          </h1>

          <div className='text-base-content/80 text-sm sm:text-base max-w-md mb-6 leading-relaxed flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2'>
            <span>
              Your order was successfully created and processed after your
            </span>
            <span className='text-success font-bold drop-shadow-[0_0_6px_rgba(34,197,94,0.2)]'>
              payment
            </span>
            .<span>It fully supports text features via</span>
            <span className='inline-flex items-center gap-1 text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded-md select-none'>
              <MessageSquareIcon className='w-4 h-4' /> support chat
            </span>
            <span>as well as live sessions with a</span>
            <span className='inline-flex items-center gap-1 text-accent font-bold bg-accent/10 px-2 py-0.5 rounded-md select-none'>
              <VideoIcon className='w-4 h-4' /> video URL invite
            </span>
            .
          </div>

          {checkoutId && (
            <div className='w-full bg-neutral/40 rounded-xl p-3 font-mono text-xs text-base-content/60 border border-neutral mb-6 flex justify-between items-center px-4'>
              <span className='font-sans opacity-50'>Order ID:</span>
              <span className='text-base-content/90 tracking-wide select-all font-semibold'>
                {checkoutId}
              </span>
            </div>
          )}

          <div className='w-full mb-6'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-xs font-semibold text-success shadow-sm'>
              <span className='w-2 h-2 rounded-full bg-success animate-pulse' />
              Transaction Status:{' '}
              <span className='text-success uppercase tracking-wider font-bold ml-1'>
                Paid
              </span>
            </div>
          </div>

          <div className='divider opacity-20 my-0 w-full' />

          <div className='card-actions w-full mt-6'>
            <Link
              to='/orders'
              className='btn btn-primary btn-block shadow-lg shadow-primary/10 gap-2 font-bold group text-base'
            >
              <PackageIcon className='w-5 h-5 transition-transform group-hover:-translate-y-0.5' />
              View Your Orders
              <ExternalLinkIcon className='w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutReturnPage

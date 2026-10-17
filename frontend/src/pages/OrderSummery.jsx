import { ListOrderedIcon, PackageIcon } from 'lucide-react'
import { Link, useOutletContext } from 'react-router'
import { getOptimizedImageUrl } from '../lib/imageKitUrl'
import { formatPrice } from '../utils/format'

const OrderSummery = () => {
  const { order, items } = useOutletContext()

  return (
    <div className='w-full space-y-4 text-base-content antialiased animate-fade-in'>
      <div className='bg-base-100 rounded-3xl border border-neutral/60 shadow-xl overflow-hidden divide-y divide-neutral/30'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-base-200/40 rounded-t-3xl p-6 border-b border-neutral/30 shadow-inner'>
          <div className='flex items-center gap-3'>
            <div className='p-2.5 bg-primary/10 rounded-xl text-primary drop-shadow-sm'>
              <ListOrderedIcon className='w-5 h-5' />
            </div>
            <div>
              <h2 className='text-lg font-black tracking-tight'>Order Items</h2>
              <p className='text-xs text-base-content/60 font-semibold mt-0.5'>
                {items.length} {items.length === 1 ? 'product' : 'products'} in
                total
              </p>
            </div>
          </div>
          <div className='badge badge-neutral font-bold tracking-wide px-3 py-2.5 uppercase text-[10px] shadow-sm'>
            Summary View
          </div>
        </div>

        <ul className='divide-y divide-neutral/30 m-0 p-0 list-none'>
          {items.map(o => (
            <li
              key={o.id}
              className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 hover:bg-neutral/5 transition-colors duration-200'
            >
              <div className='flex items-center gap-5 w-full sm:w-auto'>
                <div className='relative shrink-0 w-20 h-20 bg-neutral/20 rounded-2xl border border-neutral/40 overflow-hidden flex items-center justify-center shadow-inner group'>
                  <Link
                    to={`/products/${o.product.slug}`}
                    className='w-full h-full p-2 flex items-center justify-center'
                  >
                    {o.product.imageUrl ? (
                      <img
                        src={getOptimizedImageUrl(o.product.imageUrl, 120)}
                        alt={o.product.name}
                        loading='lazy'
                        decoding='async'
                        className='object-contain w-full h-full transform transition-transform duration-300 group-hover:scale-105'
                      />
                    ) : (
                      <PackageIcon className='w-8 h-8 text-base-content/30 stroke-[1.5]' />
                    )}
                  </Link>
                </div>

                <div className='space-y-1.5 min-w-0 flex-1'>
                  <Link
                    to={`/products/${o.product.slug}`}
                    className='text-base sm:text-lg font-bold tracking-tight text-base-content hover:text-primary transition-colors block truncate'
                  >
                    {o.product.name}
                  </Link>
                  {o.product.category && (
                    <span className='badge badge-outline badge-sm font-semibold opacity-70 px-2.5 py-2 uppercase tracking-wider text-[10px]'>
                      {o.product.category}
                    </span>
                  )}
                  <div className='flex items-center gap-2 text-xs font-semibold text-base-content/60 bg-neutral/10 w-fit px-2.5 py-1 rounded-md shadow-inner'>
                    <span>Qty {o.quantity}</span>
                    <span className='opacity-40 select-none'>•</span>
                    <span className='text-base-content/80'>
                      {formatPrice(o.price, o.product.currency)} each
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral/20 shrink-0'>
                <span className='text-xs font-bold uppercase tracking-wider text-base-content/40 sm:hidden'>
                  Subtotal
                </span>
                <div className='text-lg font-black tracking-tight text-base-content sm:text-right drop-shadow-sm'>
                  {formatPrice(o.price * o.quantity, o.product.currency)}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className='p-6 bg-neutral/10 flex items-center justify-between gap-4'>
          <div className='space-y-0.5'>
            <span className='text-sm uppercase font-bold tracking-wider text-base-content/50'>
              Total Amount
            </span>
            <p className='text-xs text-base-content/40 font-medium hidden sm:block'>
              Includes all item taxes and service adjustments
            </p>
          </div>
          <div className='text-3xl font-black tracking-tight text-success drop-shadow-[0_0_12px_rgba(34,197,94,0.12)]'>
            {formatPrice(order.totalCents, 'usd')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummery

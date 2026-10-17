import { Link, NavLink, Outlet } from 'react-router'
import { useOrderDetails } from '../hooks/useOrderDetails'
import OrderNotFound from '../ui/errors/OrderNotFound'
import OrderSkelton from '../ui/skeletons/OrderSkelton'
import {
  ArrowLeftIcon,
  LayoutListIcon,
  LockIcon,
  MessageCircle
} from 'lucide-react'
import { formatOrderWhen, formatPrice } from '../utils/format'

const OrderDetails = () => {
  const { error, order, isLoading, id, items, paid } = useOrderDetails()

  if (isLoading) {
    return <OrderSkelton />
  }

  if (error || !order) {
    return <OrderNotFound />
  }

  return (
    <div className='w-full max-w-5xl mx-auto p-4 sm:p-8 text-base-content antialiased space-y-6 animate-fade-in'>
      <Link
        to='/orders'
        className='btn btn-ghost btn-sm gap-2 pl-2 hover:bg-neutral/10 font-bold transition-all w-fit text-base-content/70 hover:text-base-content'
      >
        <ArrowLeftIcon className='w-4 h-4' />
        Back to orders
      </Link>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'>
        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-base-100 rounded-3xl border border-neutral/60 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden'>
            <div className='space-y-2'>
              <span className='badge badge-outline badge-primary font-bold tracking-wide uppercase px-3 py-2.5 text-[10px] shadow-sm shadow-primary/5'>
                Order Details
              </span>
              <h1 className='text-3xl font-black tracking-tight leading-none text-base-content mt-1'>
                #{order.id.slice(0, 8)}...
              </h1>
              <p className='text-sm font-semibold text-base-content/50'>
                {formatOrderWhen(order.createdAt, { dateStyle: 'full' })}
              </p>
            </div>

            <div className='sm:text-right bg-neutral/10 sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-neutral/20 sm:border-0 shadow-inner sm:shadow-none'>
              <span className='text-xs uppercase font-bold tracking-wider text-base-content/40 block mb-0.5'>
                Order Total
              </span>
              <div className='text-3xl font-black text-success drop-shadow-[0_0_8px_rgba(34,197,94,0.15)] tracking-tight'>
                {formatPrice(order.totalCents, 'usd')}
              </div>
            </div>
          </div>

          <div className='flex flex-col space-y-4'>
            <div className='tabs tabs-boxed bg-base-200/60 p-1.5 rounded-2xl border border-neutral/30 gap-1 shadow-inner w-fit'>
              <NavLink
                to={`/orders/${id}`}
                end
                className={({ isActive }) =>
                  `tab font-bold gap-2 rounded-xl transition-all duration-200 px-4 sm:px-6 py-2 h-auto text-sm ${
                    isActive
                      ? 'tab-active btn-primary shadow-md text-primary-content'
                      : 'text-base-content/70 hover:bg-neutral/10 hover:text-base-content'
                  }`
                }
              >
                <LayoutListIcon className='w-4 h-4' />
                Summary
              </NavLink>

              {paid ? (
                <NavLink
                  to={`/orders/${id}/chat`}
                  className={({ isActive }) =>
                    `tab font-bold gap-2 rounded-xl transition-all duration-200 px-4 sm:px-6 py-2 h-auto text-sm ${
                      isActive
                        ? 'tab-active btn-primary shadow-md text-primary-content'
                        : 'text-base-content/70 hover:bg-neutral/10 hover:text-base-content'
                    }`
                  }
                >
                  <MessageCircle className='w-4 h-4' />
                  Support Chat
                </NavLink>
              ) : (
                <span className='tab font-bold gap-2 rounded-xl px-4 sm:px-6 py-2 h-auto text-sm text-base-content/30 cursor-not-allowed select-none opacity-60'>
                  <LockIcon className='w-4 h-4' />
                  Support Chat
                </span>
              )}
            </div>

            {!paid && (
              <div className='alert alert-warning border border-warning/30 bg-warning/10 text-warning-content rounded-2xl shadow-sm flex items-start sm:items-center gap-3 p-4'>
                <LockIcon className='w-5 h-5 shrink-0 mt-0.5 sm:mt-0 text-warning' />
                <span className='text-sm font-bold tracking-tight'>
                  Support chat unlocks once the payment process is fully
                  completed.
                </span>
              </div>
            )}

            <div className='w-full'>
              <Outlet context={{ order, items, paid }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails

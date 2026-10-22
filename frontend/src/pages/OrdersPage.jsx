import { PackageIcon, MessageSquareIcon, HashIcon } from 'lucide-react'

import { useOrders } from '../hooks/useOrders'
import { Link } from 'react-router'
import OrderCard from '../components/OrderCard'
import OrderNotFound from '../ui/errors/OrderNotFound'
import OrderSkelton from '../ui/skeletons/OrderSkelton'
import OrdersEmpty from '../ui/empty-status/OrdersEmpty'
import SvgOrders from '../ui/svg/SvgOrders'

const OrdersPage = () => {
  const { error, isLoading, orders, staff } = useOrders()

  if (isLoading) {
    return <OrderSkelton />
  }

  if (error) {
    return <OrderNotFound />
  }

  return (
    <div className='container mx-auto max-w-5xl px-4 py-12 min-h-screen text-base-content'>
      <header className='mb-10 bg-linear-to-r from-base-200 to-transparent p-6 rounded-2xl border border-base-300/50 backdrop-blur-md'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='p-3 bg-primary/10 text-primary rounded-xl ring-1 ring-primary/20'>
            <PackageIcon className='w-7 h-7' />
          </div>
          <h1 className='text-3xl font-extrabold tracking-tight bg-linear-to-r from-neutral-content to-base-content bg-clip-text text-transparent'>
            {staff ? 'Store Management Orders' : 'Your Order History'}
          </h1>
        </div>
        <p className='text-sm text-muted-content/70 flex items-center gap-2 mt-3 pl-1 text-slate-400'>
          <MessageSquareIcon className='w-4 h-4 text-secondary' />
          {staff
            ? 'All store orders. Open any ticket to initiate a customer support live chat.'
            : 'All paid orders include priority customer support. Open an order card to start a chat.'}
        </p>
      </header>

      {orders.length === 0 ? (
        <OrdersEmpty />
      ) : (
        <ul className='grid gap-4 list-none p-0 m-0'>
          {orders.map(o => {
            const items = o.previwsItems ?? []
            const totalUnits = items.reduce((sum, row) => sum + row.quantity, 0)
            const lineCount = items.length

            const summary =
              lineCount === 0
                ? 'No line items'
                : lineCount === 1
                ? `${totalUnits} ${totalUnits === 1 ? 'item' : 'items'}`
                : `${lineCount} unique products • ${totalUnits} total items`

            return (
              <li key={o.id}>
                <Link
                  to={`/orders/${o.id}`}
                  className='group card card-side bg-base-200/60 hover:bg-base-200 border border-base-300/70 hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col md:flex-row items-stretch'
                >
                  <div className='p-5 flex items-center justify-center bg-base-300/30 md:border-r border-base-300/70 md:w-56 shrink-0 group-hover:bg-base-300/50 transition-colors'>
                    <OrderCard items={items} />
                  </div>

                  <div className='card-body p-6 flex flex-col justify-between gap-4 md:flex-row md:items-center w-full'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-1 text-xs font-mono bg-base-300 text-slate-300 px-2.5 py-1 rounded-md w-fit border border-base-300'>
                        <HashIcon className='w-3 h-3 text-primary' />
                        <span>{o.id.slice(0, 8).toUpperCase()}...</span>
                      </div>

                      <p className='text-sm font-medium text-slate-300 group-hover:text-primary-content transition-colors'>
                        {summary}
                      </p>
                    </div>

                    <div className='flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-base-300'>
                      <span
                        className={`badge badge-md font-semibold tracking-wide capitalize px-3 py-3 rounded-lg shadow-sm ${
                          o.status === 'paid'
                            ? 'badge-success bg-success/10 text-success border-success/20 shadow-success/5'
                            : o.status === 'pending'
                            ? 'badge-warning bg-warning/10 text-warning border-warning/20 shadow-warning/5'
                            : 'badge-error bg-error/10 text-error border-error/20 shadow-error/5'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse ${
                            o.status === 'paid'
                              ? 'bg-success'
                              : o.status === 'pending'
                              ? 'bg-warning'
                              : 'bg-error'
                          }`}
                        ></span>
                        {o.status}
                      </span>

                      <SvgOrders />
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
export default OrdersPage

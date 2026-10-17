import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
  ArrowRightIcon,
  LogInIcon
} from 'lucide-react'
import useCart from '../hooks/useCart'
import { getOptimizedImageUrl } from '../lib/imageKitUrl'
import { Link } from 'react-router'
import { formatPrice } from '../utils/format'
import { Show, SignInButton } from '@clerk/react'
import CartSkeleton from '../ui/skeletons/CartSkeleton'
import CartError from '../ui/errors/CartError'
import CartEmpty from '../ui/empty-status/CartEmpty'

const CartPages = () => {
  const {
    checkout,
    checkoutLoading,
    items,
    lines,
    productsError,
    productsLoading,
    removeFromCart,
    setQuantity,
    total,
    clearCart
  } = useCart()

  return (
    <div className='min-h-screen  text-base-content py-12 px-4 sm:px-6 lg:px-8 font-sans'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center gap-3 mb-8 border-b border-base-100 pb-5'>
          <ShoppingBagIcon className='w-8 h-8 text-primary' />
          <h1 className='text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-content capitalize'>
            cart
          </h1>
          <span className='badge badge-primary badge-md ml-2 font-semibold'>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
          <button
            className='btn btn-primary  shadow-lg shadow-primary/10 text-white font-bold group'
            onClick={() => clearCart()}
          >
            Clear Cart
          </button>
        </div>

        {items.length === 0 ? (
          <CartEmpty />
        ) : productsLoading ? (
          <CartSkeleton />
        ) : productsError ? (
          <CartError />
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
            <ul className='lg:col-span-2 space-y-4 list-none p-0 m-0'>
              {lines.map(({ line, product: p }) => (
                <li
                  key={line.id}
                  className='card card-side bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 border border-base-100/50 overflow-hidden group'
                >
                  <figure className='w-28 sm:w-36 bg-base-100 relative shrink-0 overflow-hidden'>
                    {p?.imageUrl ? (
                      <img
                        src={getOptimizedImageUrl(p.imageUrl, 200)}
                        loading='lazy'
                        decoding='async'
                        alt={p.name}
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                      />
                    ) : (
                      <div className='w-full h-full bg-base-100 flex items-center justify-center text-base-content/20 text-xs'>
                        No Image
                      </div>
                    )}
                  </figure>

                  <div className='card-body p-4 sm:p-6 justify-between flex-1'>
                    <div className='flex justify-between items-start gap-2'>
                      <div>
                        <h3 className='card-title text-base sm:text-lg font-bold text-neutral-content leading-tight hover:text-primary transition-colors'>
                          {p ? (
                            <Link to={`/product/${p.slug}`}>{p.name}</Link>
                          ) : (
                            'Unknown product'
                          )}
                        </h3>
                        {p && (
                          <p className='text-xs sm:text-sm text-base-content/60 mt-1 font-medium'>
                            {formatPrice(p.price, p.currency)} each
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(line.id)}
                        className='btn btn-ghost btn-circle btn-sm text-error/60 hover:text-error hover:bg-error/10'
                        title='Remove item'
                      >
                        <Trash2Icon className='w-4 h-4' />
                      </button>
                    </div>

                    <div className='flex items-center justify-between mt-4 pt-3 border-t border-base-100/30'>
                      <div className='form-control'>
                        <div className='flex items-center bg-base-300 rounded-lg p-1 border border-base-100 gap-1'>
                          <button
                            className='btn btn-ghost btn-xs btn-circle text-base-content/70 hover:text-primary'
                            onClick={() =>
                              setQuantity(line.id, line.quantity - 1)
                            }
                            disabled={line.quantity <= 1}
                          >
                            <MinusIcon className='w-3.5 h-3.5' />
                          </button>
                          <span className='px-2 font-semibold text-sm w-8 text-center'>
                            {line.quantity}
                          </span>
                          <button
                            className='btn btn-ghost btn-xs btn-circle text-base-content/70 hover:text-primary'
                            onClick={() =>
                              setQuantity(line.id, line.quantity + 1)
                            }
                          >
                            <PlusIcon className='w-3.5 h-3.5' />
                          </button>
                        </div>
                      </div>

                      <div className='text-right'>
                        <span className='text-sm font-semibold text-neutral-content'>
                          {p
                            ? formatPrice(p.price * line.quantity, p.currency)
                            : '—'}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className='card bg-base-200 shadow-xl border border-base-100 sticky top-6'>
              <div className='card-body p-6'>
                <h2 className='card-title text-xl text-neutral-content font-bold border-b border-base-100 pb-3 mb-4'>
                  Order Summary
                </h2>

                <div className='space-y-3 text-sm'>
                  <div className='flex justify-between text-base-content/70'>
                    <span>Subtotal</span>
                    <span>
                      {formatPrice(
                        total || 0,
                        lines[0]?.product?.currency || 'USD'
                      )}
                    </span>
                  </div>
                  <div className='flex justify-between text-base-content/70'>
                    <span>Shipping</span>
                    <span className='text-success font-medium'>Free</span>
                  </div>

                  <div className='divider my-2'></div>

                  <div className='flex justify-between text-lg font-bold text-neutral-content'>
                    <span>Total</span>
                    <span className='text-primary'>
                      {formatPrice(
                        total || 0,
                        lines[0]?.product?.currency || 'USD'
                      )}
                    </span>
                  </div>
                </div>
                <Show when={'signed-in'}>
                  {' '}
                  <div className='card-actions mt-6'>
                    <button
                      onClick={checkout}
                      disabled={checkoutLoading}
                      className='btn btn-primary btn-block shadow-lg shadow-primary/20 text-white font-bold group'
                    >
                      {checkoutLoading ? (
                        <span className='loading loading-spinner'></span>
                      ) : (
                        <>
                          Proceed to Checkout
                          <ArrowRightIcon className='w-4 h-4 ml-1 transition-transform group-hover:translate-x-1' />
                        </>
                      )}
                    </button>
                  </div>
                </Show>

                <Show when={'signed-out'}>
                  <SignInButton mode='modal'>
                    <button
                      type='button'
                      className='btn btn-outline btn-primary mt-6 w-full gap-2'
                    >
                      <LogInIcon className='size-4' aria-hidden />
                      Sign in to checkout
                    </button>
                  </SignInButton>
                </Show>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPages

import { ShoppingBagIcon, ChevronRightIcon, ImageOffIcon } from 'lucide-react'

import useCart from '../hooks/useCart'
import { useProductPage } from '../hooks/useProductPage'
import { Link } from 'react-router'
import { getOptimizedImageUrl } from '../lib/imageKitUrl'
import { formatPrice } from '../utils/format'
import ProductDetailsSkeleton from '../ui/skeletons/ProductDetailsSkeleton'
import ProductNotFound from '../ui/errors/ProductNotFound'

const ProductDetails = () => {
  const addItem = useCart(s => s.addToCart)
  const { product, isLoading, error } = useProductPage()

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (error || !product) {
    return <ProductNotFound />
  }

  const p = product
  const category = p.category ?? 'General'

  return (
    <div className='min-h-screen  text-base-content antialiased p-4 sm:p-8 flex flex-col items-center selection:bg-primary selection:text-primary-content'>
      <div className='max-w-5xl w-full space-y-6'>
        <div className='text-sm breadcrumbs bg-base-100 px-5 py-3 rounded-xl border border-neutral shadow-sm text-base-content/60'>
          <ul>
            <li>
              <Link
                to='/shop'
                className='hover:text-primary transition-colors font-medium'
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to={`/?category=${encodeURIComponent(category)}`}
                className='hover:text-primary transition-colors font-medium'
              >
                {category}
              </Link>
            </li>
            <li className='text-base-content/90 font-semibold truncate max-w-50 sm:max-w-xs'>
              {p.name}
            </li>
          </ul>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral/60 overflow-hidden items-center'>
          <div className='relative aspect-square w-full bg-neutral/30 rounded-2xl border border-neutral/50 overflow-hidden flex items-center justify-center group shadow-inner'>
            {p.imageUrl ? (
              <img
                src={getOptimizedImageUrl(p.imageUrl, 600)}
                alt={p.name}
                fetchPriority='high'
                decoding='async'
                className='object-contain w-full h-full p-4 transform transition-transform duration-500 group-hover:scale-105'
              />
            ) : (
              <div className='flex flex-col items-center gap-2 text-base-content/30 select-none'>
                <ImageOffIcon className='w-12 h-12 stroke-[1.5]' />
                <span className='text-xs font-medium'>No image available</span>
              </div>
            )}
          </div>

          <div className='flex flex-col h-full justify-center space-y-6 lg:p-4'>
            <div>
              <span className='badge badge-outline badge-primary font-bold tracking-wide uppercase px-3 py-2.5 text-xs mb-3 shadow-sm shadow-primary/5'>
                {category}
              </span>
              <h1 className='text-3xl lg:text-4xl font-black text-base-content tracking-tight leading-none mb-3'>
                {p.name}
              </h1>
              <div className='text-2xl font-black text-success drop-shadow-[0_0_8px_rgba(34,197,94,0.15)] tracking-tight'>
                {formatPrice(p.price)}
              </div>
            </div>

            <div className='divider opacity-20 my-0' />

            {p.description && (
              <div className='space-y-2'>
                <h2 className='text-xs uppercase font-bold tracking-wider text-base-content/40'>
                  Description
                </h2>
                <p className='text-base-content/75 text-sm sm:text-base leading-relaxed max-w-prose bg-neutral/20 p-4 rounded-xl border border-neutral/30 shadow-inner'>
                  {p.description}
                </p>
              </div>
            )}

            <div className='pt-4'>
              <button
                onClick={() => addItem(p)}
                className='btn btn-primary btn-block sm:btn-lg font-bold shadow-lg shadow-primary/10 gap-2 group text-base'
              >
                <ShoppingBagIcon className='w-5 h-5 transition-transform group-hover:-translate-y-0.5' />
                Add to Cart
                <ChevronRightIcon className='w-4 h-4 ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

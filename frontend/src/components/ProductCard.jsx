import { ShoppingCartIcon } from 'lucide-react'
import { getOptimizedImageUrl } from '../lib/imageKitUrl'
import { useCartStore } from '../store/cart'
import { formatPrice } from '../utils/format'

const ProductCard = ({ product }) => {
  const addToCart = useCartStore(state => state.addToCart)

  const optimizedImageSrc = getOptimizedImageUrl(product.imageUrl, 500)

  return (
    <div
      data-theme='night'
      className='card bg-base-200 border border-base-300 shadow-xl overflow-hidden group hover:border-primary/40 transition-all duration-300 flex flex-col h-full'
    >
      <figure className='relative w-full h-56 bg-base-300 overflow-hidden shrink-0'>
        <img
          src={optimizedImageSrc}
          alt={product.name}
          loading='lazy'
          width='500'
          height='224'
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />

        <span className='absolute top-3 left-3 badge badge-primary font-medium tracking-wide shadow-md'>
          {product.category}
        </span>
      </figure>
    
      <div className='card-body p-5 flex flex-col justify-between grow space-y-4'>
        <div className='space-y-2'>
          <h2 className='card-title text-xl font-bold tracking-tight text-base-content line-clamp-1 group-hover:text-primary transition-colors'>
            {product.name}
          </h2>

          <p className='text-sm text-base-content/70 line-clamp-2 leading-relaxed font-light'>
            {product.description}
          </p>
        </div>

        <div className='card-actions justify-between items-center pt-2 border-t border-base-300/60'>
          <div className='flex flex-col'>
            <span className='text-xs text-base-content/50 font-medium tracking-wider uppercase'>
              Price
            </span>

            <span className='text-2xl font-black text-secondary font-mono'>
              {formatPrice(product.price, product.currency)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product.id, 1)}
            className='btn btn-primary shadow-lg shadow-primary/20 gap-2 group/btn text-white'
          >
            <ShoppingCartIcon className='w-5 h-5 group-hover/btn:-translate-y-0.5 transition-transform' />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

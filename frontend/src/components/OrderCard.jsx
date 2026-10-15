import { PackageIcon } from 'lucide-react'
import { getOptimizedImageUrl } from '../lib/imageKitUrl'

const OrderCard = ({ items }) => {
 
  if (!items?.length) {
    return (
      <div className='w-12 h-12 rounded-xl bg-base-300/50 border border-base-300 flex items-center justify-center text-slate-500 shadow-inner'>
        <PackageIcon className='w-5 h-5' />
      </div>
    )
  }

  const cap = 4
  const show = items.slice(0, cap)
  const rest = items.length > cap ? items.length - cap : 0

  return (

    <div className='avatar-group -space-x-4 rtl:space-x-reverse items-center'>
      {show.map((p, i) => {
        const isLastItemWithRest = i === cap - 1 && rest > 0

        return (
          <div key={p.id || i} className='avatar'>
           
            <div
              className={`w-12 h-12 mask mask-squircle border-2 border-base-200 relative bg-base-300/40 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:z-10`}
            >
              {p.imageUrl ? (
                <img
                  src={getOptimizedImageUrl(p.imageUrl, 48)}
                  alt={p.name || 'Product item'}
                  loading='lazy'
                  decoding='async'
                  className='object-cover w-full h-full'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-slate-400 bg-base-300/70'>
                  <PackageIcon className='w-4 h-4' />
                </div>
              )}

              {isLastItemWithRest && (
                <div className='absolute inset-0 bg-neutral/80 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-neutral-content ring-1 ring-white/10'>
                  +{rest}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OrderCard

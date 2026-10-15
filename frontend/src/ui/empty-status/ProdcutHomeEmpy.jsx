import { LayersIcon } from 'lucide-react'

const ProdcutHomeEmpy = ({category}) => {
  return (
    <div className='card bg-base-200 border border-base-300 p-16 text-center rounded-2xl max-w-xl mx-auto my-12 space-y-4'>
      <div className='mx-auto p-4 bg-base-300/60 rounded-full w-fit text-base-content/40'>
        <LayersIcon className='w-8 h-8' />
      </div>
      <p className='text-lg text-base-content/70 font-medium'>
        No products found in{' '}
        <span className='text-primary font-bold'>"{category}"</span>
      </p>
      <p className='text-xs text-base-content/40 max-w-xs mx-auto font-light'>
        We couldn't locate any active items under this group right now. Try
        browsing another catalog.
      </p>
    </div>
  )
}
export default ProdcutHomeEmpy

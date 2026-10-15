const CartSkeleton = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      <div className='lg:col-span-2 space-y-4'>
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className='flex gap-4 p-4 bg-base-200 rounded-2xl animate-pulse'
          >
            <div className='w-24 h-24 bg-base-100 rounded-xl'></div>
            <div className='flex-1 space-y-3 py-1'>
              <div className='h-4 bg-base-100 rounded w-3/4'></div>
              <div className='h-4 bg-base-100 rounded w-1/4'></div>
            </div>
          </div>
        ))}
      </div>
      <div className='bg-base-200 h-48 rounded-2xl animate-pulse'></div>
    </div>
  )
}

export default CartSkeleton

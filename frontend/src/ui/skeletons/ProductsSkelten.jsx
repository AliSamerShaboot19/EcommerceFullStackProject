const ProductsSkelten = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className='bg-base-200 border border-base-300 rounded-2xl shadow-md p-5 space-y-4 animate-pulse h-104 flex flex-col justify-between'
        >
          <div className='bg-base-300 w-full h-56 rounded-xl'></div>
          <div className='space-y-3 grow pt-4'>
            <div className='bg-base-300 h-5 w-3/4 rounded-md'></div>
            <div className='bg-base-300 h-4 w-5/6 rounded-md'></div>
          </div>
          <div className='flex justify-between items-center pt-4 border-t border-base-300/40'>
            <div className='bg-base-300 h-6 w-20 rounded-md'></div>
            <div className='bg-base-300 h-10 w-28 rounded-xl'></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductsSkelten

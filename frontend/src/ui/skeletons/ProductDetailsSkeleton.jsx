const ProductDetailsSkeleton = () => {
  return (
    <div className='min-h-screen bg-base-200 p-4 sm:p-8 flex items-center justify-center'>
      <div className='max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 p-6 rounded-2xl shadow-xl border border-neutral'>
        <div className='skeleton h-96 w-full rounded-xl bg-neutral/40' />
        <div className='space-y-4 flex flex-col justify-center'>
          <div className='skeleton h-4 w-1/4 bg-neutral/40' />
          <div className='skeleton h-10 w-3/4 bg-neutral/40' />
          <div className='skeleton h-6 w-1/3 bg-neutral/40' />
          <div className='skeleton h-24 w-full bg-neutral/40' />
          <div className='skeleton h-12 w-full bg-neutral/40 mt-4' />
        </div>
      </div>
    </div>
  )
}
export default ProductDetailsSkeleton

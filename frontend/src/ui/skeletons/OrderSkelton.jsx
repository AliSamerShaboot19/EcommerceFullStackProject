const OrderSkelton = () => {
  return (
    <div className='container mx-auto max-w-5xl px-4 py-12'>
      <div className='flex flex-col gap-3 mb-10 animate-pulse'>
        <div className='h-10 bg-base-300 rounded-lg w-48'></div>
        <div className='h-5 bg-base-300 rounded-lg w-96'></div>
      </div>

      <div className='grid gap-6'>
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className='card bg-base-200 border border-base-300 h-32 w-full animate-pulse rounded-2xl'
          ></div>
        ))}
      </div>
    </div>
  )
}

export default OrderSkelton

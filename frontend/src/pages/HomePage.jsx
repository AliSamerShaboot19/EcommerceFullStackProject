import { LayersIcon } from 'lucide-react'
import Features from '../components/Features'
import HomeHero from '../components/HomeHero'
import PageError from '../components/PageError'
import ProductCard from '../components/ProductCard'
import useHome from '../hooks/useHome'

const HomePage = () => {
  const {
    products,
    categories,
    categoriesChipsLoading,
    category,
    error,
    isLoadingCategories,
    isLoadingProducts,
    setCategory
  } = useHome()

  return (
    <div
      data-theme='night'
      className='bg-base-100 min-h-screen text-base-content pb-24'
    >
      <HomeHero
        categories={categories}
        loadingCategories={isLoadingCategories}
      />

      <Features />

      <section
        id='catalog'
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-20'
      >
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-base-300/60 mb-10'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-black tracking-tight sm:text-4xl text-base-content'>
              Our <span className='text-primary'>Products</span>
            </h2>
            <p className='text-sm text-base-content/60 font-light max-w-md'>
              Discover top-tier tech accessories and custom design gear built
              for high performance.
            </p>
          </div>

          <div className='flex flex-wrap gap-2.5 items-center bg-base-200/50 p-2 rounded-2xl border border-base-300/40 backdrop-blur-xs'>
            <button
              onClick={() => setCategory('')}
              className={`btn btn-sm rounded-xl px-5 font-bold transition-all ${
                category === ''
                  ? 'btn-primary text-white shadow-lg shadow-primary/20'
                  : 'btn-ghost text-base-content/80 hover:bg-base-300'
              }`}
            >
              All Products
            </button>

            {categoriesChipsLoading
              ? [1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className='w-24 h-8 bg-base-300 rounded-xl animate-pulse'
                  ></div>
                ))
              : categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`btn btn-sm rounded-xl px-5 font-semibold transition-all ${
                      category === cat
                        ? 'btn-primary text-white shadow-lg shadow-primary/20'
                        : 'btn-ghost text-base-content/70 hover:bg-base-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
          </div>
        </div>

        {isLoadingProducts ? (
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
        ) : error ? (
          <div className='card bg-error/10 border border-error/20 p-8 text-center rounded-2xl max-w-xl mx-auto my-12'>
            <PageError
              message={
                'We encountered an issue while loading the production catalog.'
              }
              action={{
                onClick: () => window.location.reload(),
                label: 'Try Again'
              }}
            />
          </div>
        ) : products.length === 0 ? (
          <div className='card bg-base-200 border border-base-300 p-16 text-center rounded-2xl max-w-xl mx-auto my-12 space-y-4'>
            <div className='mx-auto p-4 bg-base-300/60 rounded-full w-fit text-base-content/40'>
              <LayersIcon className='w-8 h-8' />
            </div>
            <p className='text-lg text-base-content/70 font-medium'>
              No products found in{' '}
              <span className='text-primary font-bold'>"{category}"</span>
            </p>
            <p className='text-xs text-base-content/40 max-w-xs mx-auto font-light'>
              We couldn't locate any active items under this group right now.
              Try browsing another catalog.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage

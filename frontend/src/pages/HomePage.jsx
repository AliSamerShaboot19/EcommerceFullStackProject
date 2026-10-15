import Features from '../components/Features'
import HomeHero from '../components/HomeHero'
import ProductCard from '../components/ProductCard'
import useHome from '../hooks/useHome'
import ProductsSkelten from '../ui/skeletons/ProductsSkelten'
import ProductsCatalogNotFounds from '../ui/errors/ProductsCatalogNotFounds'
import ProdcutHomeEmpy from '../ui/empty-status/ProdcutHomeEmpy'

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
          <ProductsSkelten />
        ) : error ? (
          <ProductsCatalogNotFounds />
        ) : products.length === 0 ? (
          <ProdcutHomeEmpy category={category}/>
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

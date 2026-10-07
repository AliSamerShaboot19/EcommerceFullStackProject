import {
  ArrowRightIcon,
  SparklesIcon,
  ShoppingBagIcon,
  LayersIcon
} from 'lucide-react'
import { Link } from 'react-router'

const HomeHero = ({ categories, loadingCategories }) => {
  return (
    <section className='relative min-h-[70vh] flex items-center justify-center bg-base-100 overflow-hidden py-12 px-4 sm:px-6 lg:px-8'>
      <div className='absolute inset-0 opacity-10 pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full filter blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-secondary rounded-full filter blur-3xl'></div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl w-full relative z-10 items-center'>
        <div className='lg:col-span-7 text-center lg:text-left space-y-6'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium animate-pulse'>
            <SparklesIcon className='w-4 h-4' />
            <span>Premium E-Commerce Experience</span>
          </div>

          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-base-content leading-none'>
            Ready to{' '}
            <span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-accent'>
              Ship & Enjoy
            </span>
          </h1>

          <p className='text-lg text-base-content/70 max-w-2xl mx-auto lg:mx-0 font-light'>
            Discover thousands of high-quality products curated just for you.
            Seamless, secure checkout after payment, instant automated tracking,
            and full interactive access to our 24/7 dedicated customer support
            chat and high-definition video assistance.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2'>
            <a
              href='#catalog'
              className='btn btn-primary btn-lg shadow-lg shadow-primary/20 gap-2 group text-white'
            >
              Shop Full Catalog
              <ArrowRightIcon className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </a>

            <Link
              to='/cart'
              className='btn btn-outline btn-secondary btn-lg gap-2'
            >
              <ShoppingBagIcon className='w-5 h-5' />
              View Your Cart
            </Link>
          </div>
        </div>

        <div className='lg:col-span-5 flex flex-col gap-6 w-full max-w-md mx-auto lg:max-w-none'>
          <div className='card bg-base-200 border border-base-300 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-primary/40'>
            <div className='card-body p-6 flex-row items-center justify-between gap-4'>
              <div className='space-y-1'>
                <p className='text-sm font-semibold tracking-wider text-base-content/50 uppercase flex items-center gap-1.5'>
                  <LayersIcon className='w-4 h-4 text-primary' />
                  Explore Categories
                </p>
                <div className='text-xs text-base-content/60 font-light'>
                  Hand-picked curated groups tailored to your needs.
                </div>
              </div>

              <div className='flex flex-col items-center justify-center min-w-17.5'>
                {loadingCategories ? (
                  <span className='loading loading-ring loading-md text-primary'></span>
                ) : (
                  <div className='text-4xl font-black text-primary font-mono bg-base-300 px-3 py-1.5 rounded-xl border border-base-300 shadow-inner'>
                    {categories?.length ?? 0}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='card bg-linear-to-br from-base-200 to-base-300 border border-base-300 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-accent/40'>
            <div className='absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full filter blur-xl'></div>
            <div className='card-body p-6 space-y-4'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-accent/10 border border-accent/20 rounded-xl text-accent shrink-0'>
                  <SparklesIcon className='w-6 h-6' />
                </div>
                <div>
                  <h3 className='font-bold text-base-content text-md'>
                    Guaranteed Security & Priority Care
                  </h3>
                  <p className='text-sm text-base-content/70 mt-1 font-light leading-relaxed'>
                    Every transaction is protected by bank-grade encryption.
                    Enjoy strict buyer protection, instant refunds eligibility,
                    and top-tier priority support on all paid orders.
                  </p>
                </div>
              </div>

              <div className='flex flex-wrap gap-2 pt-2 border-t border-base-300/50'>
                <span className='badge badge-sm badge-ghost border-base-300 py-2'>
                  🔒 Secure SSL Checkout
                </span>
                <span className='badge badge-sm badge-ghost border-base-300 py-2'>
                  ⚡ Instant Delivery
                </span>
                <span className='badge badge-sm badge-ghost border-base-300 py-2'>
                  🤝 24/7 Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero

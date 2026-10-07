import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react'

const Footer = () => {
  return (
    <footer
      data-theme='night'
      className='bg-base-200 text-base-content border-t border-base-300'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
        <div className='space-y-6'>
          <div>
            <span className='text-2xl font-black tracking-wider text-primary uppercase'>
              Our<span className='text-secondary'>Ecomm</span>
            </span>
            <p className='mt-4 text-base text-base-content/70 max-w-sm leading-relaxed'>
              Your ultimate destination for premium tech, high-performance gear,
              and everyday lifestyle accessories. Designed for tomorrow.
            </p>
          </div>

          <div className='space-y-3 text-sm text-base-content/80'>
            <div className='flex items-center gap-3 group'>
              <MapPinIcon className='w-4 h-4 text-accent transition-transform group-hover:scale-110' />
              <span>Homs, Syria</span>
            </div>
            <div className='flex items-center gap-3 group'>
              <PhoneIcon className='w-4 h-4 text-accent transition-transform group-hover:scale-110' />
              <a href='tel:+9631234567890' className='link link-hover'>
                +963 123 456 7890
              </a>
            </div>
            <div className='flex items-center gap-3 group'>
              <MailIcon className='w-4 h-4 text-accent transition-transform group-hover:scale-110' />
              <a href='mailto:OurEcomm@gmail.com' className='link link-hover'>
                OurEcomm@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className='footer-title text-base font-bold tracking-wider mb-4 opacity-100 text-primary'>
            Quick Links
          </h3>
          <ul className='space-y-2.5 text-sm'>
            <li>
              <a
                href='/shop'
                className='link link-hover text-base-content/70 hover:text-secondary transition-colors'
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href='/cart'
                className='link link-hover text-base-content/70 hover:text-secondary transition-colors'
              >
                Cart
              </a>
            </li>
            <li>
              <a
                href='/orders'
                className='link link-hover text-base-content/70 hover:text-secondary transition-colors'
              >
                Order
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='footer-title text-base font-bold tracking-wider mb-4 opacity-100 text-primary'>
            Support
          </h3>
          <ul className='space-y-2.5 text-sm'>
            <li>
              <a
                href='#'
                className='link link-hover text-base-content/70 hover:text-secondary transition-colors'
              >
                Help Center / FAQ
              </a>
            </li>
            <li>
              <a
                href='#'
                className='link link-hover text-base-content/70 hover:text-secondary transition-colors'
              >
                Shipping & Returns
              </a>
            </li>
            <li>
              <a
                href='#'
                className='link link-hover text-base-content/70 hover:text-secondary transition-colors'
              >
                Warranty & Repairs
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='border-t border-base-300 bg-base-300/40 text-base-content/60 text-xs'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div>
            &copy; {new Date().getFullYear()}{' '}
            <span className='font-semibold text-base-content'>OurEcomm</span>.
            All rights reserved.
          </div>
          <div className='flex gap-6'>
            <a
              href='#'
              className='hover:underline transition-all hover:text-base-content'
            >
              Privacy Policy
            </a>
            <a
              href='#'
              className='hover:underline transition-all hover:text-base-content'
            >
              Terms of Service
            </a>
            <a
              href='#'
              className='hover:underline transition-all hover:text-base-content'
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import {
  CreditCardIcon,
  ShieldCheckIcon,
  TruckIcon,
  HeadphonesIcon
} from 'lucide-react'

const items = [
  {
    icon: CreditCardIcon,
    title: 'Secure Payment',
    description: 'Shop with confidence using our secure payment system.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Authentic Products',
    description: 'Guaranteed authentic products with full warranty.'
  },
  {
    icon: TruckIcon,
    title: 'Fast Delivery',
    description: 'Get your orders delivered quickly and safely.'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our support team is available around the clock to assist you.'
  }
]

const Features = () => {
  return (
    <div
      data-theme='night'
      className='bg-base-100 text-base-content py-16 px-4 sm:px-6 lg:px-8'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl text-primary'>
            Why Choose Us
          </h2>
          <p className='mt-4 max-w-2xl mx-auto text-xl text-base-content/70'>
            We provide the best services and guarantees for a seamless shopping
            experience.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {items.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={index}
                className='card bg-base-200 shadow-xl border border-base-300 hover:border-primary/50 transition-all duration-300 group'
              >
                <div className='card-body items-center text-center p-6'>
                  <div className='p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300 mb-2'>
                    <IconComponent className='w-8 h-8' aria-hidden='true' />
                  </div>

                  <h3 className='card-title text-xl font-bold tracking-wide mt-2'>
                    {item.title}
                  </h3>

                  <p className='text-sm text-base-content/70 leading-relaxed mt-1'>
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Features

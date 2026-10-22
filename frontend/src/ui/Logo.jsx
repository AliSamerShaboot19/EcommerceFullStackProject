import { StoreIcon } from 'lucide-react'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link
      to='/'
      aria-label='OurEcomm home'
      className='group flex items-center gap-3 rounded-xl px-2 py-1.5 transition duration-300 hover:bg-white/6'
    >
      <span className='grid size-10 place-items-center rounded-xl border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(103,232,249,0.22),rgba(99,102,241,0.18))] text-cyan-200 shadow-[0_8px_25px_rgba(34,211,238,0.12)] transition duration-300 group-hover:scale-105 group-hover:border-cyan-200/40'>
        <StoreIcon className='size-5' strokeWidth={2.3} />
      </span>
      <span className='hidden text-[15px] font-semibold tracking-[-0.02em] text-white sm:block'>
        OurEcomm
      </span>
    </Link>
  )
}

export default Logo

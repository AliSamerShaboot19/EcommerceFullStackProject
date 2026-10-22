import { useMemo, useState } from 'react'
import { useAuth } from '@clerk/react'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router'
import {
  LayoutDashboardIcon,
  MenuIcon,
  PackageIcon,
  ShoppingBagIcon,
  XIcon
} from 'lucide-react'
import { apiFetch } from '../lib/api'
import { useCartStore } from '../store/cart'
import UesrLogin from './user/UesrLogin'
import Logo from '../ui/Logo'

const linkBase =
  'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition duration-300'
const linkIdle = 'text-white/60 hover:bg-white/8 hover:text-white'
const linkActive = 'bg-white/8 text-white'

const NavBar = () => {
  const { getToken, isSignedIn } = useAuth()
  const { pathname } = useLocation()
  const [menuRoute, setMenuRoute] = useState(null)
  const menuOpen = menuRoute === pathname

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => apiFetch('/api/me', { getToken }),
    enabled: isSignedIn
  })

  const role = data?.user?.role

  const cartCount = useCartStore(
    useMemo(
      () => state => state.products.reduce((acc, p) => acc + p.quantity, 0),
      []
    )
  )

  const links = [
    { to: '/', label: 'Shop', icon: ShoppingBagIcon },
    ...(isSignedIn
      ? [{ to: '/orders', label: 'Orders', icon: PackageIcon }]
      : []),
    ...(role === 'admin'
      ? [{ to: '/admin', label: 'Admin', icon: LayoutDashboardIcon }]
      : []),
    { to: '/cart', label: 'Cart', icon: ShoppingBagIcon, badge: cartCount }
  ]

  const isActive = to =>
    to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <header className='sticky top-0 z-50   bg-base-100/80 px-4 py-4 backdrop-blur-2xl sm:px-6'>
      <div className='mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-base-200/60 px-3 py-3 shadow-[0_14px_45px_rgba(0,0,0,0.22)] sm:px-4'>
        <Logo />

        <nav
          aria-label='Main navigation'
          className='hidden items-center gap-1 rounded-xl border border-white/8 bg-base-300/50 p-1 md:flex'
        >
          {links.map(({ to, label, icon: Icon, badge }) => {
            const active = isActive(to)
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`${linkBase} ${active ? linkActive : linkIdle}`}
              >
                <Icon className='size-4' />
                {label}
                {badge > 0 && (
                  <span className='grid min-w-5 place-items-center rounded-md bg-cyan-300 px-1.5 py-0.5 text-[10px] font-bold text-slate-950'>
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className='flex items-center gap-2'>
          <UesrLogin role={role} />

          <button
            type='button'
            onClick={() => setMenuRoute(menuOpen ? null : pathname)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className='grid size-10 place-items-center rounded-xl border border-white/10 text-white/70 transition duration-300 hover:bg-white/8 hover:text-white md:hidden'
          >
            {menuOpen ? (
              <XIcon className='size-5' />
            ) : (
              <MenuIcon className='size-5' />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label='Mobile navigation'
          className='mx-auto mt-3 flex max-w-7xl flex-col gap-1 rounded-2xl border border-white/10 bg-base-200/95 p-2 shadow-2xl backdrop-blur-xl md:hidden'
        >
          {links.map(({ to, label, icon: Icon, badge }) => {
            const active = isActive(to)
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition duration-300 ${
                  active ? linkActive : linkIdle
                }`}
              >
                <Icon className='size-4' />
                {badge > 0 ? `${label} (${badge})` : label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}

export default NavBar

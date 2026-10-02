import { useState } from 'react'
import {
  Show,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton
} from '@clerk/react'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router'
import {
  BellIcon,
  LayoutDashboardIcon,
  MenuIcon,
  PackageIcon,
  ShoppingBagIcon,
  StoreIcon,
  XIcon
} from 'lucide-react'
import { apiFetch } from '../lib/api'
import { useCartStore } from '../store/cart'

const linkBase =
  'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition duration-300'
const linkIdle = 'text-white/60 hover:bg-white/8 hover:text-white'
const linkActive = 'bg-white/8 text-white'

const iconButton =
  'hidden size-10 place-items-center rounded-xl text-white/50 transition duration-300 hover:bg-white/8 hover:text-white sm:grid'

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

  const cartCount = useCartStore(s =>
    s.products.reduce((acc, p) => acc + p.quantity, 0)
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
          <button
            type='button'
            className={iconButton}
            aria-label='Notifications'
          >
            <BellIcon className='size-4.5' />
          </button>

          <Show when='signed-out'>
            <SignUpButton mode='modal'>
              <button
                type='button'
                className='hidden items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-100 sm:inline-flex'
              >
                Create account
              </button>
            </SignUpButton>
            <SignInButton mode='modal'>
              <button
                type='button'
                className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm font-semibold text-white transition duration-300 hover:border-cyan-200/30 hover:bg-white/10'
              >
                Sign in
              </button>
            </SignInButton>
          </Show>

          <Show when='signed-in'>
            {(role === 'admin' || role === 'support') && (
              <span
                className={`hidden rounded-md border px-2 py-1 text-[11px] font-semibold capitalize sm:inline-flex ${
                  role === 'admin'
                    ? 'border-cyan-200/20 bg-cyan-300/10 text-cyan-200'
                    : 'border-indigo-300/20 bg-indigo-400/10 text-indigo-200'
                }`}
              >
                {role}
              </span>
            )}
            <div className='flex items-center rounded-xl border border-white/10 bg-white/6 p-1 transition duration-300 hover:border-cyan-200/30 hover:bg-white/10'>
              <UserButton
                appearance={{
                  elements: { userButtonAvatarBox: 'size-7 rounded-lg' }
                }}
              />
            </div>
          </Show>

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

          <div className='grid grid-cols-1 gap-2 p-1'>
            <button
              type='button'
              aria-label='Notifications'
              className='flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-left text-sm font-medium text-white/70 transition duration-300 hover:border-cyan-200/20 hover:bg-white/8 hover:text-white'
            >
              <BellIcon className='size-4' />
              <span>Alerts</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}

export default NavBar

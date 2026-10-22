import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const UesrLogin = ({ role }) => {
  return (
    <div className='flex items-center gap-2'>
      <Show when='signed-out'>
        <SignUpButton mode='modal'>
          <span className='hidden cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-100 sm:inline-flex'>
            Create account
          </span>
        </SignUpButton>
        <SignInButton mode='modal'>
          <span className='flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-3 py-2.5 text-sm font-semibold text-white transition duration-300 hover:border-cyan-200/30 hover:bg-white/10'>
            Sign in
          </span>
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
    </div>
  )
}
export default UesrLogin

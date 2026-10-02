import { Link } from 'react-router'
import { TriangleAlertIcon } from 'lucide-react'

export const SentryErrorFallback = () => {
  return (
    <div className='flex min-h-[60vh] w-full flex-col items-center justify-center p-6'>
      <div
        role='alert'
        className='flex w-full max-w-md flex-col items-center rounded-2xl border border-white/10 bg-base-200/60 p-8 text-center shadow-[0_14px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl'
      >
        <span className='grid size-14 place-items-center rounded-xl border border-rose-300/20 bg-[linear-gradient(135deg,rgba(251,113,133,0.22),rgba(244,63,94,0.12))] text-rose-300 shadow-[0_8px_25px_rgba(244,63,94,0.12)]'>
          <TriangleAlertIcon
            className='size-6'
            strokeWidth={2.2}
            aria-hidden='true'
          />
        </span>

        <h3 className='mt-5 text-lg font-semibold tracking-[-0.02em] text-white'>
          Something went wrong
        </h3>
        <p className='mt-2 text-sm leading-relaxed text-white/60'>
          An unexpected error occurred. Our team has been notified.
        </p>

        <div className='mt-7 flex flex-wrap items-center justify-center gap-2'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-100'
          >
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  )
}

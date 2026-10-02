import { StoreIcon } from 'lucide-react'

const PageLoader = () => {
  return (
    <div
      role='status'
      aria-live='polite'
      className='fixed inset-0 z-60 flex items-center justify-center bg-base-100/70 backdrop-blur-md'
    >
      <div className='flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-base-200/60 px-10 py-8 shadow-[0_14px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl'>
        <div className='relative grid size-16 place-items-center'>
          <span
            aria-hidden='true'
            className='absolute inset-0 rounded-full border-2 border-white/8 border-t-cyan-300 animate-spin motion-reduce:animate-none'
          />
          <span className='grid size-10 place-items-center rounded-xl border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(103,232,249,0.22),rgba(99,102,241,0.18))] text-cyan-200 shadow-[0_8px_25px_rgba(34,211,238,0.12)]'>
            <StoreIcon
              className='size-5'
              strokeWidth={2.3}
              aria-hidden='true'
            />
          </span>
        </div>

        <span className='sr-only'>Loading</span>
        <span
          aria-hidden='true'
          className='flex items-end text-[15px] font-semibold tracking-[-0.02em] text-white'
        >
          {[...'Loading'].map((letter, i) => (
            <span
              key={i}
              className='animate-pulse motion-reduce:animate-none'
              style={{
                animationDelay: `${i * 120}ms`,
                animationDuration: '1.4s'
              }}
            >
              {letter}
            </span>
          ))}
          <span className='ml-1 flex items-end gap-1 pb-1.25'>
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className='size-1 animate-bounce rounded-full bg-cyan-300 motion-reduce:animate-none'
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </span>
        </span>
      </div>
    </div>
  )
}

export default PageLoader

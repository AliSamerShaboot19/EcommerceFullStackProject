import useChat from '../hooks/useChat'
import { HeadphonesIcon } from 'lucide-react'
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  Window,
  Thread,
  MessageComposer
} from 'stream-chat-react'
import ErrorOrderChat from '../ui/errors/ErrorOrderChat'
import ErrorPaid from '../ui/errors/ErrorPaid'
import ErrorChannelClient from '../ui/errors/ErrorChannelClient'

const OrderChat = () => {
  const { error, channel, client, paid } = useChat()

  if (!paid) {
    return <ErrorPaid />
  }

  if (error) {
    return <ErrorOrderChat />
  }

  if (!client || !channel) {
    return <ErrorChannelClient/>
  }

  return (
    <div
      data-theme='night'
      className='min-h-screen bg-base-300 text-base-content p-4 md:p-8 flex items-center justify-center'
    >
      <div className='w-full max-w-5xl card bg-base-100 shadow-2xl border border-base-200/50 overflow-hidden h-[80vh] flex flex-col'>
        <div className='navbar bg-base-200/60 backdrop-blur-md px-4 py-3 border-b border-base-200 flex justify-between items-center shrink-0'>
          <div className='flex items-center gap-3'>
            <div className='p-2.5 bg-primary/10 text-primary rounded-xl ring-1 ring-primary/20'>
              <HeadphonesIcon className='w-5 h-5' />
            </div>
            <div>
              <h3 className='font-bold text-md tracking-tight'>Live Support</h3>
              <p className='text-xs text-base-content/50'>
                Ask real-time questions regarding your ongoing order status
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-success animate-pulse'></span>
            <span className='text-[11px] font-semibold tracking-wider text-success uppercase'>
              Connected
            </span>
          </div>
        </div>

        <div className='flex-1 overflow-hidden relative bg-base-100 stream-chat-night-override'>
          <Chat client={client} theme='str-chat__theme-dark'>
            <Channel channel={channel}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageComposer focus />
              </Window>
              <Thread />
            </Channel>
          </Chat>
        </div>
      </div>
    </div>
  )
}

export default OrderChat

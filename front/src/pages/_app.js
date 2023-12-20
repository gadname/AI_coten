import '../styles/globals.css'  
import Hed from '../components/Hed';
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
    <Hed />
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </div>
  )
}
import Link from 'next/link';
import styles from './Hed.module.css';
import Login from '../components/Login'
import Logout from '../components/Logout'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Hed() {
  const { data: session, status } = useSession()
  return (
    <header className={styles.header}>
      <nav className="relative">
        <Link href="/">
          <img src="/Alchemist.jpg" alt="Logo" className="absolute top-[-30px] left-5 w-[150px] h-[150px]" />
        </Link>
        <Link href="/form">
          <div className="absolute top-7 left-4 font-serif text-black">Form</div>
          </Link>
        <div className="login absolute top-2.5 left-[60%]">
          {status === 'authenticated' ? (
            <div>
              <img
                src={session.user?.image ?? ``}
                alt=""
                className="w-12 h-12 rounded-full"
                onClick={() => {
                  if (status === 'authenticated') {
                    signOut();
                  } else {
                    signIn();
                  }
                }}
              />
              <div><Logout /></div>
            </div>
          ) : (
            <Login />
          )}
        </div>
        <Link href="/three">
          <div className="absolute top-7 left-4 font-serif text-black">Museum</div>
          </Link>
      </nav> 
    </header>
  );
}
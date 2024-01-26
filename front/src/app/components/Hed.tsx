import Link from 'next/link';
import styles from './Hed.module.css';
import Login from '../components/Login'
import Logout from '../components/Logout'

import { useSession, signIn, signOut } from 'next-auth/react'


export default function Hed() {
  const { data: session, status } = useSession()
  return (
    <header className={styles.header}>
      <nav>
      <Link href="/">
        <img src="/Alchemist.jpg" alt="Logo" style={{ position: 'absolute', top: '-30px', left: '20px', width: '150px', height: '150px' }} />
        </Link>
        {/* <Link href="/home">
          <div style={{ fontFamily: 'Georgia, serif', color: 'black', position: 'absolute', top: '30px', right: '350px' }}>Home</div>
          </Link> */}
        <Link href="/Form">
          <div style={{ fontFamily: 'Georgia, serif', color: 'black', position: 'absolute', top: '30px', right: '250px' }}>form</div>
        </Link>
        <div className="login">
        {status === 'authenticated' ? (
          <div>
            
            <img
              src={session.user?.image ?? ``}
              alt=""
              style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%',
                position: 'absolute',
                top: '10px',
                left: '60%',
              }}
              onClick={() => {
                if (status === 'authenticated') {
                  signOut();
                } else {
                  signIn();
                }
              }}
            />
            <div>
              <Logout /> 
             
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
        {/* 他のリンクをここに追加 */}
        <Link href="/three">
          <div style={{ fontFamily: 'Georgia, serif', color: 'black', position: 'absolute', top: '30px', right: '150px' }}>Museum</div>
        </Link>
      </nav> 
    </header>
  );
}
import React from 'react';
import styles from './CommonStyles.module.css';
import { useSession, signIn } from 'next-auth/react';

export default function Login() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status !== 'authenticated') {
    return (
      <div>
        <button 
          className={styles.animatedButton} // CSSモジュールのクラス名を使用
          onClick={() => signIn('google', { callbackUrl: '/three' }, { prompt: 'login' })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.arr2} viewBox="0 0 24 24">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
          <span className={styles.text}>L O G I N</span>
          <span className={styles.circle}></span>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.arr1} viewBox="0 0 24 24">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
        </button>
      </div>
    );
  }   
  return null;
}

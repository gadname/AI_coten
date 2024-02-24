import React from 'react';
import styles from './CommonStyles.module.css';
import { useSession, signIn } from 'next-auth/react';

export default function Login() {
	const { data: session, status } = useSession();
	
	if (status === 'loading') {
		return <div className={`${styles.text} ${styles.textWhite} ${styles.text20px} ${styles.fontBold}`}>Loading...</div>;
	}

	if (status !== 'authenticated') {
		return (
			<div>
			  <button className={`${styles.text} ${styles.textWhite} ${styles.text40px} ${styles.fontBold}`} onClick={() => signIn('google', {}, { prompt: 'login' })}>
				LOGIN
			  </button>
			</div>
		  );
	}
	return null;
}

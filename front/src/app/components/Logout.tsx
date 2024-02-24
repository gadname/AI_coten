import React from 'react';
import styles from './CommonStyles.module.css';
import { useSession, signOut } from 'next-auth/react';

export default function Logout() {
	const { data: session, status } = useSession();

	if (status === 'authenticated') {
		return (
			<div>
				<button className={`${styles.text} ${styles.textWhite} ${styles.text40px} ${styles.fontBold}`} onClick={() => signOut()}>
					LOGOUT</button>
			</div>
		);
	}
	return null;
}
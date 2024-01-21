import Link from 'next/link';
import styles from './Main.module.css';
import Ball from '../components/Ball';
export default function Main() {
  return (
      <div className={styles.main}>
        < Ball />
      </div>
  )
}
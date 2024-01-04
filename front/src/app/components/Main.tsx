import Link from 'next/link';
import styles from './Main.module.css';

export default function Main() {
  return (
      <div className={styles.main}>
        <Link href="/home">
        <img className={styles.home} src="/art_gallery.png" alt="AI 個展" />
        </Link>
      </div>
  )
}
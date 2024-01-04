import Link from 'next/link';
import styles from './Hed.module.css';

export default function Hed() {
  return (
    <header className={styles.header}>
      <nav>
        {/*<Link href="/">
        <img className={styles.name} src="/Aicoten3.jpg" alt="AI 個展" />
        </Link>
       */}
        {/* 他のリンクをここに追加 */}
      </nav>
    </header>
  );
}
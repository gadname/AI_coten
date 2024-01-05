import Link from 'next/link';
import styles from './Hed.module.css';

export default function Hed() {
  return (
    <header className={styles.header}>
      <nav>
        
      <Link href="/museum">
          <div style={{ color: 'black', position: 'absolute', top: '30px', left: '50px', fontSize: '20px' }}>AlchemIst.</div>
        </Link>
      
      
        {/* 他のリンクをここに追加 */}
        <Link href="/museum">
          <div style={{ color: 'black', position: 'absolute', top: '30px', right: '100px' }}>Museum</div>
        </Link>
      </nav>
    </header>
  );
}
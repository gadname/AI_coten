import Link from 'next/link';
import styles from './Header.module.css';
import Robot from './Robot'; 


export default function Header() {
  return (
    <div >
      {/* ここにRobotコンポーネントを追加 */}
      <Robot />
       
      <div className={styles.card}>
        {/* 省略 */}
      </div>
    </div>
  );
}
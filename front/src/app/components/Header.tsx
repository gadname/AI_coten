import Link from 'next/link';
import styles from './Header.module.css';


export default function Header() {
  return (
    <div className={styles.header}>
       
      <div className={styles.card}>
        <div className={styles.touch + " " + styles.touch__1}></div>
        <div className={styles.touch + " " + styles.touch__2}></div>
        <div className={styles.touch + " " + styles.touch__3}></div>
        <div className={styles.touch + " " + styles.touch__4}></div>
        <div className={styles.touch + " " + styles.touch__6}></div>
        <div className={styles.touch + " " + styles.touch__7}></div>
        <div className={styles.touch + " " + styles.touch__8}></div>
        <div className={styles.touch + " " + styles.touch__9}></div>
        <div className={styles.main}>
          <div className={styles.icon}>
            <img className={styles.img} src="ai9.jpg" alt="" />
          </div>
          <span className={styles.name}>AI 個展</span>
          <span className={styles.account}>OpenAI App / DALL-E3</span>
          <span className={styles.link + " " + styles.text}>Title</span>
          <span className={styles.comment + " " + styles.text}>「AI個展」はAIイラスト専用の画像投稿サービスです。<br /><br /></span>
        </div>
      </div>
     
      <div className={styles.circle + " " + styles.circle_1}>
      <span className={styles.circleText}></span></div>
      <div className={styles.circle + " " + styles.circle_2}></div>
      <div className={styles.circle + " " + styles.circle_3}></div>
      <div className={styles.circle + " " + styles.circle_4}></div>
      <div className={styles.circle + " " + styles.circle_5}></div>
      <div className={styles.circle + " " + styles.circle_6}></div>
      <div className={styles.circle + " " + styles.circle_7}></div>
      <div className={styles.circle + " " + styles.circle_8}></div>
    </div>
    
  );
}
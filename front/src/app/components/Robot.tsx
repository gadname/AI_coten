import React, { useState, useEffect } from 'react';
import styles from './Robot.module.css';
import Link from 'next/link';

const Robot = () => {
  // モーダルの表示状態を管理するためのstate
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTypingSecond, setIsTypingSecond] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // アニメーションを再トリガーするためのkey

  useEffect(() => {
    if (isModalVisible) {
      // publicディレクトリからの相対パスを使用して音声ファイルにアクセス
      const audio = new Audio('/se_robo1.mp3');
      audio.play().catch(error => console.error("Audio play failed", error));
    }
  }, [isModalVisible,isTypingSecond]);

  // モーダルを表示する関数
  const onShowModal = () => {
    setIsModalVisible(true);
    setIsTypingSecond(false);
    setAnimationKey(prevKey => prevKey + 1); // モーダルを表示するたびにkeyを更新
  };
  // モーダルを非表示にする関数
  const onHideModal = () => setIsModalVisible(false);

  const handleClick = () => {
    if (isModalVisible) {
      setIsTypingSecond(!isTypingSecond);
      setAnimationKey(prevKey => prevKey + 1); // クリックするたびにkeyを更新
    }
  };
  return (
    <div className={`${styles.container}`}>
      <div className="box">
        <div className="area area_1"></div>
        <div className="area area_2"></div>
        <div className="area area_3"></div>
        <div className="area area_4"></div>
        <div className="area area_5"></div>
        <div className="area area_6"></div>
        <div className="area area_7"></div>
        <div className="area area_8"></div>
        <div className="area area_9"></div>
        
        <button onClick={() => { isModalVisible ? onHideModal() : onShowModal(); }} className="robot">
          <div className="front parts_A"></div>
          <div className="front parts_B"></div>
          <div className="face">
            <div className="face__wrapper">
              <div className="eye"></div>
              <span className="text">Click</span>
            </div>
          </div>
        </button>
      </div>
      {/* モーダルの表示状態に応じてモーダルを表示 */}
      {isModalVisible && (
        <div className={styles.modal} onClick={handleClick}>
          <p key={animationKey} className={`${styles.modalContent} ${isTypingSecond ? styles.typing2 : ''}`}>
            {/* アニメーションが表示される */}
          </p>
          <ul>
            <li>
              <Link href="/three">
              <a></a> {/* next/linkを使用 */}
              </Link>
            </li>
            {/* 他のリンク */}
          </ul>
          
          
        </div>
      )}
    </div>
  );
};

export default Robot;
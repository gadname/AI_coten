import React, { useState, useEffect } from 'react';
import styles from './Robot.module.css';
import Link from 'next/link';

const dynamicStyles = {
  container: `fixed bottom-0 w-1/2 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 h-[120px] sm:h-[10px] md:h-[200px] flex flex-col justify-center items-center bg-transparent rounded-lg`,
};

const Robot = () => {
  // モーダルの表示状態を管理するためのstate
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTypingSecond, setIsTypingSecond] = useState(false);
  const [isTypingThird, setIsTypingThird] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // アニメーションを再トリガーするためのkey

// publicディレクトリからの相対パスを使用して音声ファイルにアクセス
  useEffect(() => {
    if (isModalVisible) { // モーダルが表示されたときだけ音声を再生
    
    const audio = new Audio('/se_robo1.mp3');//Audioオブジェクトを作成
    audio.play().catch(error => console.error("Audio play failed", error));
    }
  }, [isModalVisible,]); 

  useEffect(() => {
    if (isModalVisible) { // モーダルが表示されたときだけ音声を再生
    
    const audio = new Audio('/se_robo1.mp3');//Audioオブジェクトを作成
    audio.play().catch(error => console.error("Audio play failed", error));
    }
  }, [isTypingSecond]); 

  useEffect(() => {
    if (isModalVisible) { // モーダルが表示されたときだけ音声を再生
    
    const audio = new Audio('/se_robo2.mp3');//Audioオブジェクトを作成
    audio.play().catch(error => console.error("Audio play failed", error));
    }
  }, [isTypingThird]); //この変数の変更時に関数を実行

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
      if (!isTypingSecond) {
        setIsTypingSecond(true);
      } else if (!isTypingThird) {
        setIsTypingThird(true);
      } else {
        // typing3が終わった後、モーダルを閉じる
        onHideModal();
        // モーダルとタイピング状態をリセット
        resetModalAndTypingState();
      }
      setAnimationKey(prevKey => prevKey + 1); // クリックするたびにkeyを更新
    } else {
      // モーダルが非表示の場合は、モーダルを表示する
      onShowModal();
    }
  };
  
  // モーダルとタイピング状態をリセットする関数
  const resetModalAndTypingState = () => {
    setIsTypingSecond(false);
    setIsTypingThird(false);
    setAnimationKey(0); // アニメーションキーをリセット
  };

  return (
    <div className={dynamicStyles.container} style={{ right: '-20px' }}>
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
          <p key={animationKey} className={`${styles.modalContent} ${isTypingSecond ? styles.typing2 : ''} ${isTypingThird ? styles.typing3 : ''}`}>
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
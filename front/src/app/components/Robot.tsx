import React, { useState, useEffect } from 'react';
import styles from './Robot.module.css';
import Link from 'next/link';
import { HomeTemplate } from "@/app/components/templates/HomeTemplate";

const dynamicStyles = {
  container: `fixed bottom-0 w-1/2 sm:w-3/4 md:w-1/3 lg:w-1/2 xl:w-2/5 h-[120px] sm:h-[10px] md:h-[200px] flex flex-col justify-center items-center bg-transparent rounded-lg`,
};

const Robot = () => {
  // モーダルの表示状態を管理するためのstate
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTypingSecond, setIsTypingSecond] = useState(false);
  const [isTypingThird, setIsTypingThird] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // アニメーションを再トリガーするためのkey
  const [isTypingFourth, setIsTypingFourth] = useState(false);
  const [isTypingFifth, setIsTypingFifth] = useState(false);
  const [isTypingSixth, setIsTypingSixth] = useState(false);

// publicディレクトリからの相対パスを使用して音声ファイルにアクセス
useEffect(() => {
  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);
    audio.play().catch(error => console.error("Audio play failed", error));
  };

  if (isTypingSixth) {
    playAudio('/se_robo2.mp3'); // 仮に 'se_robo6.mp3' を再生
  } else if (isTypingFifth) {
    playAudio('/se_robo2.mp3'); // 仮に 'se_robo5.mp3' を再生
  } else if (isTypingFourth) {
    playAudio('/se_robo2.mp3'); // 仮に 'se_robo4.mp3' を再生
  } else if (isTypingThird) {
    playAudio('/se_robo2.mp3'); // 'se_robo3.mp3' を再生
  } else if (isTypingSecond) {
    playAudio('/se_robo2.mp3'); // 'se_robo2.mp3' を再生
  } else if (isModalVisible) {
    playAudio('/se_robo2.mp3'); // 'se_robo1.mp3' を再生
  }
}, [isModalVisible, isTypingSecond, isTypingThird, isTypingFourth, isTypingFifth, isTypingSixth]);

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
      } else if (!isTypingFourth) {
        setIsTypingFourth(true);
      } else if (!isTypingFifth) {
        setIsTypingFifth(true);
      } else if (!isTypingSixth) { // 新しい条件の追加
        setIsTypingSixth(true);
      } else {
        onHideModal();
        resetModalAndTypingState();
      }
      setAnimationKey(prevKey => prevKey + 1);
    } else {
      onShowModal();
    }
  };
  
  // モーダルとタイピング状態をリセットする関数
  const resetModalAndTypingState = () => {
    setIsTypingSecond(false);
    setIsTypingThird(false);
    setIsTypingFourth(false);
    setIsTypingFifth(false);
    setIsTypingSixth(false); 
    setAnimationKey(0);
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
        
        <button onClick={handleClick} className="robot">
          <div className="front parts_A"></div>
          <div className="front parts_B"></div>
          <div className="face">
            <div className="face__wrapper">
              <div className="eye"></div>
              <div className="triangleMouth"></div> 
              <span className="text">Click!</span>
            </div>
          </div>
        </button>
      </div>
      {/* モーダルの表示状態に応じてモーダルを表示 */}
      {isModalVisible && (
        <div className={styles.modal}>
          <p key={animationKey} className={`${styles.modalContent} ${isTypingSecond ? styles.typing2 : ''} ${isTypingThird ? styles.typing3 : ''} ${isTypingFourth ? styles.typing4 : ''} ${isTypingFifth ? styles.typing5 : ''} ${isTypingSixth ? styles.typing6 : ''}`}>
            {/* アニメーションが表示される */}
          </p>
          <ul>
          {isTypingSecond && !isTypingThird  && (
            <HomeTemplate />
            )}
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
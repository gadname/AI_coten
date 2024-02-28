import React, { FC, useState, useEffect, CSSProperties } from 'react';
import styles from './Robot.module.css';
import Link from 'next/link';
import { HomeTemplate } from "@/app/components/templates/HomeTemplate";
import { usePathname } from 'next/navigation';
import { DallE3Interface } from './organisms/DallEV3_Interface';

const dynamicStyles = {
  container: `fixed bottom-0 w-1/2 sm:w-3/4 md:w-1/3 lg:w-1/2 xl:w-2/5 h-[120px] sm:h-[10px] md:h-[200px] flex flex-col justify-center items-center bg-transparent rounded-lg`,
};

const Robot: FC<any> = ({onUpload}) => {
  // モーダルの表示状態を管理するためのstate
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTypingSecond, setIsTypingSecond] = useState(false);
  const [isTypingThird, setIsTypingThird] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // アニメーションを再トリガーするためのkey
  const [isTypingFourth, setIsTypingFourth] = useState(false);
  const [isTypingFifth, setIsTypingFifth] = useState(false);
  const [isTypingSixth, setIsTypingSixth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false); // タブレットサイズの状態
  const [isThreePath, setIsThreePath] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 768);
      setIsTablet(screenWidth > 768 && screenWidth <= 1024); // 768pxより大きく、1024px以下の場合はタブレットと判断
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 初期値を設定

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // スタイルの分岐
  const style = isMobile 
    ? { transform: 'scale(0.8)', transformOrigin: 'bottom right', right: '100px', bottom: '50px' }
    : isTablet // タブレットサイズの場合のスタイル
      ? { transform: 'scale(0.9)', right: '100px', bottom: '10px' } // iPadサイズに適したスタイル
      : { right: '0px', top: '550px' };

    const modalStyle: CSSProperties = isMobile 
?  { 
  position: 'fixed',
  top: '-250%',
  left: '50%',
  transform: 'translate(-50%, -50%)', // 中央に配置
  width: '250%', // モバイルデバイスに適した幅
  maxHeight: '500%', // ビューポートに対して最大高さを設定
  overflow: 'auto', // 内容がオーバーフローした場合にスクロールを可能にする
  padding: '20px', // 内容とボーダーの間のスペース
  borderRadius: '10px', // 角の丸み
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 影のスタイル
}: isTablet
? {
  position: 'fixed',
  top: '-50%',
  left: '20%',
  transform: 'translate(-50%, -50%)', // 中央に配置
  width: '200%', // タブレットに適した幅
  maxHeight: '150%', // ビューポートに対して最大高さを設定
  overflow: 'auto', // 内容がオーバーフローした場合にスクロールを可能にする
  padding: '20px', // 内容とボーダーの間のスペース
  borderRadius: '10px', // 角の丸み
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 影のスタイル
}

: isTypingThird && !isTypingFourth
  ? {
    backgroundColor: 'white', // 背景色を白に変更
    backgroundImage: `
      radial-gradient(at 49% 49%, hsla(191,77%,50%,1) 0px, transparent 50%),
      radial-gradient(at 99% 44%, hsla(208,62%,38%,1) 0px, transparent 50%),
      radial-gradient(at 100% 0%, hsla(208,39%,40%,1) 0px, transparent 50%),
      radial-gradient(at 62% 100%, hsla(192,71%,38%,1) 0px, transparent 50%),
      radial-gradient(at 1% 100%, hsla(196,77%,18%,1) 0px, transparent 50%),
      radial-gradient(at 7% 69%, hsla(200,45%,39%,1) 0px, transparent 50%),
      radial-gradient(at 0% 0%, hsla(191,52%,49%,1) 0px, transparent 50%)`,
  }
: {
    backgroundColor: 'initial',
  };


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

    if (pathname === '/three') {
      setIsThreePath(true);
      setIsModalVisible(true);
      return;
    } 

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

  const backgroundStyle = isTypingThird && !isTypingFourth ? { backgroundColor: 'white' } : {};

  return (
    <div className={dynamicStyles.container} style={style}>
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
        <div className={styles.modal} style={modalStyle}>
            { !isThreePath ? <p key={animationKey} className={`${styles.modalContent} ${isTypingSecond ? styles.typing2 : ''} ${isTypingThird ? styles.typing3 : ''} ${isTypingFourth ? styles.typing4 : ''} ${isTypingFifth ? styles.typing5 : ''} ${isTypingSixth ? styles.typing6 : ''}`}>
            {/* アニメーションが表示される */}
          </p> : <></>}
          
          <ul>
            { isTypingThird && !isTypingFourth || isThreePath ? <DallE3Interface onUpload={onUpload} /> : <></>}
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
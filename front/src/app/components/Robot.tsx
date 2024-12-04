import React, { FC, useState, useEffect, CSSProperties } from 'react';
import styles from './Robot.module.css';
import { usePathname } from 'next/navigation';
import Login from '../components/Login';

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
  const [clickText, setClickText] = useState('Click!');

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

  useEffect(() => {
    if (isTypingSixth) {
      setClickText("Let'sGo!");
    } else {
      setClickText('Click!');
    }
  }, [isTypingSixth]);

  // スタイルの分岐
  const style = isMobile 
    ? { transform: 'scale(0.8)', transformOrigin: 'bottom right', right: '130px', bottom: '60px' }
    : isTablet // タブレットサイズの場合のスタイル
      ? { transform: 'scale(0.9)', right: '100px', bottom: '10px' } // iPadサイズに適したスタイル
      : { right: '0px', top: '500px' };

    const modalStyle: CSSProperties = isMobile 
?  {  
      position: 'fixed',
      top: '-140%', // 画面の中央に配置
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '200%', // モバイルデバイスの幅に合わせて調整
      maxHeight: '90%', // ビューポートの高さに合わせて調整
      overflow: 'auto', // 内容がオーバーフローした場合にスクロールを可能にする
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      
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
          <div className={styles.speechBubble}>
            <span className={styles.blinkText}>Click me !</span>
          </div>
          
            <div className="face__wrapper">
              <div className="eye"></div>
              <div className="triangleMouth"></div> 
              <span className="text">{clickText}</span>
            </div>
            
          </div>
        </button>
      </div>
      {/* モーダルの表示状態に応じてモーダルを表示 */}
      {isModalVisible && (
        <div className={styles.modal} style={modalStyle} onClick={handleClick}>
            { !isThreePath ? <p key={animationKey} className={`${styles.modalContent} ${isTypingSecond ? styles.typing2 : ''} ${isTypingThird ? styles.typing3 : ''} ${isTypingFourth ? styles.typing4 : ''} ${isTypingFifth ? styles.typing5 : ''} ${isTypingSixth ? styles.typing6 : ''}`}>
            {/* アニメーションが表示される */}
          </p> : <></>}
        
    
          <ul>
            
          {isTypingSixth ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '10px'  }}>
            <Login />
            </div>) : <></>} 
          
            {/* 他のリンク */}
          </ul>
          
          
        </div>
      )}
    </div>
  );
};

export default Robot;
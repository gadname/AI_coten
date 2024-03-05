// ImageUploadModal.tsx
import React, { ReactNode, FC, useState } from 'react';
import styles from './ImageUploadModal.module.css';

interface ImageUploadModalProps {
  onClose: () => void;
  children: ReactNode;
}

const ImageUploadModal: FC<ImageUploadModalProps> = ({ onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false); //初期値はfalse

  const handleClose = () => {
    setIsClosing(true); // 状態変更の関数(setIsClosing)を使用して、IsClosingをtrueにする
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // 300msはアニメーションの時間と一致させる
  };

  return (
    <div className={styles.sidebarOverlay} onClick={handleClose}>
      <div className={`${styles.sidebar} ${isClosing ? styles.sidebarClosing : ''}`} onClick={e => e.stopPropagation()}>
        {children}
        <text style={{ fontFamily: 'var(--font-dot)' }} className={styles.uploadButton}>ガゾウを投稿するニャ!!</text>
      </div>
    </div>
  );
};
// モーダルの表示部分

export default ImageUploadModal;
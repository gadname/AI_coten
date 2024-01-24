// ImageUploadModal.tsx
import React, { ReactNode, FC, useState } from 'react';
import styles from './ImageUploadModal.module.css';

interface ImageUploadModalProps {
  onClose: () => void;
  children: ReactNode;
}

const ImageUploadModal: FC<ImageUploadModalProps> = ({ onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // 300msはアニメーションの時間と一致させる
  };

  return (
    <div className={styles.sidebarOverlay} onClick={handleClose}>
      <div className={`${styles.sidebar} ${isClosing ? styles.sidebarClosing : ''}`} onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={handleClose}>閉じる</button>
      </div>
    </div>
  );
};

export default ImageUploadModal;
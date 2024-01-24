// ImageUploadModal.tsx
import React, { ReactNode, FC } from 'react';
import styles from './ImageUploadModal.module.css'; // スタイルシートを適宜作成してください

interface ImageUploadModalProps {
    onClose: () => void;
    children: ReactNode;
  }
  const ImageUploadModal: FC<ImageUploadModalProps> = ({ onClose, children }) => {
  return (
    <div className={styles.sidebarOverlay} onClick={onClose}>
      <div className={styles.sidebar} onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default ImageUploadModal;
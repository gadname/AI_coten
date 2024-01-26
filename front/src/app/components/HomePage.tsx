// components/HomePage.tsx
import React, { useState,useEffect } from 'react';
import { App } from './App'; // Adjust the path according to your project structure
import styles from './HomePage.module.css';
import ImageUploadModal from './ImageUploadModal';
import localForage from 'localforage';
import Compressor from 'compressorjs';
import { useSession } from "next-auth/react";

export default function HomePage() {
  // 画像の URL を状態として管理
  const { data: session } = useSession();
  const [imageUrls, setImageUrls] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedImageUrls = localStorage.getItem('imageUrls');
      return savedImageUrls ? JSON.parse(savedImageUrls) : {
    image1: '/ai4.jpg',
    image2: '/art1.png',
    image3: '/art2.png',
    image4: '/art3.png',
    image5: '/AIs.jpg',
    image6: '/ai8.jpg',
    image7: '/ai6.jpg',
    image8: '/ai7.jpg',
    image9: '/aicat.png',
    };
} else {
    return {
      image1: '/ai4.jpg',
      image2: '/art1.png',
      image3: '/art2.png',
    image4: '/art3.png',
    image5: '/AIs.jpg',
    image6: '/ai8.jpg',
    image7: '/ai6.jpg',
    image8: '/ai7.jpg',
    image9: '/aicat.png',
};
}
});

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };
  // 画像 URL を更新する関数
  useEffect(() => {
    console.log('Current session:', session);
    async function loadImageUrls() {
      if (session) {
        // ユーザーIDをキーとして使用
        const userImageUrlsKey = `imageUrls-${session.user_id}`;
        const savedImageUrls = await localForage.getItem(userImageUrlsKey);
        if (savedImageUrls) {
          setImageUrls(JSON.parse(savedImageUrls as string));
        }
      }
    }
    loadImageUrls();
  }, [session]);
  
  // 画像 URL を更新する関数
  const updateImageUrl = (imageKey: keyof typeof imageUrls, newUrl: string) => {
    setImageUrls((prevUrls: typeof imageUrls) => {
      const updatedUrls = {
        ...prevUrls,
        [imageKey]: newUrl
      };
      if (session) {
        // ユーザーIDをキーとして使用
        const userImageUrlsKey = `imageUrls-${session.user_id}`;
        localForage.setItem(userImageUrlsKey, JSON.stringify(updatedUrls)).catch((err) => {
          console.error('Failed to save image URLs to localForage', err);
        });
      }
      return updatedUrls;
    });
  };

  // 画像のデータを配列に変換
  const images = [
    { position: [0, 0, 1.5], rotation: [0, 0, 0], url: imageUrls.image1 },
    { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: imageUrls.image2 },
    { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: imageUrls.image3 },
    { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: imageUrls.image4 },
    { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: imageUrls.image5 },
    { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: imageUrls.image6 },
    { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: imageUrls.image7 },
    { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: imageUrls.image8 },
    { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: imageUrls.image9 },
  ];

  const clearLocalStorage = () => {
    localStorage.clear();
  };
  // 画像をアップロードするためのハンドラー
  const handleImageUpload = (imageKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        // 画像を圧縮する
        new Compressor(file, {
          quality: 0.2, // 画質を20%に設定
          maxWidth: 800, // 最大幅を800pxに設定
          maxHeight: 600, // 最大高さを600pxに設定
          convertSize: 100000, // 100KB以下の画像はJPEGに変換しない
          success(result) {
            const reader = new FileReader();
            reader.onloadend = () => {
              // 新しい画像の URL を読み込んだ後、状態を更新
              updateImageUrl(imageKey as keyof typeof imageUrls, reader.result as string);
            };
            reader.readAsDataURL(result);
          },
          error(err) {
            console.error(err.message);
          },
        });
      }
    }
  };

  return (
    <div className={styles.root}>
      {/* セッションが存在する場合にのみ画像アップロード関連のUIを表示 */}
      {session && (
        <>
          <button onClick={showModal}></button>
          {isModalVisible && (
            <ImageUploadModal onClose={hideModal}>
              {Object.keys(imageUrls).map((key, index) => (
                <div key={key} className={styles.labelContainer}>
                  <input
                    type="file"
                    onChange={(event) => handleImageUpload(key, event)}
                    id={`file-input-${key}`}
                    style={{ display: 'none' }}
                  />
                  <label
                    htmlFor={`file-input-${key}`}
                    className={styles[`labelPosition${index + 1}`]}
                  >
                    Click!
                  </label>
                </div>
              ))}
            </ImageUploadModal>
          )}
        </>
      )}
      <App images={images} onShowModal={showModal} onHideModal={hideModal} isModalVisible={isModalVisible}/>
    </div>
  );
}
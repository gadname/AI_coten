// components/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { App } from './App'; // Adjust the path according to your project structure
import localForage from 'localforage';
import styles from './HomePage.module.css';
import ImageUploadModal from './ImageUploadModal';

export default function HomePage() {
  // 画像の URL を状態として管理
  const [imageUrls, setImageUrls] = useState({
    image1: '/ai4.jpg',
    image2: '/art1.png',
    image3: '/art2.png',
    image4: '/art3.png',
    image5: '/AIs.jpg',
    image6: '/ai8.jpg',
    image7: '/ai6.jpg',
    image8: '/ai7.jpg',
    image9: '/aicat.png',
  });

// localForageの設定
  localForage.config({
    name: 'myApp',
    storeName: 'images',
  });

  // 画像をlocalForageから読み込む関数
  const loadImageFromStorage = async (key) => {
    try {
      const dataUrl = await localForage.getItem(key);
      if (dataUrl) {
        setImageUrls(prevUrls => ({
          ...prevUrls,
          [key]: dataUrl
        }));
      }
    } catch (error) {
      console.error('画像の読み込みに失敗しました', error);
    }
  };

  // コンポーネントのマウント時に画像を読み込む
  useEffect(() => {
    Object.keys(imageUrls).forEach(loadImageFromStorage);
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };
  // 画像 URL を更新する関数
  const updateImageUrl = (imageKey: keyof typeof imageUrls, newUrl: string) => {
    setImageUrls(prevUrls => ({
      ...prevUrls,
      [imageKey]: newUrl
    }));
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

  // 画像をアップロードするためのハンドラー
  const handleImageUpload = async (imageKey, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        await localForage.setItem(imageKey, dataUrl); // 画像をlocalForageに保存
        updateImageUrl(imageKey as keyof typeof imageUrls, dataUrl); // 状態を更新
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.root}>
      <button onClick={showModal} ></button>
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
      className={styles[`labelPosition${index + 1}`]} // ここでスタイルクラスを適用
    >
      Click!
    </label>
  </div>
))}
       </ImageUploadModal>
       )}
      <App images={images} onShowModal={showModal} onHideModal={hideModal} isModalVisible={isModalVisible}/>
      
    </div>
  );
}
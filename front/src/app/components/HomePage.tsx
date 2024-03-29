import React, { useState,useEffect } from 'react';
import { App } from './App'; 
import styles from './HomePage.module.css';
import ImageUploadModal from './ImageUploadModal';
import localForage from 'localforage';
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { DallE3Interface } from '@/app/components/organisms/DallEV3_Interface';
import {  Modal } from "@mui/material";
import { useSearchParams } from "next/navigation"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

interface CustomSession extends Session {
    user_id: string;
    accessToken: string;
  }
export default function HomePage() {
  const { data: session } = useSession();
  const params = useSearchParams();
  const shareQuery = params.get('share_id')

  
  const [imageUrls, setImageUrls] = useState({
    image1: '/AIs.jpg',
    image2: '/img9.jpg',
    image3: '/aicat5.png',
    image4: '/ai8.jpg',
    image5: '/ai4.jpg',
    image6: '/ai1.jpg',
    image7: '/ai6.jpg',
    image8: '/aix.jpg',
    image9: '/art3.png',
  });

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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<null | 'imageUpload' | 'dalle'>();
  
  const showModal = (type: 'imageUpload' | 'dalle' = 'imageUpload') => {
    if (session) {
      setIsModalVisible(true);
      setOpen(true);
      setModalType(type); // モーダルの種類を設定
    } else {
      alert('ログインしてください');
    }
  };

  const showImageUploadModal = () => showModal('imageUpload');
  const showDalleModal = () => showModal('dalle');

  const hideModal = () => {
    setIsModalVisible(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false)
    setIsModalVisible(false);
  }

  const handleImageUpload = async (imageKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const now = new Date();
      const timestamp = now.toISOString().replace(/:/g, '-').replace(/\..+/, '');
      const fileNameWithTimestamp = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileNameWithTimestamp);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateImageUrl(imageKey as keyof typeof imageUrls, downloadURL);
        });
      }).catch((error) => {
        console.error("Upload failed", error);
      });
    }
  };

const updateImageUrl = (imageKey: keyof typeof imageUrls, newUrl: string) => {
  setImageUrls((prevUrls: typeof imageUrls) => {
    const updatedUrls = {
      ...prevUrls,
      [imageKey]: newUrl
    };
    
    if (session) {
      console.log('Session_logs' , session);
      const requestBody = {
        image_urls: updatedUrls,
      };
      console.log('updatedUrls', updatedUrls);
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user_images/update_urls`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as CustomSession).accessToken}`,
          'UserId': (session as CustomSession).user_id, 
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    return updatedUrls;
  });
};

// 画像 URL を更新する関数

const fetchImageUrls = async () => {
 
  // sessionがある場合は自分の画像URLを取得
  if (shareQuery) {
    // shareQueryから画像データを取得する
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user_images/share?user_id=${shareQuery}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch image URLs');
      }

      const data = await response.json();
      console.log('imageUrls_data', data);
      setImageUrls(data); // 状態を更新

      // localForageを使用してデータを保存
      await localForage.setItem('imageUrls', data);
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    }
  } else if (session) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user_images`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as CustomSession).accessToken}`,
        },
      });

      
      if (!response.ok) {
        throw new Error('Failed to fetch image URLs');
      }

      const data = await response.json();
      console.log('imageUrls_data', data);
      setImageUrls(data); // 状態を更新

      // localForageを使用してデータを保存
      await localForage.setItem('imageUrls', data);
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    }
  }
};

useEffect(() => {
  fetchImageUrls();
}, [session]);

// const upload = (url: string) => {
//   console.log('url', url);
//   handleImageUpload(url)
// }

useEffect(() => {
  fetchImageUrls();
}, []);


return (
  <div className={styles.root}>
    {/* セッションが存在する場合にのみ画像アップロード関連のUIを表示 */}
    {session && !shareQuery && (
      <>
        {/* モーダル表示のためのボタンを追加 */}

        {/* modalTypeに基づいて条件的にモーダルを表示 */}
        {isModalVisible && modalType === 'imageUpload' && (
          <ImageUploadModal onClose={hideModal}>
            {Object.keys(imageUrls).map((key, index) => (
              <div key={key} className={styles.labelContainer}>
                <input
                  type="file"
                  onChange={(event) => handleImageUpload(key, event)}
                  id={`file-input-${key}`}
                  style={{ display: 'none' }}
                />
                <label htmlFor={`file-input-${key}`} className={styles[`labelPosition${index + 1}`]}>
                  <div
          title="Add New"
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              strokeWidth="1.5"
            ></path>
            <path d="M8 12H16" strokeWidth="1.5"></path>
            <path d="M12 16V8" strokeWidth="1.5"></path>
          </svg>
        </div>
                </label>
              </div>
            ))}
          </ImageUploadModal>
        )}

        {isModalVisible && modalType === 'dalle' && (
          <Modal open={open} onClose={handleClose} className={styles.modalWrapper}>
            <div className={styles.modal}>
              <DallE3Interface  gptOutput={""}/>
            </div>
          </Modal>
        )}
      </>
    )}
    <App images={images} onShowModal={showModal} onHideModal={hideModal} isModalVisible={isModalVisible}/>
  </div>
);
}
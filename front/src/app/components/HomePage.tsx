// components/HomePage.tsx
import React, { useState,useEffect } from 'react';
import { App } from './App'; // Adjust the path according to your project structure
import styles from './HomePage.module.css';
import ImageUploadModal from './ImageUploadModal';
import localForage from 'localforage';
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { getSession } from 'next-auth/react';
import Stars from '../components/Stars';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// 'file' comes from the Blob or File API


// Initialize Firebase


interface CustomSession extends Session {
    user_id: string;
    accessToken: string;
  }
export default function HomePage() {
  const { data: session } = useSession();//sessionの状態を取得
  
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

  const showModal = () => {
    if (session) {
      setIsModalVisible(true);
    } else {
      alert('ログインしてください');
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  
  // 画像をアップロードするためのハンドラー
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
          // ここでダウンロードURLを使用してステートを更新
          updateImageUrl(imageKey as keyof typeof imageUrls, downloadURL);
        });
      }).catch((error) => {
        console.error("Upload failed", error);
      });
    }
  };

//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       console.log('file', file);
//       console.log('files', event.target.files);
//       const formData = new FormData();
//       const session = await getSession() as any;
//       console.log('Session_log' , session);
//       formData.append('post[image]', file); // 'image' を 'post[image]' に変更
//       formData.append('post[user_id]', session.user_id); // 'user_id' を 'post[user_id]' に変更
//       uploadBytes(storageRef, file).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//       });
//       fetch("https://ai-coten.onrender.com/api/v1/posts", {
//         method: 'POST',
//         body: formData, // formDataを使用しているため、これが正しいbodyです
//         headers: {
//           'Authorization': `Bearer ${session.accessToken}`,
//           'UserId': session.user_id, 
//         },
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Server response:', data);
//   // サーバーから返された画像のURLで状態を更新
//   // const newImageUrl = data.url; // サーバーから返されるプロパティ名に合わせてください
//   // updateImageUrl(imageKey as keyof typeof imageUrls, newImageUrl);
// })
// .catch(error => {
//   console.error('アップロード中にエラーが発生しました。', error);
// });
// }

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

      fetch("https://ai-coten.onrender.com/api/v1/user_images/update_urls", { 
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

useEffect(() => {
  const fetchImageUrls = async () => {
    if (session) {
      try {
        const response = await fetch("https://ai-coten.onrender.com/api/v1/user_images", {
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


  fetchImageUrls();
}, [session]);

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
'use client'
import React from 'react';
import { useState, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Wall from './wall'
import Ground from './ground'
import Pole from './pole'
import FrameList from './frame-list'
import { Html } from '@react-three/drei';
import { useRouter } from 'next/router';
import localForage from 'localforage';

type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
  user_id: number;
  post_id: number;
};

const Gallery = () => {
  const [image1, setImage1] = useState("./white.png");
  const [image2, setImage2] = useState("./white.png");
  const [image3, setImage3] = useState("./white.png");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [title, setTitle] = useState("");

  // 絵画リスト
  const images = [
    {
      id: '1',
      position: [-1.7, 0.5, 0.05],
      image: image1,
    },
    {
      id: '2',
      position: [0, 0.5, 0.05],
      image: image2,
    },
    {
      id: '3',
      position: [1.7, 0.5, 0.05],
      image: image3,
    },
    
  ];

  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      // 画像データをIndexedDBに保存
      localForage.setItem(`savedImage${id}`, base64Image).then(() => {
        // 画像状態を更新
        if (id === '1') {
          setImage1(base64Image);
        } else if (id === '2') {
          setImage2(base64Image);
        } else if (id === '3') {
          setImage3(base64Image);
        }
      });
    };

    reader.readAsDataURL(file);
  };

  

  // ページのロード時にIndexedDBから画像データを取得して表示
  useEffect(() => {
    localForage.getItem('savedImage1').then(savedImage1 => {
      if (savedImage1) {
        setImage1(savedImage1);
      }
    });
    localForage.getItem('savedImage2').then(savedImage2 => {
      if (savedImage2) {
        setImage2(savedImage2);
      }
    });
    localForage.getItem('savedImage3').then(savedImage3 => {
      if (savedImage3) {
        setImage3(savedImage3);
      }
    });
  }, []);
  
  

  
  return (
    <>
    
     <Html>
     <audio src="/bgm.mp3" autoPlay loop />
     <input 
        type="file" 
        onChange={(event) => handleImageUpload('1', event)} 
        style={{ 
          color: 'red', 
          fontSize: '8px',
          position: 'absolute',
          top: '120px', // 上から50pxの位置
          left: '50px',
        }} 
      />
      <input 
        type="file" 
        onChange={(event) => handleImageUpload('2', event)} 
        style={{ 
          color: 'red', 
          fontSize: '8px',
          position: 'absolute',
          top: '120px', // 上から50pxの位置
          left: '100px',
        }} 
      />
      <input 
        type="file" 
        onChange={(event) => handleImageUpload('3', event)} 
        style={{ 
          color: 'red', 
          fontSize: '8px',
          position: 'absolute',
          top: '120px', // 上から50pxの位置
          left: '150px',
        }} 
      />
     </Html>

      {/* 背景 */}
      <color attach="background" args={['#ADD8E6']} />

      {/* 環境光 */}
      <ambientLight intensity={0.5} />

      <group position={[0, -1, 0]}>
       
        <Wall />
        {/* 地面 */}
        <Ground />
        {/* ポール */}
        <Pole />
        {/* フレーム */}
        <FrameList images={images} />
      </group>
    </>
  )
}

export default Gallery

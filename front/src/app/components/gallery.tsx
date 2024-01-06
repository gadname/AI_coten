'use client'
import React from 'react';
import { useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Wall from './wall'
import Ground from './ground'
import Pole from './pole'
import FrameList from './frame-list'
import { Html } from '@react-three/drei';
import { useRouter } from 'next/navigation';

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
  const [image4, setImage4] = useState("./white.png"); // 新しい画像の状態
  const [image5, setImage5] = useState("./white.png"); // 新しい画像の状態
  const [content, setContent] = useState("");
  const router = useRouter();
  const [title, setTitle] = useState("");

  // 絵画リスト
  const images = [
    {
      id: '1',
      image: image1,
      position: [0, 0.8, 0.05], // 位置を調整      
      size: [1.2, 1.2, 1,2], // 絵の大きさ
      frameSize: [1.3,1.3, 1.3], // フレームの大きさ
      
      
    },
    {
      id: '2',
      image: image2,
      position: [-1.4, 0.5, 0.05], // 位置を調整
      size: [1, 0.9, 1], // 絵の大きさ
      frameSize: [1.2, 1.0, 1.2], // フレームの大きさ
      
      
    },
    {
      id: '3',
      image: image3,
      position: [-3, 0.8, 0.05], // 位置を調整
      size: [1, 0.5, 1], // 絵の大きさ
      frameSize: [1.1,0.6, 0.7], // フレームの大きさ
      
      
      
    },
    {
      id: '4',
      image: image4,
      position: [1.4, 0.5, 0.05], // 位置を調整      
      size: [1, 0.8, 1], // 絵の大きさ
      frameSize: [1.2, 1.0, 1.2], // フレームの大きさ
      
      
      
    },
    {
      id: '5',
      image: image5,
      position: [2.8, 0.5, 0.05], // 位置を調整      
      size: [1, 1, 1], // 絵の大きさ
      frameSize: [1.2, 1.2, 1.2], // フレームの大きさ
      
      
    },
  ];

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      // 画像状態を更新
      if (id === '1') {
        setImage1(base64Image as string);
      } else if (id === '2') {
        setImage2(base64Image as string);
      } else if (id === '3') {
        setImage3(base64Image as string);
      }
    };

    reader.readAsDataURL(file);
  };

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

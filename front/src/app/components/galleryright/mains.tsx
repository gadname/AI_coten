'use client'
import React, { useState, useEffect, StrictMode } from 'react';
import { Canvas } from '@react-three/fiber'

import * as THREE from 'three'
import Basic from './basic'
import Gallery from './gallery'

type Post = {
  id: number;
  title: string;
  image: string;
};

type MainProps = {
  posts: Post[];
};
// メイン
const Main = () => {
  const [cameraX, setCameraX] = useState(1); 
  useEffect(() => {
    const timer = setInterval(() => {
      setCameraX(prevCameraX => prevCameraX - 0.01); // 0.1はスライドの速度を調整します
    }, 100); // 100はスライドのフレームレートを調整します

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <StrictMode>
        <Canvas
          flat
          shadows
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputEncoding: THREE.sRGBEncoding,
          }}
          camera={{
            fov: 60,
            near: 0.5,
            far: 100,
            position: [cameraX, 0, 0],
          }}
        >
           <Basic /> 
          <Gallery />
        </Canvas>
      </StrictMode>
    </div>
  )
}

export default Main
'use client'
import React, { useState, StrictMode } from 'react';
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
            position: [0, 0, 3],
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
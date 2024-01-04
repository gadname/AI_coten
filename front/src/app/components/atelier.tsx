'use client'

import { StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'

import * as THREE from 'three'
import Basic from './basic'
import Gallery from './gallery'

// メイン
const Atelier = () => {
  return (
    <div className="w-full h-screen">
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
            fov: 45,
            near: 0.1,
            far: 100,
            position: [0, 0, 4],
          }}
        >
          {/* <Basic /> */}
          <Gallery />
        </Canvas>
      </StrictMode>
    </div>
  )
}

export default Atelier

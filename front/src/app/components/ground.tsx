'use client'
import { extend } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import React from 'react';
extend({ MeshReflectorMaterial });
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

// 地面
const Ground = () => {
  
  return (
    <mesh receiveShadow position={[0, 0, 2]} rotation={[-Math.PI / 2, 0, 0]} scale={[8, 4, 4]}>
      {/* Geometry */}
      <planeGeometry />
      {/* Material */}
      <MeshReflectorMaterial
      
        mirror={0}
        resolution={1024}
        blur={1}
        metalness={0.5}
        depthScale={1}
      />
    </mesh>
  )
}

export default Ground
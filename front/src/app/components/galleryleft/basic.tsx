'use client'

import { useRef, useEffect, useState } from 'react'
import { Perf } from 'r3f-perf'
import { OrbitControls, useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react';
import * as THREE from 'three'

// 基本
const Basic = () => {
  const directionalLight = useRef<THREE.DirectionalLight>(null)
  const boxRef = useRef<THREE.Mesh>(null)
  const [bgColor, setBgColor] = useState(new THREE.Color('white')); // 初期値を'white'に設定

  useEffect(() => {
    setBgColor(new THREE.Color('#808080')); // ページが読み込まれたときに背景色を白に設定
  }, []);

  useEffect(() => {
    localStorage.setItem('bgColor', bgColor.getStyle());
  }, [bgColor]);

  // ダイレクト光のヘルパー
  useHelper(
    directionalLight as React.MutableRefObject<THREE.DirectionalLight>,
    THREE.DirectionalLightHelper,
    1,
    'red'
  )

  useFrame((state, delta) => {
    // 経過時間
    const time = state.clock.elapsedTime
    if (boxRef.current) {
      // X移動
      boxRef.current.position.x = Math.sin(time) + 1.5
      // Y回転
      boxRef.current.rotation.y += delta
    }
  })


  return (
    <>
      {/* コントロール */}
     
      {/* モニター */}
      

      {/* 背景 */}
      <color args={[bgColor]} attach="background" /> {/* 背景色を状態から取得 */}

      {/* 環境光 */}
      

      {/* 平行光 */}
      

      <group position={[0, -1, 0]}>
        {/* 球体 */}
       

        

        {/* 平面 */}
        
      </group>
    </>
  )
}

export default Basic
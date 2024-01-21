'use client'

import * as THREE from 'three'
import { imagesType } from './types'
import { GOLDENRATIO } from './utils'
import { useTexture, useCursor, Decal } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'

const boxGeometry = new THREE.BoxGeometry(1, GOLDENRATIO, 0.05)

// フレーム
const FrameItem = ({ data }: { data: imagesType }) => {
  const texture = useTexture(data.image)
  const [hover, setHover] = useState(false)
  const spotLightRef = useRef<THREE.SpotLight>(null)
  const frameRef = useRef<THREE.Mesh>(null)
  const woodTexture = useTexture('./ai5.jpg');
  const { size, frameSize } = data;

  useEffect(() => {
    if (spotLightRef.current && frameRef.current) {
      // フレームの位置にスポットライトを配置
      spotLightRef.current.target = frameRef.current
    }
  }, [spotLightRef, frameRef])

  // ホバー時にカーソルを変更
  useCursor(hover)

  // フレームのサイズを画像のアスペクト比に合わせる
  const aspectRatio = texture && texture.image ? texture.image.width / texture.image.height : 1;
  const scaleY = GOLDENRATIO
  const scaleX = scaleY * aspectRatio
  

  return (
    <group position={new THREE.Vector3(...data.position)}>
      {/* SpotLight */}
      <spotLight
        ref={spotLightRef}
        castShadow
        color="white"
        intensity={20}
        position={[3, 1, 3]}
        angle={Math.PI / 10}
        penumbra={0.7}
      />

      {/* フレーム */}
      <mesh position={[0, 0.8, 0]} geometry={boxGeometry} castShadow scale={frameSize}>
        <meshStandardMaterial color="gold" metalness={1.8} roughness={10} map={woodTexture} />
        
      </mesh>
      
      {/* 絵 */}
      <mesh
        ref={frameRef}
        name={data.id}
        onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
        onPointerOut={() => setHover(false)}
        geometry={boxGeometry}
        position={[0, 0.8, 0.01]}
        scale={size}
        material-roughness={1}
        dispose={null}
        
      >
        {/* オブジェクトの表面にテクスチャを投影 */}
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[scaleX, scaleY, 5]}
          map={texture}
        />
      </mesh>
    </group>
  )
}

export default FrameItem
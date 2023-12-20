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
  const woodTexture = useTexture('./ai1.jpg');

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
        intensity={0.6}
        position={[0, 3, 3]}
        angle={Math.PI / 5}
        penumbra={0.7}
      />

      {/* フレーム */}
      <mesh position={[0, 0.8, 0]} geometry={boxGeometry} castShadow>
        <meshStandardMaterial color="gold" metalness={1} roughness={0.2} map={woodTexture} />
        
      </mesh>

      {/* 絵 */}
      <mesh
        ref={frameRef}
        name={data.id}
        onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
        onPointerOut={() => setHover(false)}
        geometry={boxGeometry}
        position={[0, 0.8, 0.01]}
        scale={[0.9, 0.94, 0.9]}
        material-roughness={1}
        dispose={null}
      >
        {/* オブジェクトの表面にテクスチャを投影 */}
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[scaleX, scaleY, 1]}
          map={texture}
        />
      </mesh>
    </group>
  )
}

export default FrameItem
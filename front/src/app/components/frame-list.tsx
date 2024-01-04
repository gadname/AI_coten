'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { imagesType } from './types'
import { GOLDENRATIO } from './utils'
import { easing } from 'maath'

import * as THREE from 'three'
import FrameItem from './frame-item'

// フレームリスト
const FrameList = ({ images }: { images: imagesType[] }) => {
  const frameRef = useRef<THREE.Group>(null)
  const clickRef: any = useRef(null)
  const [select, setSelect] = useState('/')
  const targetPosition = useMemo(() => new THREE.Vector3(), [])
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), [])

  useEffect(() => {
    if (frameRef.current) {
      // クリックされたフレームを取得
      clickRef.current = frameRef.current.getObjectByName(select)

      if (clickRef.current) {
        // フレームが存在する場合はその位置にカメラを移動
        const parent = clickRef.current.parent
        parent.updateWorldMatrix(true, true)
        parent.localToWorld(targetPosition.set(0, GOLDENRATIO / 2, 2.2))
        parent.getWorldQuaternion(targetQuaternion)
      } else {
        // フレームが存在しない場合はデフォルトの位置に戻す
        targetPosition.set(0, 0, 4)
        targetQuaternion.identity()
      }
    }
  }, [select, targetPosition, targetQuaternion])

  useFrame((state, delta) => {
    // カメラの位置をフレームの位置に移動
    easing.damp3(state.camera.position, targetPosition, 0.4, delta)
    easing.dampQ(state.camera.quaternion, targetQuaternion, 0.4, delta)
  })

  return (
    <group
      ref={frameRef}
      onClick={(e) => {
        // 1回目のクリックでフレームを選択
        e.stopPropagation()
        setSelect(e.object.name)
      }}
      // フレーム以外をクリックした場合はカメラをデフォルトの位置に戻す
      onPointerMissed={() => setSelect('/')}
    >
      {images.map((data, index) => (
        <FrameItem key={index} data={data} />
      ))}
    </group>
  )
}

export default FrameList

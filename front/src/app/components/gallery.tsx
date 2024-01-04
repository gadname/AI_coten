'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import Wall from './wall'
import Ground from './ground'
import Pole from './pole'
import FrameList from './frame-list'
import InputText from './input-text'

const Gallery = () => {
  const [image, setImage] = useState('./art2.png')
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  // 絵画リスト
  const images = [
    {
      id: '1',
      position: [-1.7, 0.5, 0.05],
      image: './art1.png',
    },
    {
      id: '2',
      position: [0, 0.5, 0.05],
      image: image, // AIで画像を生成する
    },
    {
      id: '3',
      position: [1.7, 0.5, 0.05],
      image: './art3.png',
    },
  ]

  // テキスト入力
  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    // エンターキーが押されたら
    if (e.key === 'Enter') {
      e.preventDefault()
      setLoading(true)

      const inputValue = inputRef.current?.value

      // 入力チェック
      if (!inputValue) {
        setLoading(false)
        return
      }

      try {
        // DALLE APIコール
        const response = await fetch('/api/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: inputValue,
          }),
        })

        const data = await response.json()

        // 画像をセット
        setImage(`data:image/png;base64,${data.photo}`)
      } catch (error) {
        alert(error)
      }

      // 入力フォームクリア
      if (inputRef.current) {
        inputRef.current.value = ''
      }

      setLoading(false)
    }
  }

  return (
    <>
      {/* コントロール */}
      {/* <OrbitControls makeDefault /> */}

      {/* モニター */}
      {/* <Perf position="top-left" /> */}

      {/* 背景 */}
      <color args={['ivory']} attach="background" />

      {/* 環境光 */}
      <ambientLight intensity={0.5} />

      <group position={[0, -1, 0]}>
        {/* 壁 */}
        <Wall />

        {/* 地面 */}
        <Ground />

        {/* ポール */}
        <Pole />

        {/* フレーム */}
        <FrameList images={images} />

        {/* 入力フォーム */}
        <InputText handleKeyPress={handleKeyPress} inputRef={inputRef} loading={loading} />
      </group>
    </>
  )
}

export default Gallery

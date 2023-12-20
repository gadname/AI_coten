'use client'

import { useState, useRef, KeyboardEvent, useEffect, ChangeEvent } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import Wall from './wall'
import Ground from './ground'
import Pole from './pole'
import FrameList from './frame-list'
import InputText from './input-text'

type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
  user_id: number;
  post_id: number;
};

type GalleryProps = {
  posts: Post[];
};

const Gallery: React.FC<GalleryProps> = ({ posts }) => {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // 絵画リスト
  const images = posts ? posts.map(post => ({
    id: post.id.toString(),
    position: [-1.7, 0.5, 0.05],
    image: post.image,
  })) : [];

  // 画像投稿
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        images.push({
          id: (images.length + 1).toString(),
          position: [-1.7, 0.5, 0.05],
          image: base64,
        })
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <>
     

      {/* 背景 */}
      <color attach="background" args={['#ADD8E6']} />

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
        {/* 画像投稿フォーム */}
      </group>
    </>
  )
}

export default Gallery
'use client';
import HomePage from '../components/HomePage';
import Header from '../components/Header';
import Robot from '../components/Robot';
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Snackbar } from "@mui/material";

function SomeComponent() {
  const { data: session, status } = useSession() as any

  const [open, hundleOpen] = useState(false)

  const share = () => {
    if (!session) {
      alert('ログインしてください');
    } else {
      const tweetText = "「Gallery AI」で個展を作成しました！";
      const shareUrl = `https://ai-coten-nu.vercel.app/three?share_id=${session.user_id}&v=20231006`;
      const hashtags = "GalleryAI"; // ハッシュタグを"GalleryAI"に設定
  
      // Twitter Intentでテキスト、URL、ハッシュタグを含めてツイート
      // URLの直後に改行を挿入してからハッシュタグを配置
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}${encodeURIComponent(shareUrl)}%0a&hashtags=${encodeURIComponent(hashtags)}`,
        '_blank'
      );
    }
  }

  return (
    <div>
       <Header onShare={share}/>
      <HomePage />
      {/* <Robot /> */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => {hundleOpen(false)}}
        message="シェア用のURLをコピーしました"
      />
      {/* Other components */}
    </div>
  );
}

export default SomeComponent;
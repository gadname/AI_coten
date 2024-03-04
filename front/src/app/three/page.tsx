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
      const shareUrl = `https://ai-coten-nu.vercel.app/three?share_id=${session.user_id}`
      console.log('shareUrl', shareUrl)
      navigator.clipboard.writeText(shareUrl).then(() => {
        hundleOpen(true) // 仮定: hundleOpenはモーダルを開くための関数
      })
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
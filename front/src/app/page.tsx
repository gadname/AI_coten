'use client';
import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from './components/Login'
import Logout from './components/Logout'
import Header from './components/Header';
import Main from './components/Main';
import Link from 'next/link';
import Ball from './components/Ball';
import Robot from './components/Robot';
import Stars from './components/Stars';
import { Ticket }  from './components/Card';
import  Hed  from './components/Header';
import  Footer  from './components/Footer';
import '../styles/robot.css';
import { Snackbar } from "@mui/material";


const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",

  heroHeadText:
    "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-0",
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",

  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText:
    "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
};

export default function Home() {

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
    <>
    
      <Ticket />
      <div className="absolute top-0 left-0 w-full h-full z-[-1]" style={{ 
        backgroundColor: 'hsla(205,100%,13%,1)',
        backgroundImage: `
        radial-gradient(at 49% 49%, hsla(191,77%,26%,1) 0px, transparent 50%),
        radial-gradient(at 99% 44%, hsla(208,62%,38%,1) 0px, transparent 50%),
        radial-gradient(at 100% 0%, hsla(208,39%,40%,1) 0px, transparent 50%),
        radial-gradient(at 62% 100%, hsla(192,71%,38%,1) 0px, transparent 50%),
        radial-gradient(at 1% 100%, hsla(196,77%,18%,1) 0px, transparent 50%),
        radial-gradient(at 7% 69%, hsla(200,45%,39%,1) 0px, transparent 50%),
        radial-gradient(at 0% 0%, hsla(191,52%,49%,1) 0px, transparent 50%)`
        
      }}>
      
      <Ball />
      </div>
      <Header onShare={share}/>
      
      <Stars />
      <Robot />
      <div className="text-xs sm:text-base">
      <div className="lg:block hidden">
        <Footer />
      </div>
      </div>
      
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => {hundleOpen(false)}}
        message="シェア用のURLをコピーしました"
      />
    </>
  )
}
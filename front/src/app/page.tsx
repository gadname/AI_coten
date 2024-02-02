'use client';
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from './components/Login'
import Logout from './components/Logout'
import Header from './components/Header';
import Main from './components/Main';
import Link from 'next/link';
import Hed from './components/Hed';
import Ball from './components/Ball';
import Robot from './components/Robot';
import '../styles/robot.css';

export default function Home() {
  const typewritewText = "AIで、創る。";
  const typewritewText2 = "DALL-E3を使用し、AIでイラストを作成することができます。";
  const text = "想い、";
  const texts = "描く。";
const verticalText = text.split('').map((char, index) => (
  <div key={index} style={{writingMode: 'vertical-rl'}}>
    {char}
  </div>
));
const verticalTexts = texts.split('').map((char, index) => (
  <div key={index} style={{writingMode: 'vertical-rl'}}>
    {char}
  </div>
));
  const { data: session, status } = useSession()

  return (
    <>
     
     <Hed />
     
     
      <div style={{ position: 'absolute', top: '80px', left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <img src="/AIs.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'fa-bounce 3s ease-in-out, fadeIn 2s ease-in-out forwards, scaleRotate 2s ease-in-out forwards', opacity: 0.5 }} onLoad={(e) => {
           const target = e.target as HTMLImageElement;
           target.style.opacity = '1';
         }} />
        </div>
      <Header />
      <Main />
      <Ball />
      <Robot />
    
      
    </>
  )
}
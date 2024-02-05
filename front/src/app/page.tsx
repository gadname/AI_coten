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
import Flic from './components/flic';
import Stars from './components/Stars';
import { Ticket }  from './components/Card';

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
    
      <Ticket />
      <div className="absolute top-2 left-0 w-full h-full z-[-1]" style={{ 
  backgroundColor: 'hsla(205,100%,13%,1)',
  backgroundImage: `
    radial-gradient(at 49% 49%, hsla(191,77%,26%,1) 0px, transparent 50%),
    radial-gradient(at 99% 44%, hsla(208,62%,38%,1) 0px, transparent 50%),
    radial-gradient(at 100% 0%, hsla(208,39%,40%,1) 0px, transparent 50%),
    radial-gradient(at 62% 100%, hsla(192,71%,38%,1) 0px, transparent 50%),
    radial-gradient(at 1% 100%, hsla(196,77%,18%,1) 0px, transparent 50%),
    radial-gradient(at 7% 69%, hsla(200,45%,39%,1) 0px, transparent 50%),
    radial-gradient(at 0% 0%, hsla(191,52%,49%,1) 0px, transparent 50%)
  `
}}>
  {/* 背景画像 */}
  <Ball />
  </div>
    {/* <Hed /> */}
    <Flic />
    <Header />
    <Main />
    <Stars />
    {/* <Robot /> */}
    </>
  )
}
'use client';
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from './components/Login'
import Logout from './components/Logout'
import Header from './components/Header';
import Main from './components/Main';
import Link from 'next/link';
import Hed from './components/Hed';


export default function Home() {
  const typewritewText = "AIで、創る。";
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
        <img src="/AIs.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'fa-bounce 3s ease-in-out, fadeIn 2s ease-in-out forwards, scaleRotate 2s ease-in-out forwards', opacity: 0.5 }} onLoad={(e) => { e.target.style.opacity = 1 }} />
        </div>
      <Header />
      <h1 className="top_text">{typewritewText}</h1>
      <h2 className="top_text2">{verticalText}</h2>
      <h3 className="top_text3">{verticalTexts}</h3>
      
      <Main />
      <div className="login">
        {status === 'authenticated' ? (
          <div>
            <p>セッションの期限：{session.expires}</p>
            <p>ようこそ、{session.user?.name}さん</p>
            <img
              src={session.user?.image ?? ``}
              alt=""
              style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%',
                position: 'absolute',
                top: '20px',
                left: '50%',
              }}
              onClick={() => {
                if (status === 'authenticated') {
                  signOut();
                } else {
                  signIn();
                }
              }}
            />
            <div>
              <Logout />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    
      
    
      
    </>
  )
}
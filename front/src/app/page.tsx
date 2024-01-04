'use client';
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from './components/Login'
import Logout from './components/Logout'
import Header from './components/Header';
import Main from './components/Main';
import Link from 'next/link';

export default function Home() {
  const typewriterText = "AIで、創る。";
  const { data: session, status } = useSession()

  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <img src="/AIs.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <Header />
      <h1 className="top_text">{typewriterText}</h1>
      
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
    
      
    
      <Link href="/museum">
        <img src="/art_post.png" className="artpost"  />
      </Link>
    </>
  )
}
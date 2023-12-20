import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from '../components/Login'
import Logout from '../components/logout'
import DeleteUser from '../components/deleteUser'
import Header from '../components/Header';
import Main from '../components/Main';
import Link from 'next/link';


export default function Home() {
  const typewriterText = "AIで、創る。";
  const { data: session, status } = useSession()

  const handleImageClick = () => {
    if (status === 'authenticated') {
      signOut();
    } else {
      signIn();
    }
  }

  return (
    <>
     <div>
      <Header />
      <h1 className="top_text">{typewriterText}</h1>
      
      <Main />
      <div className="login">
      {status === 'authenticated' ? (
        <div>
          {/* <p>{session.user.name}</p> */}
          <img src={session.user.image} 
          alt='' className="login"  
        style={{ 
          width: '50px', 
          height: '50px', 
          borderRadius: '50%',
          position: 'absolute',
          top: '20px',
          left: '50%',
          
      }}  
          onClick={handleImageClick}
          />
        
        </div>
      ) : (
        <Login />
      )}
       <Logout />
       <DeleteUser/>
      
    </div>
    
      <Link href="/home">
        <div className="gotoHome">Go to Home</div>
      </Link>
    </div>
    
    <Link href="/create-post">
    <img src="/art_post.png" className="artpost"  />
    </Link>
    </>
  )
}

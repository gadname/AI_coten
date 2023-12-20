import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from '../components/Login'
import Logout from '../components/Logout'
import Header from '../components/Header';
import Main from '../components/Main';
import Link from 'next/link';


export default function Home() {
  const typewriterText = "AIで、創る。";
  const { data: session, status } = useSession()


  return (
    <>
     <div>
      <Header />
      <h1 className="top_text">{typewriterText}</h1>
      
      <Main />
      <div>
			{status === 'authenticated' ? (
				<div>
					<p>セッションの期限：{session.expires}</p>
					<p>ようこそ、{session.user?.name}さん</p>
					<img
						src={session.user?.image ?? ``}
						alt=""
						style={{ borderRadius: '50px' }}
					/>
					<div>
						<Logout />
					</div>
				</div>
			) : (
				<Login />
			)}
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

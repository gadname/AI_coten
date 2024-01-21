'use client';

import Main from '../components/mains'
import Hed from '../components/Hed';
import { useSession, signIn, signOut } from 'next-auth/react'
export default function Home() {
  const { data: session, status } = useSession()
    return (
      <>
        <Main />
        <Hed />
        
      </>
    )
  }
import React from 'react'
import { useSession, signIn } from 'next-auth/react'

const Login = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status !== 'authenticated') {
    return (
      <div>
        <img src="Google.logo.png" 
        style={{ 
          width: '50px', 
          height: '50px', 
          borderRadius: '50%',
          position: 'absolute',
          top: '20px',
          left: '50%',
          
      }}  
        onClick={() => signIn('google', null, { prompt: 'login' })} 
        />
      </div>
    )
  }
  return null
}

export default Login
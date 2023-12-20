import React from 'react'
import { useSession, signOut } from 'next-auth/react'

const Logout = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <div>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    )
  }
  return null
}

export default Logout
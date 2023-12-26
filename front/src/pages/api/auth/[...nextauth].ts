import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) {
        console.log('Account is null or undefined');
        return false;
      }
    
       // ここでaccountオブジェクトをログに出力
      console.log(account);
      const provider = account.provider
      const uid = account.providerAccountId
      const name = user.name
      const email = user.email
      const user_id = account.user_id;
      

      try {
        const response = await axios.post(`${apiUrl}/auth/${provider}/callback`, {
          provider,
          uid,
          name,
          email,
          user_id,
        })

        if (response.status === 200) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.log('エラー', error)
        return false
      }
    },
  },
})
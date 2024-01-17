import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import axios from 'axios';

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    id?: string;
  }
}
interface Token {
  id?: string;
  accessToken?: string;
  user_id?: string;
}

interface Account {
  access_token?: string;
}

interface User {
  id?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const secret = process.env.NEXTAUTH_SECRET;

const nextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || '',
      
    }),
  ],
  
  callbacks: {
    async jwt({ token, account, user }: { token: Token, account: Account, user: User }) {
      if (account && account.access_token && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        token.user_id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.user_id) {
        session.user_id = token.user_id;  // ユーザーIDをセッションに追加
      }
      return session;
    },
    // async signIn({ user, account }: { user: any, account: any }) {
    //   console.log('signIn callback', { user, account }); 
    //   const provider = account?.provider;
    //   const uid = user?.id;
    //   const name = user?.name;
    //   const email = user?.email;
    //   const avatar_url = user?.image;

    
    // },
  },  
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
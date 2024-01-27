import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const secret = process.env.NEXTAUTH_SECRET;
interface Account {
  access_token?: string;
  // Add other account properties as needed
}

interface User {
  id?: string;
  // Add other user properties as needed
}
interface MySession extends Session {
  accessToken?: string;
  user_id?: string;
}

interface MyToken extends JWT {
  accessToken?: string;
  user_id?: string;
}
// NextAuthの設定
const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }: { token: MyToken; account: Account | null; user: User }) {
      if (account && user) {
        token.id = user.id;
        if (account.access_token) {
          token.accessToken = account.access_token;
        }
        if (user.id) {
          token.user_id = user.id;
        }
      }
      return token;
    },
    async session({ session, token }: { session: MySession, token: MyToken }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.user_id) {
        session.user_id = token.user_id;
      }
      return session;
    },
  },
  // 他の設定が必要な場合はここに追加
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const secret = process.env.NEXTAUTH_SECRET;
interface Account {
  access_token?: string;
  provider?: string;
  
  // Add other account properties as needed
}

interface User {
  id?: string;
  name?: string | null;  // Add this line
  email?: string | null;
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
      profile(profile) {
        return {
          id: profile.sub, // Googleの場合、ユーザーIDは `sub` プロパティに格納されています。
          name: profile.name,
          email: profile.email,
          image: profile.picture, // Googleのプロファイルレスポンスには `picture` プロパティが含まれています。
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 24 * 24
  },
  secret: process.env.NEXTAUTH_SECRET || '',
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
    async signIn({ user, account }: { user: User, account: Account | null }) {
      if (!account) return false;
			const provider = account?.provider;
			const uid = user?.id;
			const name = user?.name;
			const email = user?.email; 
			
			try {
				const response = await axios.post(
					`${apiUrl}/auth/${provider}/callback`,
					{
						provider,
						uid,
						name,
						email
					}
				);
				if (response.status === 200) {
					return true;
				} else {
					return false;
				}
			} catch (error) {
				return false;
			}
		},
  },
  // 他の設定が必要な場合はここに追加
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };

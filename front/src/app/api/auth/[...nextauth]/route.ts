import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
declare module "next-auth" {
	/**
	 * セッション型を拡張
	 */
	interface Session {
	  accessToken?: string;
	}
  
	/**
	 * ユーザー型を拡張
	 */
	interface User {
	  id?: string;
	}
  }
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
			
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && account.access_token && user) {
				token.id = user.id;
				token.accessToken = account.access_token;
			}
			console.log('jwt token', token);
			return token;
		},
		async session({ session, token }) {
			if (token.accessToken && token.id) {
				session.accessToken = token.accessToken as string;
			}
			console.log('session', session);
			return session;
		},
		async signIn({ user, account }) {
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
						email,
					}
				);
				if (response.status === 200) {
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.log('エラー', error);
				return false;
			}
		},
	},
});
export { handler as GET, handler as POST };







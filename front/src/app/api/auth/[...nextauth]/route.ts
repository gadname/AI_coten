// front/src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import axios from 'axios';

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    id?: string;
    image?: string;
  }
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const secret = process.env.NEXTAUTH_SECRET;

const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  secret,
  session: {
    strategy: "jwt",
    maxAge: 60 * 24 * 24,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.access_token && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async signIn({ user, account }) {
      const provider = account?.provider;
      const uid = user?.id;
      const name = user?.name;
      const email = user?.email;
      const avatar_url = user?.image;

      try {
        const response = await axios.post(`${apiUrl}/auth/${provider}/callback`, {
          provider,
          uid,
          name,
          email,
          avatar_url,
        });
        return response.status === 200;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
  },
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };


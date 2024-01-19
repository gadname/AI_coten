import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const secret = process.env.NEXTAUTH_SECRET;

const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
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
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.user_id) {
        session.user_id = token.user_id;
      }
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };

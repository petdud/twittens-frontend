import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: "credentials", 
      credentials: {},
      authorize(credentials: any, req: any) {
        const { email, password } = credentials as { 
          email: string, 
          password: string 
        };
        if (email !== process.env.NEXTAUTH_ADMN_EMAIL || password !== process.env.NEXTAUTH_ADMN_PW) {
          return null;
        }

        return { id: "0", email };
      }
    }),
  ],
  pages: {
    signIn: "/admin/login"
  }
}

export default NextAuth(authOptions);

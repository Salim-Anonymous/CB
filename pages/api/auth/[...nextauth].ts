import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

// @ts-ignore
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  theme:{
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  },
  pages: {
    signIn:"/auth/signin",
  },
  callbacks:{
    async session({session,token,user}){
      session.user.username = session.user.name.split(" ")[0].toLowerCase()
      session.user.uid = token.sub
      return session
    }
  }
}
export default NextAuth(authOptions)

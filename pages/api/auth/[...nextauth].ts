import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { db } from "../../../firebase";

// @ts-ignore
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  theme:{
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  },
  pages: {
    signIn:"/auth/signin",
  },
  callbacks:{
    async session({session,token,user}){
      session.user.username = session.user.name
      session.user.uid = token.sub
      //store user data in firestore v9
      const userRef = doc(db,"users",session.user.uid);
      const userSnap = await getDoc(userRef);
      if(!userSnap.exists()){
        setDoc(userRef,{
          username:session.user.username,
          email:session.user.email,
          createdAt:serverTimestamp(),
          photoUrl:session.user.image,
          updatedAt:serverTimestamp(),
          lastSeen:serverTimestamp(),
        })
      }else{
        updateDoc(userRef,{
          lastSeen:serverTimestamp(),
        })
      }
      console.log(session);
      return session
    }
  }
}
export default NextAuth(authOptions)

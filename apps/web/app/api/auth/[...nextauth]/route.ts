import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }: { user: any }) {
      const userData = {
        name: user.name,
        email: user.email
      };

      console.log("User data received in signIn callback:", userData);
      
      try {
        // Send data to backend (apps/api)
        await fetch("http://localhost:3001/api/googleSignup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      } catch (err) {
        console.error("Error sending user data to backend:", err);
      }

      return true; 
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

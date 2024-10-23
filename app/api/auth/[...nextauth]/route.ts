import NextAuth, { Account, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { USER_TYPES } from "@/constants";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({
      account,
      profile,
      user,
    }: {
      account: Account | null;
      profile?: Profile | undefined;
      user: any;
    }) {
        console.log("account: ", account)
        console.log("profile: ", profile)
        console.log("user: ", user)
      // Send Google user token and profile to your Node.js backend for login/registration handling
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: account?.id_token,
            email: profile?.email,
            userType: USER_TYPES.user
          }),
        }
      );

      const data = await res.json();
      console.log("data: ", data);
      return data.success;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    }
  },
});

export { handler as GET, handler as POST }

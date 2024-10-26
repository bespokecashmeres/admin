import NextAuth, { Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { ROUTES, USER_TYPES } from "@/constants";
import { pickProperties } from "@/utils/common.utils";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account }: { account: Account | null }) {
      // Send Google user token and profile to your Node.js backend for login/registration handling
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: account?.id_token,
            userType: USER_TYPES.admin,
          }),
        }
      );
      const data = await res.json();
      console.log("data: ", data);

      if (data.success && account) {
        const result = data?.data;
        const userData = pickProperties(result, [
          "_id",
          "first_name",
          "middle_name",
          "last_name",
          "gender",
          "email",
          "country_id",
          "profile_picture",
          "mobile_number"
        ]);

        account.accessToken = result?.token;
        account.userData = JSON.stringify(userData);

        // cookieData.set(LOCAL_STORAGE.aToken, result?.token, {
        //   maxAge: 30 * 24 * 60 * 60,
        //   path: "/",
        //   secure: true,
        //   httpOnly: true,
        //   sameSite: "strict",
        // });

        // cookieData.set(LOCAL_STORAGE.admin, JSON.stringify(userData), {
        //   maxAge: 30 * 24 * 60 * 60,
        //   path: "/",
        //   secure: true,
        //   httpOnly: true,
        //   sameSite: "strict",
        // });

      }
      console.log("data: ", data);
      return data.success;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.accessToken;
        token.userData = account.userData; 
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;  // Custom token
      (session as any).userData = token.userData;  // Custom user data
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/${ROUTES.admin}/${ROUTES.auth}/${ROUTES.google}`;
    },
  },
});

export { handler as GET, handler as POST };

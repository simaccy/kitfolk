import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      // KitFolk early access is curated. We allow Google as the only provider
      // for now, then collect the rest in onboarding.
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Persist a stable user id on the JWT so we can use it across the app
    // without a database in v1.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

// lib/auth.ts

import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: "openid profile email" },
      },
      userinfo: {
        url: "https://api.linkedin.com/v2/userinfo",
      },
      async profile(profile, tokens) {
        // Fetch additional data from LinkedIn
        const profileResponse = await fetch(
          "https://api.linkedin.com/v2/me?projection=(vanityName)",
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          }
        );

        const emailResponse = await fetch(
          "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          }
        );

        const profileData = await profileResponse.json();
        const emailData = await emailResponse.json();
        const email = emailData.elements?.[0]?.["handle~"]?.emailAddress;

        // The object returned here is the 'user' object in your session
        return {
          id: profile.sub,
          name: profile.name,
          email: email || null,
          image: profile.picture, // Use 'image' for NextAuth's internal key
          vanityUrl: profileData.vanityName,
        };
      },
    }),
  ],
  callbacks: {
    // In v5, you don't need to manually pass user info from profile to jwt
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // The user object is automatically available in the session callback
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string;
      // Add custom user data to the session object
      if (session.user) {
        session.user.vanityUrl = user.vanityUrl;
      }
      return session;
    },
  },
  pages: {
    signIn: "/profile",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});

// Update type declarations to match the new structure
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null; // This is now the key for the user's avatar URL
      vanityUrl?: string;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    vanityUrl?: string;
  }
}

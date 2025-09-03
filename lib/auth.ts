// lib/auth.ts

// lib/auth.ts

import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import { supabase } from "./supabase"; // Import the Supabase client

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
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

        return {
          id: profile.sub,
          name: profile.name,
          email: email || null,
          image: profile.picture,
          vanityUrl: profileData.vanityName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string;
      if (session.user) {
        session.user.vanityUrl = user.vanityUrl;
        session.user.avatarUrl = user.image; // Correctly map image to avatarUrl

        // Fetch profile from Supabase to get public_identifier
        const { data: profile } = await supabase
          .from("profiles")
          .select("public_identifier")
          .eq("id", user.id)
          .single();

        if (profile) {
          session.user.public_identifier = profile.public_identifier;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      avatarUrl?: string | null; // Add avatarUrl
      vanityUrl?: string;
      public_identifier?: string; // Add public_identifier
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    vanityUrl?: string;
  }
}

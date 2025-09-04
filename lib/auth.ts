// lib/auth.ts
import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import { supabase } from "./supabase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      // LinkedIn is not an OIDC provider for discovery; use OAuth scopes
      authorization: {
        params: { scope: "r_liteprofile r_emailaddress" },
      },
      // Fetch profile/email manually using the access token
      async profile(profile, tokens) {
        const accessToken = (tokens as any)?.access_token;
        if (!accessToken) {
          return {
            id: profile?.sub ?? null,
            name: profile?.name ?? null,
            email: null,
            image: null,
            vanityUrl: null,
          };
        }

        // Basic profile (vanityName, localized names, profile picture)
        const profileRes = await fetch(
          "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,vanityName,profilePicture(displayImage~:playableStreams))",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const profileData = await profileRes.json();

        // Email address
        const emailRes = await fetch(
          "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const emailData = await emailRes.json();
        const email = emailData?.elements?.[0]?.["handle~"]?.emailAddress ?? null;

        const name = `${profileData?.localizedFirstName ?? ""} ${profileData?.localizedLastName ?? ""}`.trim() || null;

        // try to extract a profile image URL (highest-res identifier)
        let image: string | null = null;
        try {
          const displayImage = profileData?.profilePicture?.["displayImage~"];
          const elements = displayImage?.elements || [];
          // find the last identifier (usually highest resolution)
          const identifiers = elements.flatMap((el: any) => el.identifiers || []);
          image = identifiers?.[0]?.identifier ?? null;
        } catch (e) {
          image = null;
        }

        return {
          id: profileData.id,
          name,
          email,
          image,
          vanityUrl: profileData.vanityName ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        // vendor-specific vanityName from profile() above
        (token as any).vanityUrl = (profile as any).vanityUrl ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token and vanityUrl to session so client can call API endpoints
      (session as any).accessToken = (token as any).accessToken as string | undefined;
      if (session.user) {
        (session.user as any).vanityUrl = (token as any).vanityUrl;
        // Attempt (best-effort) to fetch the public_identifier from Supabase profiles table
        try {
          const userId = session.user?.id;
          if (userId) {
            const { data: profileRow, error } = await supabase
              .from("profiles")
              .select("public_identifier")
              .eq("id", userId)
              .single();
            if (!error && profileRow) {
              (session.user as any).public_identifier = profileRow.public_identifier;
            }
          }
        } catch (e) {
          // non-fatal: do not fail session due to Supabase lookup error
          console.warn("Supabase profiles lookup failed in session callback:", e);
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
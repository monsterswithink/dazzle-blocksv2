import { AuthUser } from "./authuser";

/**
 * Represents the full user profile, combining NextAuth user data
 * with the `profiles` table from Supabase.
 */
export type UserProfile = AuthUser & {
  // Supabase `profiles` table fields
  public_identifier?: string | null;
  created_at?: string;
  updated_at?: string;
};

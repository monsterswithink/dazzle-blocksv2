// app/api/profile/route.ts
// Proper /api/profile GET handler (replaces an accidental copy of NextAuth config)

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/profile
 * Return the authenticated user's profile row from the `profiles` table.
 */
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Supabase profiles error:", error);
      return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Unexpected error in /api/profile:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
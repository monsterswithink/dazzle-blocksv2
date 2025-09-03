import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Select the `data` JSONB column (per your DB schema) and return it as `resume`
  const { data, error } = await supabase
    .from("resumes")
    .select("id, user_id, data, created_at, updated_at")
    .eq("user_id", session.user.id)
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ resume: null });
    }
    console.error("Error fetching resume ID:", error.message || error);
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }

  const resume = data
    ? {
        id: data.id,
        userId: data.user_id,
        content: data.data, // return the JSON under `content` for backward compatibility
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
    : null;

  return NextResponse.json({ resume });
}
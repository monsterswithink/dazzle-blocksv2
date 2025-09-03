import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Resume } from "@/types/collaboration";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("resumes")
    .select("id, title, content, theme, created_at, updated_at")
    .eq("user_id", session.user.id)
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ resume: null });
    }
    console.error("Error fetching resume ID:", error.message);
    return NextResponse.json({ error: "Failed to fetch resume ID" }, { status: 500 });
  }

  // Resume snapshot
  const resume: Resume = {
    id: data.id,
    userId: session.user.id,
    title: data.title,
    content: data.content,
    theme: data.theme,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };

  return NextResponse.json({ resume });
}

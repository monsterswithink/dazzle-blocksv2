// app/api/user/resume/route.ts
// Keep the route but return resumeId (backwards-compatible shape expected by frontend)

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("resumes")
    .select("id, user_id, data, created_at, updated_at")
    .eq("user_id", session.user.id)
    .limit(1)
    .single();

  if (error) {
    // If no resume row found return explicit nulls so frontend knows "none"
    console.error("Error fetching resume:", error.message || error);
    return NextResponse.json({ resumeId: null, resume: null }, { status: 200 });
  }

  const resume = data
    ? {
        id: data.id,
        userId: data.user_id,
        content: data.data, // JSONB content
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
    : null;

  // Return resumeId for compatibility with ProfileContent and other consumers
  return NextResponse.json({ resumeId: resume?.id ?? null, resume });
}
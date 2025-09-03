// lib/resume-service.ts
import { supabase } from "@/lib/supabase";
import type { EnrichedProfile } from "@/types/enrichedprofile";
import type { ProcessedProfile } from "@/types/processedprofile";
import type { Session } from "next-auth";

/**
 * Save an enriched profile -> processed profile into the `resumes` table.
 * Note:
 *  - The DB uses a `data` JSONB column (see scripts/create-resumes-table.sql).
 *  - We persist the processed JSON object directly (no JSON.stringify) so the
 *    Supabase client will store JSONB correctly.
 */
export async function saveResumeToSupabase(
  profileData: EnrichedProfile,
  session: Session
): Promise<string> {
  try {
    const processedData = transformProfileToResume(profileData);

    const { data, error } = await supabase
      .from("resumes")
      .insert({
        // if profileData.public_identifier exists use it, otherwise let DB generate
        id: profileData.public_identifier || undefined,
        user_id: session.user.id,
        email: session.user.email || null,
        data: processedData, // store JSONB directly
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw error;
  }
}

/**
 * Transform EnrichedProfile -> ProcessedProfile
 *
 * IMPORTANT: Ensure the shape produced here matches types/processedprofile.ts:
 *  - experiences should have `start` and `end` (Date | null) keys (not starts_at/ends_at)
 *  - education should have `start` and `end` keys (Date | null)
 *  - skills normalized to { name, level }
 */
function transformProfileToResume(profile: EnrichedProfile): ProcessedProfile {
  const toDate = (s?: string | null): Date | null => {
    if (!s) return null;
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  };

  const experiences =
    (profile.experiences || []).map((exp, index) => ({
      title: exp.title || "",
      company: exp.company || "",
      start: toDate(exp.start_date) || new Date(), // ProcessedProfile expects Date for start
      end: exp.end_date ? toDate(exp.end_date) : null,
      duration: calculateDurationFromStrings(exp.start_date, exp.end_date),
      isCurrent: !exp.end_date,
      description: exp.description || "",
      location: exp.location || "",
      sortOrder: index,
    })) || [];

  const education =
    (profile.education || []).map((edu) => ({
      degree: edu.degree || "",
      university: edu.university || "",
      start: toDate(edu.start_date) || new Date(),
      end: edu.end_date ? toDate(edu.end_date) : null,
      description: edu.description || "",
    })) || [];

  const skills =
    (profile.skills || []).map((s) => ({
      name: s.name,
      level: normalizeSkillLevel(s.level),
    })) || [];

  const location = [profile.city, profile.state, profile.country]
    .filter(Boolean)
    .join(", ");

  const processed: ProcessedProfile = {
    ...profile,
    email: undefined,
    experiences,
    education,
    skills,
    location,
    profileStats: {
      totalExperience: calculateTotalExperienceFromEnriched(profile.experiences || []),
      companiesWorked: (profile.experiences || []).length,
      currentRole:
        (profile.experiences || []).find((e) => !e.end_date)?.title || null,
    },
  } as ProcessedProfile;

  return processed;
}

function normalizeSkillLevel(level?: number | null): number {
  if (!level || isNaN(level)) return 3;
  // clamp 1-5
  return Math.max(1, Math.min(5, Math.round(level)));
}

function calculateDurationFromStrings(start?: string, end?: string) {
  if (!start) return "Unknown duration";
  try {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const years = endDate.getFullYear() - startDate.getFullYear();
    if (years === 0) return "Less than 1 year";
    if (years === 1) return "1 year";
    return `${years} years`;
  } catch {
    return "Unknown duration";
  }
}

function calculateTotalExperienceFromEnriched(experience: any[]): string {
  if (!experience || !experience.length) return "0 years";

  const totalYears = experience.reduce((total, exp) => {
    const start = exp.start_date ? new Date(exp.start_date) : null;
    const end = exp.end_date ? new Date(exp.end_date) : new Date();
    if (!start) return total;
    return total + (end.getFullYear() - start.getFullYear());
  }, 0);

  if (totalYears === 0) return "Less than 1 year";
  if (totalYears === 1) return "1 year";
  return `${totalYears} years`;
}

// Backward compatibility / small helpers
export async function createResume(data: any) {
  // expecting EnrichedProfile + session handled externally
  return saveResumeToSupabase(data, (data as any).session);
}

/**
 * Fetch resume by id from `resumes.data` (JSONB).
 * Returns the parsed JSON as ProcessedProfile.
 */
export async function getResumeById(id: string): Promise<ProcessedProfile | null> {
  try {
    const { data, error } = await supabase
      .from("resumes")
      // select the JSONB `data` column
      .select("data")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching resume:", error.message || error);
      return null;
    }

    // Supabase client parses JSONB, so `data.data` should already be the object.
    return data?.data as ProcessedProfile | null;
  } catch (error) {
    console.error("Error in getResumeById:", error);
    return null;
  }
}
// lib/resume-service.ts
import { supabase } from "@/lib/supabase";
import type { EnrichedProfile } from "@/types/enrichedprofile";
import type { ProcessedProfile } from "@/types/processedprofile";
import type { Session } from "next-auth"; // Import the Session type

export async function saveResumeToSupabase(
  profileData: EnrichedProfile,
  session: Session // <--- Pass the session here
): Promise<string> {
  try {
    const processedData = transformProfileToResume(profileData);

    const { data, error } = await supabase
      .from("resumes")
      .insert({
        id: profileData.public_identifier,
        user_id: session.user.id,
        email: session.user.email || null, // <--- Use the email from the session
        data: JSON.stringify(processedData),
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
// ...

function transformProfileToResume(profile: EnrichedProfile): ProcessedProfile {
  return {
    ...profile,
    experience: (profile.experience || []).map((exp, index) => ({
      ...exp,
      starts_at: exp.starts_at
        ? {
            formatted: formatDate(exp.starts_at),
            raw: exp.starts_at,
            isPresent: false,
          }
        : null,
      ends_at: exp.ends_at
        ? {
            formatted: formatDate(exp.ends_at),
            raw: exp.ends_at,
            isPresent: !exp.ends_at,
          }
        : null,
      duration: calculateDuration(exp.starts_at, exp.ends_at),
      isCurrent: !exp.ends_at,
      sortOrder: index,
    })),
    location: `${profile.city || ""}, ${profile.country || ""}`
      .trim()
      .replace(/^,|,$/, ""),
    profileStats: {
      totalExperience: calculateTotalExperience(profile.experience || []),
      companiesWorked: (profile.experience || []).length,
      currentRole:
        (profile.experience || []).find((exp) => !exp.ends_at)?.title || null,
    },
  };
}

function formatDate(dateObj: any): string {
  if (!dateObj) return "Present";
  const { year, month } = dateObj;
  if (!year) return "Present";
  if (!month) return year.toString();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[month - 1]} ${year}`;
}

function calculateDuration(start: any, end: any): string {
  if (!start) return "Unknown duration";
  if (!end) return "Present";

  const startYear = start.year || 0;
  const endYear = end.year || new Date().getFullYear();
  const years = endYear - startYear;

  if (years === 0) return "Less than 1 year";
  if (years === 1) return "1 year";
  return `${years} years`;
}

function calculateTotalExperience(experience: any[]): string {
  if (!experience.length) return "0 years";

  const totalYears = experience.reduce((total, exp) => {
    const startYear = exp.starts_at?.year || 0;
    const endYear = exp.ends_at?.year || new Date().getFullYear();
    return total + (endYear - startYear);
  }, 0);

  if (totalYears === 0) return "Less than 1 year";
  if (totalYears === 1) return "1 year";
  return `${totalYears} years`;
}

// Backward compatibility functions
export async function createResume(data: any) {
  return saveResumeToSupabase(data);
}

export async function getResumeById(id: string): Promise<ProcessedProfile | null> {
  try {
    const { data, error } = await supabase
      .from("resumes")
      .select("content")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching resume:", error.message);
      return null;
    }

    return data.content as ProcessedProfile;
  } catch (error) {
    console.error("Error in getResumeById:", error);
    return null;
  }
}

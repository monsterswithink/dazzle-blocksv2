import { notFound, redirect } from "next/navigation";
import { getResumeById } from "@/lib/resume-service";
import { ResumeDisplay } from "@/blocks/ResumeDisplay";
import { auth } from "@/lib/auth";

interface ResumeViewPageProps {
  params: {
    id: string;
  };
}

export default async function ResumeViewPage({ params }: ResumeViewPageProps) {
  const session = await auth();
  if (!session) {
    redirect("/profile"); // Redirect to sign-in if not authenticated
  }

  const resumeId = params.id;
  const resumeData = await getResumeById(resumeId);

  if (!resumeData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-12">
      <ResumeDisplay resumeData={resumeData} theme="modern" />
    </div>
  );
}

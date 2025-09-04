"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { AuthUser } from "@/types/authuser";

// Extend the Session type to include accessToken if needed
type ExtendedSession = Session & { accessToken?: string };
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isFetchingResumeId, setIsFetchingResumeId] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
    if (session) {
      const extendedSession = session as ExtendedSession;
      if (extendedSession?.accessToken) {
        fetch("/api/profile", {
          headers: { Authorization: `Bearer ${extendedSession.accessToken}` },
        })
          .then((res) => res.json())
          .then((data) => setProfile(data))
          .catch(() => setError("Failed to load profile"));

        setIsFetchingResumeId(true);
        fetch("/api/user/resume")
          .then((res) =>
            res.ok
              ? res.json()
              : Promise.reject("Failed to fetch resume ID")
          )
          .then((data) => {
            if (data.resumeId) {
              setResumeId(data.resumeId);
            }
          })
          .catch(() => setError("Failed to fetch resume ID."))
          .finally(() => setIsFetchingResumeId(false));
      }
    }
  }, [session, status, router]);

  const handleEnrich = async () => {
    if (!profile?.vanityName) {
      alert("Missing vanityName");
      return;
    }

    const res = await fetch(`/api/enrich?vanityName=${profile.vanityName}`);
    if (!res.ok) {
      alert("Failed to fetch enriched profile");
      return;
    }

    const enrichedData = await res.json();
    sessionStorage.setItem("enrichedProfile", JSON.stringify(enrichedData));
    router.push("/profile/enriched");
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user as AuthUser;

  return (
    <main className="flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center p-4 md:p-6 lg:p-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user?.avatarUrl || "/placeholder-user.jpg"}
              alt={user?.name || "User Avatar"}
            />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">
            {user?.name || "User Profile"}
          </CardTitle>
          {user?.email && <p className="text-gray-600">{user.email}</p>}
          {user?.vanityUrl && (
            <p className="text-gray-500">
              LinkedIn:{" "}
              <a
                href={user.vanityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {user.vanityUrl}
              </a>
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            <Button asChild size="lg" disabled={isFetchingResumeId || !resumeId}>
              <Link href={resumeId ? `/resume/${resumeId}` : "#"}>
                {isFetchingResumeId
                  ? "Loading Resume..."
                  : resumeId
                  ? "View Resume"
                  : "No Resume Found"}
              </Link>
            </Button>
            {profile && (
              <Button onClick={handleEnrich} variant="outline" size="lg">
                Enrich Profile with LinkedIn Data
              </Button>
            )}
            <Button asChild variant="destructive" size="lg">
              <Link href="/profile">Sign Out</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Loader2 } from "lucide-react";
import type { AuthUser } from "@/types/authuser";
import type { UserProfile } from "@/types/profile";

export default function ProfileContent() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isFetchingResumeId, setIsFetchingResumeId] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // typed view of the NextAuth user object
  const authUser = (session?.user as AuthUser | undefined) ?? undefined;

  useEffect(() => {
    // Only run when authenticated
    if (status === "authenticated") {
      const accessToken = (session as any)?.accessToken as string | undefined;
      if (accessToken) {
        // Fetch full profile
        fetch("/api/profile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((res) => (res.ok ? res.json() : Promise.reject("Failed to load profile")))
          .then((data) => setProfile(data))
          .catch(() => setError("Failed to load profile data."));

        // Fetch resume ID
        setIsFetchingResumeId(true);
        fetch("/api/user/resume", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch resume ID")))
          .then((data) => {
            if (data?.resumeId) {
              setResumeId(data.resumeId);
            } else {
              console.log("No resume found for this user.");
            }
          })
          .catch(() => setError("Failed to fetch resume ID."))
          .finally(() => setIsFetchingResumeId(false));
      }
    }
  }, [session, status]);

  const handleEnrich = async () => {
    if (!authUser?.vanityUrl) {
      alert("LinkedIn vanity URL not found in your session.");
      return;
    }
    const vanityName = authUser.vanityUrl.split("/").pop();
    const res = await fetch(`/api/enrich?vanityName=${vanityName}`);
    if (!res.ok) {
      alert("Failed to fetch enriched profile");
      return;
    }
    const enrichedData = await res.json();
    sessionStorage.setItem("enrichedProfile", JSON.stringify(enrichedData));
    console.log(enrichedData);
    alert("Profile enriched successfully! Data is in session storage and console.");
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  const user = authUser;
  const canEditResume = !isFetchingResumeId && resumeId;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
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
                href={`https://www.linkedin.com/in/${user.vanityUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {user.vanityUrl}
              </a>
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col gap-4">
            <Button asChild size="lg" disabled={!canEditResume}>
              <Link href={canEditResume ? `/editor/${resumeId}` : "#"}>
                {isFetchingResumeId ? "Loading Resume..." : (resumeId ? "Start/Edit Resume" : "No Resume Found")}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleEnrich}
              disabled={!authUser?.vanityUrl}
            >
              Enrich Profile with LinkedIn Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

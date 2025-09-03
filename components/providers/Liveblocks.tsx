"use client";

import { createClient, LiveblocksProvider } from "@liveblocks/client";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import type { AuthUser } from "@/types/authuser";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

export function LiveblocksProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  const authUser = session?.user as AuthUser & { public_identifier?: string };

  if (!authUser?.public_identifier) {
    console.warn("Liveblocks user cannot be identified. Missing public_identifier.");
    return <>{children}</>;
  }

  // Get a token from your auth endpoint
  const public_key = process.env.LIVEBLOCKS_PUBLIC_KEY;

  return (
    <LiveblocksProvider client={client} >
      {children}
    </LiveblocksProvider>
  );
}

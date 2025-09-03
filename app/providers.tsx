"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import React from "react";
import { Toaster } from "@/ui/sonner";
import { LiveblocksProvider } from "@/components/providers/Liveblocks";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}
      >
        <LiveblocksProvider>{children}</LiveblocksProvider>
        <Toaster />
      </NextThemesProvider>
    </SessionProvider>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { Home } from "lucide-react";
import React from "react";

export function NotFoundContent() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <h1 className="text-9xl font-black">404</h1>
        <p className="text-2xl">Page Not Found</p>
        <Button asChild size="lg">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundContent;

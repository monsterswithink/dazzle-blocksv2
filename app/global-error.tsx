"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string } | null;
  reset?: () => void;
}) {
  React.useEffect(() => {
    // Log to console so server/terminal has the error stack while developing.
    if (error) console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
      <div className="max-w-xl w-full text-center space-y-6 bg-card p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred. Try reloading the page, or return to your profile.
        </p>

        <div className="flex items-center justify-center gap-3">
          {reset ? (
            <button
              onClick={() => reset()}
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Try again
            </button>
          ) : null}
          <a
            href="/profile"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium"
          >
            Go to Profile
          </a>
        </div>

        {error?.message ? (
          <pre className="text-xs text-left mt-4 max-h-36 overflow-auto bg-muted p-2 rounded">
{String(error.message)}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
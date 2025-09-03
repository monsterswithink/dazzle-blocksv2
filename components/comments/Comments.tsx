"use client";

import { useMemo } from "react";
import { useThreads } from "@liveblocks/react";
import {
  Thread,
  Message,
  Avatar,
} from "@liveblocks/react-comments";

export function Comments() {
  const { threads } = useThreads();

  return (
    <div>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

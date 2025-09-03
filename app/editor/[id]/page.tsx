"use client";
import dynamic from "next/dynamic";
import { RoomProvider } from "@liveblocks/react";

const ResumeEditor = dynamic(
  () => import("@/blocks/ResumeEditor").then((mod) => mod.ResumeEditor),
  {
    ssr: false,
  }
);

export default function EditorPage({ params }: { params: { id: string } }) {
  return (
    <RoomProvider
      id={params.id}
      initialPresence={{}}
      initialStorage={{
        resumeData: {},
      }}
    >
      <ResumeEditor resumeId={params.id} />
    </RoomProvider>
  );
}

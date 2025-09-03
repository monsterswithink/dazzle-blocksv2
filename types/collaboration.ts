// ./types/collaboration.ts

// ---------------------------
// Supabase persisted data
// ---------------------------
export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: string; // latest saved content (HTML/JSON)
  theme: string;
  createdAt: string;
  updatedAt: string;
}

// Minimal user info persisted in Supabase
export interface UserProfile {
  id:string;
  email: string;
  name: string;
  avatarUrl?: string;
  vanityUrl?: string; // LinkedIn vanity URL
  occupation?: string;
}

// ---------------------------
// Liveblocks collaboration models
// ---------------------------

export type LiveblocksRoom = {
  resumeData: any;
};

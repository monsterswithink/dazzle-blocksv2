import { Liveblocks } from "@liveblocks/node";
import { auth } from "@/lib/auth";
import type { AuthUser } from "@/types/authuser";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = session.user as AuthUser & { public_identifier?: string };

  if (!user.public_identifier) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Identify the user and return a token
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.public_identifier,
      groupIds: [], // Optional
    },
    {
      userInfo: {
        name: user.name,
        picture: user.avatarUrl,
      },
    }
  );

  return new Response(body, { status });
}

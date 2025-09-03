# GPT

**🧠 Updated Full AI Handoff Prompt — Liveblocks SDK + TipTap + Supabase + LinkedIn Sync**

# **[PROJECT OVERVIEW]:**

Create a Next.js 15+ App Router resume editor using Liveblocks SDK + TipTap, integrated with Supabase for authentication/session management.

# **[Goal]**

- Fully type-safe editor using provided types/profile.ts.
- Fetch resume data from JSON (EnrichedProfile) stored at /public/data/initial-resume-data.json.
- Supabase authentication:
- 
  - [ ] JWT-based sessions.
  - [ ] Fetch LinkedIn vanityUrl from session using appropriate scopes.
  - [ ] Construct LinkedIn profile URL dynamically:

```
const linkedInProfileUrl = https://www.linkedin.com/in/${session.user.vanityUrl};
```

- 
  - [ ] All LinkedIn sync logic handled via session + JWT validation.
  - [ ] Floating pill-shaped toolbar fixed at bottom with:
  - [ ] Theme dropdown (JSON Tailwind themes from /public/themes/theme-*.json).
  - [ ] Share popover containing 3 cards:
  - 
    1. Permalink → QR code generator (any API / Next.js solution acceptable).
    2. Print → printer-friendly layout.
    3. Download PDF → export resume.
  - [ ] Using LiveBlocks/Tiptap or liveblocks/react, we will create an editable resume for those that have upgraded to the $9.99 plan but we just need to get the editing working first!
  - [ ] The resume will include a theme changer dropdown from the tools/FloatingToolbar component the automatically themes the resume based on the occupation fetched enrichedlayer api
  - [ ] ‘types/*’ Files work like this:
        - [ ] the `authuser.ts` file handles just the nextj Linked authentication types which is stored in supabase in the ‘private.auth.users’ schema.table.field private default supabase table. Supabase doesnt handle the auth, it simply captures the data needed to then build the full linkedin profile url from the user by taking the `vanityUrl` captured back from the linkedin oAuth scopes, and appending it to the end to build the url such as: `https://linkedin.com/in/{vanityUrl}` 
        - [ ] the `enrichedlayer.ts` file handles just the fields being returned by ***enrichedlayer AP***I. Note that while all of those fields must be present at all times in the resume—whether the data exists or in the response, they all need to be supported in the resume and in all editing modes, both for the ResumeDisplay component and ResumeEditor component—*these components dont actually pull in from the enrichedlayer.ts types file. This types file simply acts as the ingestion point to capture the API response back.* This is then *sent directly to supabase to be stored in the ‘resumes’ table.
        - [ ] The `processedprofile.ts` types are the user facing types that all the components actually pull from in the editing experience. Instead of straight up copying out the types from `enrichedlayer.ts` it imports what it needs, transforms the dates to be readable, and mutates certain data for a better user experience. 
  - [ ] Edit toggle → all text & profile photo become Liveblocks-live editable.
  - [ ] LinkedIn sync button.

### [RESUME CONTENT:

- 
  - [ ] Render experiences, education, certifications, volunteer work, publications.
  - [ ] Skills as progress bars.
  - [ ] Email, LinkedIn, website icons.
  - [ ] Collapsible sections for experiences.
- 
- Move mock data from ResumeEditor.tsx to Y.js / Velt-compatible JSON storage.
- Fully responsive, modern Vercel-style UI.

**[FILE STRUCTURE]: currently reciev**

```
.
├── .gitignore
├── README.md
├── app
│   ├── api
│   │   ├── auth
│   │   │   ├── [...nextAuth]
│   │   │   │   └── route.ts
│   │   │   └── error
│   │   │       └── route.ts
│   │   ├── enrich
│   │   │   └── route.ts
│   │   ├── liveblocks-auth
│   │   │   └── route.ts
│   │   ├── profile
│   │   │   └── route.ts
│   │   └── user
│   │       └── resume
│   │           └── route.ts
│   ├── auth
│   │   ├── error.tsx
│   │   └── loading.tsx
│   ├── editor
│   │   └── [id]
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── profile
│   │   └── page.tsx
│   ├── providers.tsx
│   ├── resume
│   │   └── [id]
│   │       └── page.tsx
│   └── styles
│       └── glitch.css
├── bun.lock
├── components
│   ├── blocks
│   │   ├── AuthErrorContent.tsx
│   │   ├── CollapsibleSection.tsx
│   │   ├── EditableText.tsx
│   │   ├── HomeContent.tsx
│   │   ├── NotFoundContent.tsx
│   │   ├── ProfileContent.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ProfileSnapshotCard.tsx
│   │   ├── ResumeDisplay.tsx
│   │   ├── ResumeEditor.tsx
│   │   └── Skills.tsx
│   ├── comments
│   │   └── Comments.tsx
│   ├── micro
│   │   └── SignIn.tsx
│   ├── providers
│   │   └── Liveblocks.tsx
│   ├── theme-provider.tsx
│   ├── tools
│   │   ├── FloatingToolbar.tsx
│   │   ├── ProfileVideoButton.tsx
│   │   └── SharePopover.tsx
│   └── ui
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── collapsible.tsx
│       ├── context-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── resizable.tsx
│       ├── select.tsx
│       ├── sonner.tsx
│       └── textarea.tsx
├── components.json
├── filetree.txt
├── instructions
│   ├── STEP1_TOOLBAR.md
│   └── agents.md
├── lib
│   ├── auth.ts
│   ├── liveblocks-data-provider.ts
│   ├── resume-service.ts
│   ├── supabase.ts
│   └── utils.ts
├── middleware.ts
├── new.txt
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── data
│   │   └── initial-resume-data.json
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   ├── placeholder.svg
│   └── themes
│       ├── theme-classic.json
│       ├── theme-creative.json
│       ├── theme-minimal.json
│       └── theme-modern.json
├── scripts
│   └── create-resumes-table.sql
├── styles
│   └── globals.css
├── tailwind.config.ts
├── tsconfig.json
└── types
    ├── authuser.ts
    ├── collaboration.ts
    ├── enrichedprofile.ts
    ├── processedprofile.ts
    ├── profile.ts
    └── theme.ts

33 directories, 87 files

```

> ***We get the resume data by fetching the linkedin profile url from the session scopes during auth via*** `vanityUrl` ***by combining JWT logic, next-auth v5, and supabase.***

---

### **[SECRET SAUCE IS IN ROUTING]:**

1. `api/auth/[...nextauth]/route.ts` handlers link to the ***lib/auth.ts*** logic to run custom linkedin auth using next-auth v5 (`next-auth@beta`)

Something like:

```
import NextAuth from "next-auth"
import LinkedIn from "next-auth/providers/linkedin"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "r_liteprofile email",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          vanityUrl: profile.vanityName || null,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (profile) {
        token.vanityUrl = (profile as any).vanityName || null
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          vanityUrl: token.vanityUrl as string,
        },
      }
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id: string
      vanityUrl?: string
    } & {
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
```

1. auth file fetches vanityUrl using scopes in the ***lib/auth.ts*** auth logic through JWT tokens, building the full [https://www.linkedin.com/in/{vanityUrl}](https://www.linkedin.com/in/%7BvanityUrl%7D) to use for the next route's api call
2. api/enrich/route calls enrichlayer API via:

```import

export async function GET(req: NextRequest) {
  const apiKey = process.env.ENRICHLAYER_API_KEY
  const { searchParams } = new URL(req.url)

  const vanityName = searchParams.get("vanityName")
  const linkedinProfileUrl = searchParams.get("linkedinProfileUrl")

  const profileUrl =
    linkedinProfileUrl ??
    (vanityName ? `https://linkedin.com/in/${vanityName}/` : null)

  if (!apiKey || !profileUrl) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  const url = new URL("https://enrichlayer.com/api/v2/profile")
  url.searchParams.set("linkedin_profile_url", profileUrl)
  url.searchParams.set("extra", "include")
  url.searchParams.set("github_profile_id", "include")
  url.searchParams.set("facebook_profile_id", "include")
  url.searchParams.set("twitter_profile_id", "include")
  url.searchParams.set("personal_contact_number", "include")
  url.searchParams.set("personal_email", "include")
  url.searchParams.set("inferred_salary", "include")
  url.searchParams.set("skills", "include")
  url.searchParams.set("use_cache", "if-present")
  url.searchParams.set("fallback_to_cache", "on-error")

  const enrichRes = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  })

  const data = await enrichRes.json()
  return NextResponse.json(data, { status: enrichRes.status })
}

```

### Lastly, `middleware.ts` logic issues redirect after auth to the profile page using something like:

```
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth

  // Allow public paths
  const publicPaths = ["/", "/api/auth", "/auth/error", "/_next", "/favicon.ico"]
  const isPublicPath = publicPaths.some((path) => nextUrl.pathname.startsWith(path))

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Redirect unauthenticated users to sign-in
  if (!isAuthenticated) {
    const signInUrl = new URL("/", nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
```

### `api/profile/route`:

```
import { auth } from "@/lib/
import { createClient } from "@/lib/
import { NextResponse } from "next/server";

async function getUserAndClient() {
const session = await auth();
if (!session) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
const supabase = createClient();
return { session, supabase };
}

export async function GET() {
const { error, session, supabase } = await getUserAndClient() as any;
if (error) return error;

const { data, error: dbError } = await supabase
.from("profiles")
.select("*")
.eq("id", [session.user.id](http://session.user.id))
.single();

if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
return NextResponse.json(data);
}

export async function POST(req: Request) {
const { error, session, supabase } = await getUserAndClient() as any;
if (error) return error;

const body = await req.json();
const { error: dbError } = await supabase
.from("profiles")
.update(body)
.eq("id", [session.user.id](http://session.user.id));

if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
const { error, session, supabase } = await getUserAndClient() as any;
if (error) return error;

const body = await req.json();
const { error: dbError } = await supabase
.from("profiles")
.upsert({ id: [session.user.id](http://session.user.id), ...body }, { onConflict: "id" });

if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
return NextResponse.json({ success: true });
}
```

*The response is saved in supabase, where* `public_identifier` *is the primary key of the user's linkedin profile.* `lib/resume-service.ts` *This effectively sends the user to a profile snapshot card page where the* `enrichlayer` *processes the API call whilt they wait*

### The types are as follows to infer the resume layout and data cohesion
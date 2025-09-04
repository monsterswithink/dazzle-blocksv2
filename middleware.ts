import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth
  const isHomePage = nextUrl.pathname === "/"

  // If user is authenticated and on the home page, redirect to profile
  if (isAuthenticated && isHomePage) {
    return NextResponse.redirect(new URL("/profile", req.url))
  }

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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

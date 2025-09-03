import { type NextRequest, NextResponse } from "next/server"

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

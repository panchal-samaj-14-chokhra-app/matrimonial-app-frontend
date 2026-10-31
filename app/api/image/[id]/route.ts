import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"
import { NextRequest, NextResponse } from "next/server"

const STORAGE_URL = process.env.STORAGE_SERVICE_URL
const STORAGE_KEY = process.env.STORAGE_API_KEY

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Require a valid session — unauthenticated users cannot fetch profile images
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  if (!STORAGE_URL || !STORAGE_KEY) {
    console.error("[image-proxy] STORAGE_SERVICE_URL or STORAGE_API_KEY not set")
    return new NextResponse("Service unavailable", { status: 503 })
  }

  const { id } = params
  if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    return new NextResponse("Bad request", { status: 400 })
  }

  try {
    const upstream = await fetch(`${STORAGE_URL}/file/${id}`, {
      headers: { "X-Api-Key": STORAGE_KEY },
    })

    if (!upstream.ok) {
      return new NextResponse("Not found", { status: 404 })
    }

    const contentType = upstream.headers.get("Content-Type") || "image/jpeg"

    // Only proxy image types — refuse PDFs, videos, etc.
    if (!contentType.startsWith("image/")) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // inline display only — browser's Save Image saves via canvas scraping,
        // but no direct download link is served
        "Content-Disposition": "inline",
        // private cache — proxy result not stored in shared caches; browser may
        // cache for 1 hour so repeated views are fast
        "Cache-Control": "private, max-age=3600, immutable",
        "X-Content-Type-Options": "nosniff",
        // Disallow embedding in other sites
        "X-Frame-Options": "SAMEORIGIN",
      },
    })
  } catch (err) {
    console.error("[image-proxy] upstream fetch error:", err)
    return new NextResponse("Service unavailable", { status: 503 })
  }
}

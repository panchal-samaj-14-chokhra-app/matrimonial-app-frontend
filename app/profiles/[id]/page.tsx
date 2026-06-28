import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/authOptions"
import { fetchProfileServer } from "@/lib/server-profiles"
import ProfileDetailView from "./ProfileDetailView"

// Fetched on the server (RSC) — the backend is never called from the browser,
// so /metrimonial/get-profile no longer appears in the Network tab.
export const dynamic = "force-dynamic"

export default async function ProfileDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const profile = await fetchProfileServer(params.id)
  if (!profile?.data) redirect("/profiles")

  return <ProfileDetailView profile={profile} />
}

import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/authOptions"
import { fetchProfilesServer, checkProfileExistsServer } from "@/lib/server-profiles"
import ProfilesView from "./ProfilesView"

export const metadata: Metadata = {
  title: "प्रोफाइल्स - पंचाल समाज 14 चोखरा मैट्रिमोनियल",
  description: "सभी सक्रिय प्रोफाइल्स देखें",
}

// Render on every request (data + page come from the URL); nothing is fetched
// from the browser, so no backend call appears in the Network tab.
export const dynamic = "force-dynamic"

const PER_PAGE = 15

export default async function ProfilesPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const userId = (session.user as any)?.id
  if (userId) {
    const exists = await checkProfileExistsServer(userId)
    if (exists && exists.exists === false) redirect("/profile/create")
  }

  const page = Math.max(1, Number(searchParams.page) || 1)
  const filters = {
    name: searchParams.name || "",
    startAge: searchParams.startAge || "",
    endAge: searchParams.endAge || "",
    place: searchParams.place || "",
    maritalStatus: searchParams.maritalStatus || "",
    gender: searchParams.gender || "",
  }

  const { data, meta } = await fetchProfilesServer(page, PER_PAGE, filters)

  return (
    <ProfilesView
      apiProfiles={data}
      meta={meta}
      page={page}
      filters={filters}
      userEmail={session.user?.email || ""}
    />
  )
}

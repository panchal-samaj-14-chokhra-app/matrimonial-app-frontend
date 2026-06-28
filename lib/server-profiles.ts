// Server-only fetch helpers. These run on the Next.js server (RSC), so the
// backend is never called from the browser — nothing shows in the Network tab.
import "server-only"

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://31.97.237.171:10000"

export interface ProfileFilters {
  name?: string
  startAge?: string
  endAge?: string
  place?: string
  maritalStatus?: string
  gender?: string
}

export async function fetchProfilesServer(page: number, limit: number, filters: ProfileFilters) {
  const qs = new URLSearchParams({ page: String(page), limit: String(limit) })
  Object.entries(filters).forEach(([k, v]) => { if (v) qs.set(k, String(v)) })
  try {
    const res = await fetch(`${API}/metrimonial/profile-list/?${qs.toString()}`, { cache: "no-store" })
    if (!res.ok) return { data: [], meta: { totalCount: 0, totalPages: 1, currentPage: page } }
    const json = await res.json()
    return { data: Array.isArray(json?.data) ? json.data : [], meta: json?.meta || { totalCount: 0, totalPages: 1, currentPage: page } }
  } catch {
    return { data: [], meta: { totalCount: 0, totalPages: 1, currentPage: page } }
  }
}

export async function fetchProfileServer(id: string) {
  try {
    const res = await fetch(`${API}/metrimonial/get-profile/${id}`, { cache: "no-store" })
    if (!res.ok) return null
    return res.json() // { success, data }
  } catch {
    return null
  }
}

export async function checkProfileExistsServer(userId: string) {
  try {
    const res = await fetch(`${API}/metrimonial/exists/${userId}`, { cache: "no-store" })
    if (!res.ok) return { exists: true } // fail-open so we don't wrongly redirect
    return res.json()
  } catch {
    return { exists: true }
  }
}

"use client"

import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProfileListing } from "@/components/profile-listing"
import { ProfileFilters } from "@/components/profile-filters"
import { Loader2, User, Mail, Edit, LogOut, X, ChevronsLeft, ChevronsRight, Menu } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Filters = { name: string; startAge: string; endAge: string; place: string; maritalStatus: string; gender: string }

interface Props {
  apiProfiles: any[]
  meta: { totalCount?: number; totalPages?: number; currentPage?: number }
  page: number
  filters: Filters
  userEmail: string
}

function transformProfile(profile: any) {
  return {
    id: profile.id,
    showImages: profile.showImages,
    profileNumber: profile.profileNumber,
    name: `${profile.name || ""}`,
    age: profile.age,
    location: `${profile.district || ""}`,
    education: profile.education || "",
    profession: profile.occupation || "",
    image: profile.images?.[0]?.url || "/placeholder.svg?height=200&width=200",
    isVerified: profile.approvalStatus === "APPROVED",
    salary: `₹${profile.income || profile.annualFamilyIncome || 0} प्रति वर्ष`,
    height: profile.height ? `${Math.floor(profile.height / 12)}'${profile.height % 12}"` : "",
    lastActive: "2 दिन पहले",
  }
}

export default function ProfilesView({ apiProfiles, meta, page, filters, userEmail }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [clickOnCard, setClickOnCard] = useState(false)
  const [localFilters, setLocalFilters] = useState<Filters>(filters)
  const mounted = useRef(false)

  const totalPages = meta?.totalPages || 1

  // Build a /profiles URL from filters + page so state lives in the URL.
  const buildUrl = (f: Filters, p: number) => {
    const params = new URLSearchParams()
    if (p > 1) params.set("page", String(p))
    ;(Object.keys(f) as (keyof Filters)[]).forEach((k) => { if (f[k]) params.set(k, f[k]) })
    const qs = params.toString()
    return qs ? `/profiles?${qs}` : "/profiles"
  }
  const navigate = (f: Filters, p: number) => startTransition(() => router.push(buildUrl(f, p)))
  const goPage = (p: number) => navigate(localFilters, Math.min(Math.max(1, p), totalPages))

  // when filters change (user-driven), debounce → navigate (reset to page 1)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    const t = setTimeout(() => {
      if (JSON.stringify(localFilters) !== JSON.stringify(filters)) navigate(localFilters, 1)
    }, 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFilters])

  // keep local filters in sync if the URL changes externally (e.g. back button)
  useEffect(() => { setLocalFilters(filters) /* eslint-disable-next-line */ }, [JSON.stringify(filters)])

  const setFilters = (v: any) => setLocalFilters((prev) => (typeof v === "function" ? v(prev) : v))

  const profiles = useMemo(
    () => (apiProfiles || []).filter((p: any) => p.isProfileActive).map(transformProfile),
    [apiProfiles]
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 w-full">
              <div className="flex flex-row items-center gap-2 sm:gap-4">
                <Image src="/logo.png" alt="Panchal Samaj Logo" width={40} height={40} className="rounded-full" />
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">प्रोफाइल्स / Profiles</h1>
                </div>
              </div>
              <button
                className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setClickOnCard(true)} aria-label="Open profile sidebar"
              >
                <span className="sm:hidden"><Menu className="h-5 w-5 text-white" /></span>
                <span className="hidden sm:block"><User className="h-5 w-5 text-white" /></span>
              </button>
            </div>

            <div className="flex items-center justify-end">
              <div className={`fixed top-0 right-0 h-full w-72 sm:w-96 bg-white shadow-lg z-50 transition-transform duration-300 ${clickOnCard ? "translate-x-0" : "translate-x-full"}`} style={{ maxWidth: "100vw" }}>
                <Card className="border-none shadow-none h-full flex flex-col">
                  <CardContent className="p-4 relative flex-1 flex flex-col">
                    <button onClick={() => setClickOnCard(false)} className="absolute top-2 right-2 text-orange-500 hover:text-orange-700" aria-label="Close"><X className="w-5 h-5" /></button>
                    <div className="flex items-center gap-3 mb-4 mt-8">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-orange-800 text-sm">प्रोफाइल / Profile</p>
                        <p className="text-xs text-orange-600 truncate">{userEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-white/70 mb-4">
                      <Mail className="h-4 w-4 text-orange-600" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-orange-800">ईमेल / Email</p>
                        <p className="text-xs text-orange-600 truncate">{userEmail}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                      <Button size="sm" variant="outline" className="flex-1 text-xs border-orange-300 text-orange-700 hover:bg-orange-100" onClick={() => { router.push("/profile/edit"); setClickOnCard(false) }}>
                        <Edit className="h-3 w-3 mr-1" />संपादित करें / Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs border-red-300 text-red-700 hover:bg-red-50" onClick={() => signOut({ callbackUrl: "/login" })}>
                        <LogOut className="h-3 w-3 mr-1" />साइन आउट / Log Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {clickOnCard && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setClickOnCard(false)} aria-label="Close sidebar overlay" />}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfileFilters filters={localFilters} setFilters={setFilters} />
        {isPending && (
          <div className="flex items-center justify-center gap-2 text-orange-600 text-sm mb-3"><Loader2 className="h-4 w-4 animate-spin" />लोड हो रहा है...</div>
        )}
        {profiles?.length > 0 ? (
          <>
            <ProfileListing profiles={profiles} setFilters={setFilters} filters={localFilters} />

            {/* Pagination (URL-driven) */}
            <div className="flex justify-center items-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink href="#" isActive={false} onClick={(e) => { e.preventDefault(); goPage(page - 10) }} className={page <= 10 ? "pointer-events-none opacity-50" : ""}>
                      <span className="flex items-center"><ChevronsLeft className="w-5 h-5" /></span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (page > 1) goPage(page - 1) }} aria-disabled={page <= 1} className={page <= 1 ? "pointer-events-none opacity-50" : ""} />
                  </PaginationItem>
                  {[1, 2].map((n) => (n <= totalPages ? (
                    <PaginationItem key={n}><PaginationLink href="#" isActive={page === n} onClick={(e) => { e.preventDefault(); goPage(n) }}>{n}</PaginationLink></PaginationItem>
                  ) : null))}
                  {totalPages > 3 && page > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                  {page > 2 && page < totalPages && (
                    <PaginationItem key={page}><PaginationLink href="#" isActive onClick={(e) => { e.preventDefault(); goPage(page) }}>{page}</PaginationLink></PaginationItem>
                  )}
                  {totalPages > 3 && page < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                  {totalPages > 2 && (
                    <PaginationItem key={totalPages}><PaginationLink href="#" isActive={page === totalPages} onClick={(e) => { e.preventDefault(); goPage(totalPages) }}>{totalPages}</PaginationLink></PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (page < totalPages) goPage(page + 1) }} aria-disabled={page >= totalPages} className={page >= totalPages ? "pointer-events-none opacity-50" : ""} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive={false} onClick={(e) => { e.preventDefault(); goPage(page + 10) }} className={page > totalPages - 10 ? "pointer-events-none opacity-50" : ""}>
                      <span className="flex items-center"><ChevronsRight className="w-5 h-5" /></span>
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">कोई प्रोफाइल उपलब्ध नहीं / No profiles available</p>
          </div>
        )}
      </div>
    </div>
  )
}

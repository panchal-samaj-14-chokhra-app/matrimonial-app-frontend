"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useEffect, useMemo, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProfileListing } from "@/components/profile-listing"
import { Loader2, User, Mail, Edit, LogOut, X } from "lucide-react"
import { useAllMatrimonialProfiles, useCheckUserExists } from "@/hooks/use-query-mutations"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfilesClient() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [clickOnCard, setClickOnCard] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const profilesPerPage = 15

  function transformProfile(profile) {
    return {
      id: profile.id,
      showImages: profile.showImages,
      profileNumber: profile.profileNumber,
      name: `${profile.name || ''}`,
      age: profile.age,
      location: `${profile.district || ''}`,
      education: profile.education || '',
      profession: profile.occupation || '',
      image: profile.images?.[0]?.url || '/placeholder.svg?height=200&width=200',
      isVerified: profile.approvalStatus === 'APPROVED',
      salary: `₹${profile.income || profile.annualFamilyIncome || 0} प्रति वर्ष`,
      height: profile.height ? `${Math.floor(profile.height / 12)}'${profile.height % 12}"` : '',
      lastActive: '2 दिन पहले',
    }
  }

  const {
    data: apiProfiles,
    isLoading,
    isError,
    error,
    refetch,
  } = useAllMatrimonialProfiles({ page: currentPage, limit: profilesPerPage })

  const profiles = useMemo(() => {
    // Use new API shape: { data: [...], meta: { ... } }
    let arr: any[] = [];
    if (Array.isArray(apiProfiles?.data)) {
      arr = apiProfiles.data;
    }
    return arr
      .filter((profile: { isProfileActive: any }) => profile.isProfileActive)
      .map(transformProfile)
  }, [apiProfiles?.data, session?.user && (session.user as any).id])

  const totalPages = useMemo(() => {
    // Support both legacy and new API shapes
    const meta = (apiProfiles as any)?.meta;
    if (meta?.totalPages) return meta.totalPages;
    if (apiProfiles?.totalCount) return Math.ceil(apiProfiles.totalCount / profilesPerPage);
    return 1;
  }, [(apiProfiles as any)?.meta?.totalPages, apiProfiles?.totalCount, profilesPerPage])

  const {
    data: userExistsData,
    isLoading: isCheckingUser,
    error: userCheckError,
  } = useCheckUserExists((session?.user as any)?.id)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if ((session?.user as any)?.id && userExistsData && !userExistsData.exists) {
      router.push("/profile/create")
    }
  }, [(session?.user as any)?.id, userExistsData, router])

  if (status === "loading" || isCheckingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">लोड हो रहा है... / Loading...</p>
        </div>
      </div>
    )
  }

  if (!session || (userExistsData && !userExistsData.exists)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Panchal Samaj Logo" width={60} height={60} className="rounded-full" />
              <div>
                <h1 className="text-3xl font-bold text-orange-600">प्रोफाइल्स / Profiles</h1>
                <p className="text-gray-600 mt-1">सभी सक्रिय मैट्रिमोनियल प्रोफाइल्स / All Active Matrimonial Profiles</p>
              </div>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative inline-block text-left">
              <div
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setClickOnCard((prev) => !prev)}
              >
                <User className="h-5 w-5 text-white" />
              </div>

              {clickOnCard && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 z-50 max-w-[110vw]">
                  <Card className="border border-orange-200 shadow-sm rounded-md">
                    <CardContent className="p-4 relative">
                      <button
                        onClick={() => setClickOnCard(false)}
                        className="absolute top-2 right-2 text-orange-500 hover:text-orange-700"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-orange-800 text-sm">प्रोफाइल / Profile</p>
                          <p className="text-xs text-orange-600 truncate">{session?.user?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 rounded bg-white/70 mb-4">
                        <Mail className="h-4 w-4 text-orange-600" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-orange-800">ईमेल / Email</p>
                          <p className="text-xs text-orange-600 truncate">{session?.user?.email}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs border-orange-300 text-orange-700 hover:bg-orange-100"
                          onClick={() => {
                            router.push("/profile/edit")
                            setClickOnCard(false)
                          }}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          संपादित करें / Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs border-red-300 text-red-700 hover:bg-red-50"
                          onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                          <LogOut className="h-3 w-3 mr-1" />
                          साइन आउट / Log Out
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {profiles?.length > 0 ? (
          <>
            <ProfileListing profiles={profiles} />

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      aria-disabled={currentPage <= 1}
                      className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {/* Show first two pages always */}
                  {[1, 2].map(pageNum => (
                    pageNum <= totalPages ? (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === pageNum}
                          onClick={e => {
                            e.preventDefault();
                            setCurrentPage(pageNum);
                          }}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    ) : null
                  ))}

                  {/* Show ellipsis if needed after first two pages */}
                  {totalPages > 3 && currentPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Show current page if it's not 1, 2, or last */}
                  {currentPage > 2 && currentPage < totalPages && (
                    <PaginationItem key={currentPage}>
                      <PaginationLink
                        href="#"
                        isActive={true}
                        onClick={e => {
                          e.preventDefault();
                          setCurrentPage(currentPage);
                        }}
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Show ellipsis if needed before last page */}
                  {totalPages > 3 && currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Show last page if more than 2 pages */}
                  {totalPages > 2 && (
                    <PaginationItem key={totalPages}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === totalPages}
                        onClick={e => {
                          e.preventDefault();
                          setCurrentPage(totalPages);
                        }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      aria-disabled={currentPage >= totalPages}
                      className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            {isLoading ? (<div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600 mx-auto mb-4" />
              <p className="text-orange-600">लोड हो रहा है...</p>
            </div>) : (
              <p className="text-gray-600 text-xl">कोई प्रोफाइल उपलब्ध नहीं / No profiles available</p>

            )}
          </div>
        )}
      </div>
    </div>
  )
}

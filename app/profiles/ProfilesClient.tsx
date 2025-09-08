"use client"

import { useEffect, useMemo, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProfileListing } from "@/components/profile-listing"
import { Loader2, User, Mail, Edit, LogOut, X } from "lucide-react"
import { useAllMatrimonialProfiles, useCheckUserExists } from "@/hooks/use-query-mutations"
import { Card, CardContent } from "@/components/ui/card"

// Sample profile dataxx


export default function ProfilesClient() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [clickOnCard, setClickOnCard] = useState(false);
  function transformProfile(profile) {
    return {
      id: profile.id,
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
    };
  }


  const {
    data: apiProfiles,
    isLoading,
    isError,
    error,
    refetch,
  } = useAllMatrimonialProfiles();

  const profiles = useMemo(() => {
    if (!apiProfiles?.data) return [];

    return apiProfiles.data

      .map(transformProfile); // ✅ then transform each
  }, [apiProfiles?.data, session?.user.id]);

  const {
    data: userExistsData,
    isLoading: isCheckingUser,
  } = useCheckUserExists(session?.user?.id, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id && userExistsData && !userExistsData.exists) {
      router.push("/profile/create")
    }
  }, [session?.user?.id, userExistsData, router])

  // Show loading state while checking authentication or user existence
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

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null
  }

  if (userExistsData && !userExistsData.exists) {
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


            <div className="relative inline-block text-left">
              {/* User Icon Button */}
              <div
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setClickOnCard((prev) => !prev)}
              >
                <User className="h-5 w-5 text-white" />
              </div>

              {/* Dropdown Card */}
              {clickOnCard && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 z-50 max-w-[110vw]">
                  <Card className="border border-orange-200  shadow-sm rounded-md">
                    <CardContent className="p-4 relative">
                      {/* Close (X) Button */}
                      <button
                        onClick={() => setClickOnCard(false)}
                        className="absolute top-2 right-2 text-orange-500 hover:text-orange-700"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* User Info Header */}
                      <div className="flex items-center gap-3 mb-4">

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-orange-800 text-sm">प्रोफाइल / Profile</p>
                          <p className="text-xs text-orange-600 truncate">{session?.user?.email}</p>
                        </div>
                      </div>

                      {/* Email Section */}
                      <div className="flex items-center gap-2 p-2 rounded bg-white/70 mb-4">
                        <Mail className="h-4 w-4 text-orange-600" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-orange-800">ईमेल / Email</p>
                          <p className="text-xs text-orange-600 truncate">{session?.user?.email}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs border-orange-300 text-orange-700 hover:bg-orange-100"
                          onClick={() => {
                            router.push("/profile/edit");
                            setClickOnCard(false);
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
                          साइन आउट / log Out
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {profiles?.length > 0 ? (
          <ProfileListing profiles={profiles} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">कोई प्रोफाइल उपलब्ध नहीं / No profiles available</p>
          </div>
        )}
      </div>
    </div>
  )
}

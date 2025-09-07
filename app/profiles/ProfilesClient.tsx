"use client"

import { useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProfileListing } from "@/components/profile-listing"
import { Loader2, User, Mail, Edit, LogOut } from "lucide-react"
import { useCheckUserExists } from "@/hooks/use-query-mutations"
import { Card, CardContent } from "@/components/ui/card"

// Sample profile data
const profiles = [
  {
    id: "PS25101",
    name: "राज पंचाल",
    age: 28,
    location: "अहमदाबाद, गुजरात",
    education: "इंजीनियर",
    profession: "सॉफ्टवेयर डेवलपर",
    image: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    salary: "₹8-10 लाख प्रति वर्ष",
    height: "5'8\"",
    lastActive: "2 दिन पहले",
  },
  {
    id: "PS25102",
    name: "प्रिया पंचाल",
    age: 25,
    location: "सूरत, गुजरात",
    education: "एमबीए",
    profession: "मार्केटिंग मैनेजर",
    image: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    salary: "₹6-8 लाख प्रति वर्ष",
    height: "5'4\"",
    lastActive: "1 दिन पहले",
  },
  {
    id: "PS25103",
    name: "अमित पंचाल",
    age: 30,
    location: "राजकोट, गुजरात",
    education: "डॉक्टर",
    profession: "चिकित्सक",
    image: "/placeholder.svg?height=200&width=200",
    isVerified: false,
    salary: "₹12-15 लाख प्रति वर्ष",
    height: "5'10\"",
    lastActive: "5 दिन पहले",
  },
  {
    id: "PS25104",
    name: "सुनीता पंचाल",
    age: 26,
    location: "वडोदरा, गुजरात",
    education: "बी.कॉम",
    profession: "अकाउंटेंट",
    image: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    salary: "₹4-6 लाख प्रति वर्ष",
    height: "5'3\"",
    lastActive: "आज",
  },
  {
    id: "PS25105",
    name: "विकास पंचाल",
    age: 32,
    location: "गांधीनगर, गुजरात",
    education: "एमटेक",
    profession: "प्रोजेक्ट मैनेजर",
    image: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    salary: "₹15-20 लाख प्रति वर्ष",
    height: "5'9\"",
    lastActive: "3 दिन पहले",
  },
  {
    id: "PS25106",
    name: "मीरा पंचाल",
    age: 24,
    location: "अहमदाबाद, गुजरात",
    education: "बीएड",
    profession: "शिक्षिका",
    image: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    salary: "₹3-5 लाख प्रति वर्ष",
    height: "5'2\"",
    lastActive: "1 सप्ताह पहले",
  },
]

export default function ProfilesClient() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const {
    data: userExistsData,
    isLoading: isCheckingUser,
    error: userCheckError,
  } = useCheckUserExists(session?.user?.id)

  console.log("[v0] ProfilesClient - profiles data:", profiles)
  console.log("[v0] ProfilesClient - profiles length:", profiles.length)
  console.log("[v0] ProfilesClient - session:", session)
  console.log("[v0] ProfilesClient - userExistsData:", userExistsData)

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

            <Card className="w-full lg:w-80 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-800">प्रोफाइल / Profile</p>
                    <p className="text-xs text-orange-600">{session?.user?.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded bg-white/50">
                    <Mail className="h-4 w-4 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-orange-800">ईमेल / Email</p>
                      <p className="text-xs text-orange-600">{session?.user?.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                      onClick={() => router.push("/profile/edit")}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      संपादित करें / Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      <LogOut className="h-3 w-3 mr-1" />
                      साइन आउट / Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {profiles.length > 0 ? (
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

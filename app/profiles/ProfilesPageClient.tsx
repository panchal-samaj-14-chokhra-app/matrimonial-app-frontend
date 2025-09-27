"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProfileListing } from "@/components/profile-listing"
import { Loader2 } from "lucide-react"

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

export default function ProfilesPageClient() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-orange-600">प्रोफाइल्स</h1>
              {/* <p className="text-gray-600 mt-1">सभी सक्रिय मैट्रिमोनियल प्रोफाइल्स</p> */}
            </div>
          
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfileListing profiles={profiles} />
      </div>
    </div>
  )
}

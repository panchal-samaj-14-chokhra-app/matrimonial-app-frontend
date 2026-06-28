'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Phone, Mail } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import React, { useState, useEffect } from "react"

type ImageCarouselProps = {
  images?: { url: string }[]
  name?: string
  showImages: boolean
  isVerified?: boolean
}

function formatDate(dateString?: string) {
  if (!dateString) return ""
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('en-GB')
}

export default function ProfileDetailView({ profile }: { profile: any }) {
  const addressInfo = {
    "पूरा पता / Full Address": profile?.data?.address ?? "",
    "जिला / District": profile?.data?.district ?? "",
    "राज्य / State": profile?.data?.state ?? "",
  }
  const personalInfo = {
    "पूरा नाम / Full Name": profile?.data?.name ?? "",
    "उपनाम / Pet Name": profile?.data?.petName ?? "",
    "लास्ट नेम / Last Name": profile?.data?.lastName ?? "",
    "लिंग / Gender": profile?.data?.gender ?? "",
    "आयु / Age": profile?.data?.age ?? "",
    "जन्म तिथि / Date of Birth": formatDate(profile?.data?.dateOfBirth),
    "जन्म स्थान / Place of Birth": profile?.data?.placeOfBirth ?? "",
    "जिला / District": profile?.data?.district ?? "",
    "ऊंचाई (cm) / Height (cm)": profile?.data?.height ?? "",
    "वजन (kg) / Weight (kg)": profile?.data?.weight ?? "",
    "रंग / Complexion": profile?.data?.skinComplexion ?? profile?.data?.complexion ?? "",
    "मातृभाषा / Mother Tongue": profile?.data?.motherTongue ?? "",
    "धर्म / Religion": profile?.data?.religion ?? "",
    "मंगलिक / Manglik": profile?.data?.manglik ? "हाँ / Yes" : "नहीं / No",
    "शारीरिक रूप से सक्षम / Physically Able": profile?.data?.isPhysicallyAble ? "हाँ / Yes" : "नहीं / No",
    "शौक / Hobbies": profile?.data?.hobbies ?? "",
    "सोशल लिंक / Social Links": profile?.data?.socialLinks ?? "",
  }
  const familyInfo = {
    "पिता का नाम / Father's Name": profile?.data?.fatherName ?? "",
    "माता का नाम / Mother's Name": profile?.data?.motherName ?? "",
    "दादाजी का नाम / Grandfather's Name": profile?.data?.grandfatherName ?? "",
    "गोत्र / Gotra": profile?.data?.gotra ?? "",
    "पारिवारिक व्यवसाय / Family Occupation": profile?.data?.familyOccupation ?? "",
    "वार्षिक पारिवारिक आय / Annual Family Income": profile?.data?.annualFamilyIncome ?? "",
    "प्रोफाइल बनाई / Profile Created": formatDate(profile?.data?.createdAt),
    "अंतिम सक्रिय / Last Active": formatDate(profile?.data?.updatedAt),
  }
  const educationCareer = {
    "शिक्षा / Education": profile?.data?.education ?? "",
    "पेशा / Occupation": profile?.data?.occupation ?? "",
    "आय / Income": profile?.data?.income ?? "",
    "संस्था / Organization": profile?.data?.employerOrganizationName ?? "",
  }
  const preferences = {
    "न्यूनतम आयु / Min Age": profile?.data?.agePreferenceMin ?? "",
    "अधिकतम आयु / Max Age": profile?.data?.agePreferenceMax ?? "",
    "जाति प्राथमिकता / Caste Preference": profile?.data?.castePreference ?? "",
    "स्थान प्राथमिकता / Location Preference": profile?.data?.locationPreference ?? "",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <PageHeader
            title={personalInfo["पूरा नाम / Full Name"]}
            description={`प्रोफाइल ID: ${profile?.data?.profileNumber ?? ""}`}
            showBack={true}
            showBreadcrumb={true}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <ImageCarousel showImages={profile?.data?.showImages} images={profile?.data?.images} name={personalInfo["पूरा नाम / Full Name"]} isVerified={profile?.data?.isVerified} />
                <div className="p-4">
                  <div className="flex gap-2 mb-4">
                    <Button disabled={true} className="flex-1 bg-orange-600 hover:bg-orange-700">
                      <Heart className="h-4 w-4 mr-2" />रुचि दिखाएं
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>अंतिम सक्रिय:</strong> {formatDate(profile?.data?.updatedAt)}</p>
                    <p><strong>प्रोफाइल बनाई:</strong> {formatDate(profile?.data?.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg text-orange-600">संपर्क जानकारी</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{!profile?.data?.showContactInformation ? "***********" : profile?.data?.mobileNumber ?? ""}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{!profile?.data?.showContactInformation ? "***********" : profile?.data?.email ?? ""}</span>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">WhatsApp पर संपर्क करें</Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-xl text-orange-600">पता / Address</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(addressInfo).map(([label, value]) => (
                    <div key={label} className="mb-2"><strong>{label}:</strong>     {!profile?.data?.showAddressDetails ? "***" : value}</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xl text-orange-600">मेरे बारे में / About Me</CardTitle></CardHeader>
              <CardContent>
                <div className="text-base text-gray-700 whitespace-pre-line min-h-[48px]">
                  {profile?.data?.aboutMe || <span className="text-gray-400">कोई विवरण नहीं / No description</span>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xl text-orange-600">व्यक्तिगत जानकारी / Personal Information</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(personalInfo).map(([label, value]) => (
                    <div key={label} className="mb-2"><strong>{label}:</strong> {value}</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xl text-orange-600">पारिवारिक जानकारी / Family Information</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(familyInfo).map(([label, value]) => (
                    <div key={label} className="mb-2"><strong>{label}:</strong> {value}</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xl text-orange-600">शिक्षा और करियर / Education & Career</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(educationCareer).map(([label, value]) => (
                    <div key={label} className="mb-2"><strong>{label}:</strong> {value}</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xl text-orange-600">जीवनसाथी की प्राथमिकताएं / Partner Preferences</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(preferences).map(([label, value]) => (
                    <div key={label} className="mb-2"><strong>{label}:</strong> {value}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, name, isVerified, showImages }) => {
  const imgs = images && images.length > 0 ? images : [{ url: "/placeholder.svg" }]
  const [current, setCurrent] = useState(0)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => { setCurrent((prev) => (prev + 1) % imgs.length) }, 3000)
    return () => clearInterval(interval)
  }, [imgs.length])

  return (
    <>
      <div className="relative flex items-center justify-center h-80 bg-gray-50">
        <Image
          src={(showImages ? imgs[current].url : "/placeholder.svg") || "/placeholder.svg"}
          alt={name || `Profile Image ${current + 1}`}
          width={400} height={500}
          className="w-full h-80 object-cover rounded-t-lg transition-all duration-700 cursor-pointer select-none"
          onClick={() => setShowModal(true)} onContextMenu={e => e.preventDefault()} draggable={false}
        />
        {isVerified && <div className="absolute top-4 right-4"><Badge className="bg-green-500 hover:bg-green-600">सत्यापित</Badge></div>}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {imgs.map((_, idx) => (
            <span key={idx} className={`block w-3 h-3 rounded-full ${idx === current ? "bg-orange-600" : "bg-gray-300"}`} />
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setShowModal(false)}>
          <div className="relative max-w-3xl w-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-white text-3xl font-bold z-10 bg-black bg-opacity-40 rounded-full px-2 hover:bg-opacity-70" onClick={() => setShowModal(false)} aria-label="Close preview">&times;</button>
            <div className="relative w-full flex items-center justify-center">
              <Image src={imgs[current].url || "/placeholder.svg"} alt={name || `Profile Image ${current + 1}`} width={800} height={1000} className="object-contain max-h-[90vh] w-auto mx-auto rounded-lg shadow-lg select-none pointer-events-none" onContextMenu={e => e.preventDefault()} draggable={false} />
              <div className="absolute inset-0 bg-transparent select-none" style={{ pointerEvents: 'auto', userSelect: 'none' }} onContextMenu={e => e.preventDefault()}>
                <div className="w-full h-full flex items-center justify-center pointer-events-none">
                  <span className="text-white text-lg bg-black bg-opacity-30 px-4 py-2 rounded-lg select-none" style={{ userSelect: 'none' }}>Image protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

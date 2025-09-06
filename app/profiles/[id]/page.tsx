import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Phone, Mail, MapPin, Calendar, GraduationCap, Briefcase } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "प्रोफाइल विवरण - पंचाल समाज 14 चोखरा मैट्रिमोनियल",
  description: "प्रोफाइल की पूरी जानकारी देखें",
}

// Sample detailed profile data
const profileData = {
  id: "PS25101",
  name: "राज पंचाल",
  age: 28,
  gender: "पुरुष",
  location: "अहमदाबाद, गुजरात",
  education: "बी.टेक कंप्यूटर साइंस",
  profession: "सॉफ्टवेयर डेवलपर",
  company: "टेक कंपनी प्राइवेट लिमिटेड",
  salary: "₹8-10 लाख प्रति वर्ष",
  height: "5'8\"",
  weight: "70 किग्रा",
  complexion: "गोरा",
  maritalStatus: "अविवाहित",
  religion: "हिंदू",
  caste: "पंचाल",
  subCaste: "14 चोखरा",
  motherTongue: "गुजराती",
  languages: ["गुजराती", "हिंदी", "अंग्रेजी"],
  hobbies: ["पढ़ना", "यात्रा", "खेल"],
  aboutMe:
    "मैं एक सॉफ्टवेयर डेवलपर हूं जो अहमदाबाद में काम करता हूं। मुझे नई तकनीकों को सीखना और यात्रा करना पसंद है। मैं एक समझदार और देखभाल करने वाले जीवनसाथी की तलाश में हूं।",
  familyDetails: {
    fatherName: "श्री रमेश पंचाल",
    fatherOccupation: "व्यापारी",
    motherName: "श्रीमती सुनीता पंचाल",
    motherOccupation: "गृहिणी",
    siblings: "1 बहन (विवाहित)",
    familyType: "संयुक्त परिवार",
    familyValues: "पारंपरिक",
  },
  partnerPreferences: {
    ageRange: "23-30 वर्ष",
    heightRange: "5'2\" - 5'6\"",
    education: "स्नातक या उससे अधिक",
    profession: "कोई भी",
    location: "गुजरात प्राथमिकता",
  },
  contactInfo: {
    phone: "+91 98765 43210",
    email: "raj.panchal@email.com",
    whatsapp: "+91 98765 43210",
  },
  images: [
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
  ],
  isVerified: true,
  lastActive: "2 दिन पहले",
  profileCreated: "15 जनवरी 2025",
}

export default function ProfileDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <PageHeader
            title={profileData.name}
            description={`प्रोफाइल ID: ${profileData.id}`}
            showBack={true}
            backHref="/profiles"
            showBreadcrumb={true}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Basic Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={profileData.images[0] || "/placeholder.svg"}
                    alt={profileData.name}
                    width={400}
                    height={500}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    {profileData.isVerified && <Badge className="bg-green-500 hover:bg-green-600">सत्यापित</Badge>}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 mb-4">
                    <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                      <Heart className="h-4 w-4 mr-2" />
                      रुचि दिखाएं
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>अंतिम सक्रिय:</strong> {profileData.lastActive}
                    </p>
                    <p>
                      <strong>प्रोफाइल बनाई:</strong> {profileData.profileCreated}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">संपर्क जानकारी</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{profileData.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{profileData.contactInfo.email}</span>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">WhatsApp पर संपर्क करें</Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600">व्यक्तिगत जानकारी</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        <strong>आयु:</strong> {profileData.age} वर्ष
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>
                        <strong>स्थान:</strong> {profileData.location}
                      </span>
                    </div>
                    <div>
                      <strong>ऊंचाई:</strong> {profileData.height}
                    </div>
                    <div>
                      <strong>वजन:</strong> {profileData.weight}
                    </div>
                    <div>
                      <strong>रंग:</strong> {profileData.complexion}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <strong>वैवाहिक स्थिति:</strong> {profileData.maritalStatus}
                    </div>
                    <div>
                      <strong>धर्म:</strong> {profileData.religion}
                    </div>
                    <div>
                      <strong>जाति:</strong> {profileData.caste}
                    </div>
                    <div>
                      <strong>उप-जाति:</strong> {profileData.subCaste}
                    </div>
                    <div>
                      <strong>मातृभाषा:</strong> {profileData.motherTongue}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education & Career */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600">शिक्षा और करियर</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span>
                      <strong>शिक्षा:</strong> {profileData.education}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span>
                      <strong>पेशा:</strong> {profileData.profession}
                    </span>
                  </div>
                  <div>
                    <strong>कंपनी:</strong> {profileData.company}
                  </div>
                  <div>
                    <strong>वेतन:</strong> {profileData.salary}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Me */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600">मेरे बारे में</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{profileData.aboutMe}</p>
                <Separator className="my-4" />
                <div>
                  <strong className="text-gray-900">शौक:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.hobbies.map((hobby, index) => (
                      <Badge key={index} variant="secondary">
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <strong className="text-gray-900">भाषाएं:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600">पारिवारिक जानकारी</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <strong>पिता:</strong> {profileData.familyDetails.fatherName}
                    </div>
                    <div>
                      <strong>पिता का पेशा:</strong> {profileData.familyDetails.fatherOccupation}
                    </div>
                    <div>
                      <strong>माता:</strong> {profileData.familyDetails.motherName}
                    </div>
                    <div>
                      <strong>माता का पेशा:</strong> {profileData.familyDetails.motherOccupation}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <strong>भाई-बहन:</strong> {profileData.familyDetails.siblings}
                    </div>
                    <div>
                      <strong>परिवार का प्रकार:</strong> {profileData.familyDetails.familyType}
                    </div>
                    <div>
                      <strong>पारिवारिक मूल्य:</strong> {profileData.familyDetails.familyValues}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Partner Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600">जीवनसाथी की प्राथमिकताएं</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <strong>आयु सीमा:</strong> {profileData.partnerPreferences.ageRange}
                    </div>
                    <div>
                      <strong>ऊंचाई सीमा:</strong> {profileData.partnerPreferences.heightRange}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <strong>शिक्षा:</strong> {profileData.partnerPreferences.education}
                    </div>
                    <div>
                      <strong>पेशा:</strong> {profileData.partnerPreferences.profession}
                    </div>
                    <div>
                      <strong>स्थान:</strong> {profileData.partnerPreferences.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

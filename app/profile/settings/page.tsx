import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, EyeOff, Heart, Trash2, Shield, Settings, User, Phone, Mail, AlertTriangle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "प्रोफाइल सेटिंग्स - पंचाल समाज 14 चोखरा मैट्रिमोनियल",
  description: "अपनी प्रोफाइल की सेटिंग्स को प्रबंधित करें",
}

// Sample user profile data
const userProfile = {
  id: "PS25101",
  name: "राज पंचाल",
  email: "raj.panchal@email.com",
  phone: "+91 98765 43210",
  image: "/placeholder.svg?height=200&width=200",
  isVerified: true,
  isMarried: false,
  isHidden: false,
  contactPrivate: false,
  profileViews: 245,
  interests: 12,
  lastActive: "2 दिन पहले",
}

export default function ProfileSettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <PageHeader
            title="प्रोफाइल सेटिंग्स"
            description="अपनी प्रोफाइल को प्रबंधित करें"
            showBack={true}
            backHref="/profiles"
            showBreadcrumb={true}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Overview */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Image
                    src={userProfile.image || "/placeholder.svg"}
                    alt={userProfile.name}
                    width={120}
                    height={120}
                    className="w-30 h-30 object-cover rounded-full mx-auto"
                  />
                  {userProfile.isVerified && (
                    <Badge className="absolute -top-1 -right-1 bg-green-500 hover:bg-green-600">✓</Badge>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{userProfile.name}</h3>
                <p className="text-gray-600">प्रोफाइल ID: {userProfile.id}</p>
                <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
                  <div className="text-center">
                    <div className="font-semibold text-orange-600">{userProfile.profileViews}</div>
                    <div>व्यू</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-pink-600">{userProfile.interests}</div>
                    <div>रुचि</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">अंतिम सक्रिय: {userProfile.lastActive}</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">त्वरित कार्य</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/profile/edit">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    प्रोफाइल संपादित करें
                  </Button>
                </Link>
                <Link href={`/profiles/${userProfile.id}`}>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    प्रोफाइल देखें
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  गोपनीयता सेटिंग्स
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  गोपनीयता सेटिंग्स
                </CardTitle>
                <CardDescription>अपनी जानकारी की गोपनीयता को नियंत्रित करें</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">संपर्क विवरण निजी रखें</Label>
                    <p className="text-sm text-gray-600">आपका फोन नंबर और ईमेल छुपाएं</p>
                  </div>
                  <Switch defaultChecked={userProfile.contactPrivate} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">प्रोफाइल छुपाएं</Label>
                    <p className="text-sm text-gray-600">आपकी प्रोफाइल खोज में दिखाई नहीं देगी</p>
                  </div>
                  <Switch defaultChecked={userProfile.isHidden} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">केवल सत्यापित सदस्यों को दिखाएं</Label>
                    <p className="text-sm text-gray-600">केवल सत्यापित प्रोफाइल्स आपको देख सकेंगी</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">फोटो सुरक्षा</Label>
                    <p className="text-sm text-gray-600">फोटो डाउनलोड करने से रोकें</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Profile Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  प्रोफाइल स्थिति
                </CardTitle>
                <CardDescription>अपनी प्रोफाइल की स्थिति को अपडेट करें</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-green-800">सक्रिय प्रोफाइल</p>
                      <p className="text-sm text-green-600">आपकी प्रोफाइल खोज में दिखाई दे रही है</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    विवाहित के रूप में चिह्नित करें
                  </Button>
                  <p className="text-xs text-gray-600 ml-6">यह आपकी प्रोफाइल को archive कर देगा और खोज से हटा देगा</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                  >
                    <EyeOff className="h-4 w-4 mr-2" />
                    अस्थायी रूप से छुपाएं
                  </Button>
                  <p className="text-xs text-gray-600 ml-6">प्रोफाइल को अस्थायी रूप से निष्क्रिय करें</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  संपर्क जानकारी
                </CardTitle>
                <CardDescription>अपनी संपर्क जानकारी को अपडेट करें</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{userProfile.email}</p>
                      <p className="text-sm text-gray-600">ईमेल पता</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    बदलें
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{userProfile.phone}</p>
                      <p className="text-sm text-gray-600">मोबाइल नंबर</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    बदलें
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-xl text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  खाता प्रबंधन
                </CardTitle>
                <CardDescription>खतरनाक कार्य - सावधानी से उपयोग करें</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">प्रोफाइल स्थायी रूप से हटाएं</h4>
                  <p className="text-sm text-red-600 mb-4">
                    यह कार्य अपरिवर्तनीय है। आपकी सभी जानकारी स्थायी रूप से हट जाएगी।
                  </p>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    प्रोफाइल हटाएं
                  </Button>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">खाता निष्क्रिय करें</h4>
                  <p className="text-sm text-yellow-600 mb-4">
                    अपने खाते को अस्थायी रूप से निष्क्रिय करें। बाद में पुनः सक्रिय कर सकते हैं।
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-100 bg-transparent"
                  >
                    खाता निष्क्रिय करें
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-600 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  सूचना सेटिंग्स
                </CardTitle>
                <CardDescription>अपनी सूचना प्राथमिकताएं सेट करें</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">नई रुचि की सूचना</Label>
                    <p className="text-sm text-gray-600">जब कोई आपमें रुचि दिखाए</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">संदेश की सूचना</Label>
                    <p className="text-sm text-gray-600">नए संदेशों के लिए सूचना</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">प्रोफाइल व्यू की सूचना</Label>
                    <p className="text-sm text-gray-600">जब कोई आपकी प्रोफाइल देखे</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">साप्ताहिक सारांश</Label>
                    <p className="text-sm text-gray-600">साप्ताहिक गतिविधि रिपोर्ट</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Save, X } from "lucide-react"

export const metadata: Metadata = {
  title: "प्रोफाइल संपादित करें - पंचाल समाज 14 चोखरा मैट्रिमोनियल",
  description: "अपनी प्रोफाइल की जानकारी को अपडेट करें",
}

// Sample user data for editing
const userData = {
  id: "PS25101",
  firstName: "राज",
  lastName: "पंचाल",
  age: 28,
  height: "5-8",
  weight: "70",
  complexion: "fair",
  maritalStatus: "single",
  city: "अहमदाबाद",
  state: "gujarat",
  education: "बी.टेक कंप्यूटर साइंस",
  profession: "सॉफ्टवेयर डेवलपर",
  company: "टेक कंपनी प्राइवेट लिमिटेड",
  salary: "8-12",
  aboutMe: "मैं एक सॉफ्टवेयर डेवलपर हूं जो अहमदाबाद में काम करता हूं। मुझे नई तकनीकों को सीखना और यात्रा करना पसंद है।",
  hobbies: "पढ़ना, यात्रा, खेल",
  images: [
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
  ],
}

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/profile/settings">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  वापस
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-orange-600">प्रोफाइल संपादित करें</h1>
                <p className="text-gray-600">अपनी जानकारी को अपडेट करें</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-transparent">
                रद्द करें
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Save className="h-4 w-4 mr-2" />
                सेव करें
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form className="space-y-8">
          {/* Photo Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-orange-600">फोटो प्रबंधन</CardTitle>
              <CardDescription>अपनी तस्वीरों को अपडेट करें (अधिकतम 5 फोटो)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {userData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`फोटो ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-lg border-2 border-orange-200"
                    />
                    <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full">
                      <X className="h-3 w-3" />
                    </Button>
                    {index === 0 && (
                      <div className="absolute bottom-1 left-1 bg-orange-600 text-white text-xs px-2 py-1 rounded">
                        मुख्य
                      </div>
                    )}
                  </div>
                ))}
                <div className="aspect-square border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center hover:border-orange-400 cursor-pointer">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <p className="text-sm text-orange-600">फोटो जोड़ें</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-orange-600">व्यक्तिगत जानकारी</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">नाम *</Label>
                  <Input id="firstName" defaultValue={userData.firstName} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">उपनाम *</Label>
                  <Input id="lastName" defaultValue={userData.lastName} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">आयु *</Label>
                  <Input id="age" type="number" defaultValue={userData.age} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">ऊंचाई *</Label>
                  <Select defaultValue={userData.height}>
                    <SelectTrigger>
                      <SelectValue placeholder="ऊंचाई चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-0">5'0"</SelectItem>
                      <SelectItem value="5-1">5'1"</SelectItem>
                      <SelectItem value="5-2">5'2"</SelectItem>
                      <SelectItem value="5-3">5'3"</SelectItem>
                      <SelectItem value="5-4">5'4"</SelectItem>
                      <SelectItem value="5-5">5'5"</SelectItem>
                      <SelectItem value="5-6">5'6"</SelectItem>
                      <SelectItem value="5-7">5'7"</SelectItem>
                      <SelectItem value="5-8">5'8"</SelectItem>
                      <SelectItem value="5-9">5'9"</SelectItem>
                      <SelectItem value="5-10">5'10"</SelectItem>
                      <SelectItem value="5-11">5'11"</SelectItem>
                      <SelectItem value="6-0">6'0"</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">वजन</Label>
                  <Input id="weight" placeholder="किग्रा में" defaultValue={userData.weight} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complexion">रंग</Label>
                  <Select defaultValue={userData.complexion}>
                    <SelectTrigger>
                      <SelectValue placeholder="रंग चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fair">गोरा</SelectItem>
                      <SelectItem value="wheatish">गेहुंआ</SelectItem>
                      <SelectItem value="dark">सांवला</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">वैवाहिक स्थिति *</Label>
                  <Select defaultValue={userData.maritalStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="स्थिति चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">अविवाहित</SelectItem>
                      <SelectItem value="divorced">तलाकशुदा</SelectItem>
                      <SelectItem value="widowed">विधवा/विधुर</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-orange-600">स्थान की जानकारी</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">शहर *</Label>
                  <Input id="city" defaultValue={userData.city} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">राज्य *</Label>
                  <Select defaultValue={userData.state}>
                    <SelectTrigger>
                      <SelectValue placeholder="राज्य चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gujarat">गुजरात</SelectItem>
                      <SelectItem value="maharashtra">महाराष्ट्र</SelectItem>
                      <SelectItem value="rajasthan">राजस्थान</SelectItem>
                      <SelectItem value="madhya-pradesh">मध्य प्रदेश</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education & Career */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-orange-600">शिक्षा और करियर</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="education">शिक्षा *</Label>
                  <Input id="education" defaultValue={userData.education} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">पेशा *</Label>
                  <Input id="profession" defaultValue={userData.profession} required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">कंपनी/संस्था</Label>
                  <Input id="company" defaultValue={userData.company} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">वार्षिक आय</Label>
                  <Select defaultValue={userData.salary}>
                    <SelectTrigger>
                      <SelectValue placeholder="आय सीमा चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-5">₹2-5 लाख</SelectItem>
                      <SelectItem value="5-8">₹5-8 लाख</SelectItem>
                      <SelectItem value="8-12">₹8-12 लाख</SelectItem>
                      <SelectItem value="12-20">₹12-20 लाख</SelectItem>
                      <SelectItem value="20+">₹20+ लाख</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Me */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-orange-600">मेरे बारे में</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aboutMe">अपने बारे में लिखें *</Label>
                <Textarea id="aboutMe" defaultValue={userData.aboutMe} rows={4} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hobbies">शौक</Label>
                <Input id="hobbies" defaultValue={userData.hobbies} placeholder="आपके शौक (कॉमा से अलग करें)" />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" className="bg-transparent">
              रद्द करें
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              <Save className="h-4 w-4 mr-2" />
              परिवर्तन सेव करें
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

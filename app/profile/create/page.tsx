"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, User, Settings, LogOut, X } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { useMatrimonialProfile } from "@/hooks/use-query-mutations"
import { useSession, signOut } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

export default function CreateProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { createProfile } = useMatrimonialProfile()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    aboutMe: "",
    height: 0,
    weight: 0,
    caste: "",
    subCaste: "",
    motherTongue: "",
    manglik: false,
    agePreferenceMin: 18,
    agePreferenceMax: 35,
    castePreference: "",
    locationPreference: "",
    age: 0,
    annualFamilyIncome: 0,
    dateOfBirth: "",
    district: "",
    gender: "MALE" as "MALE" | "FEMALE",
    gotra: "",
    grandfatherName: "",
    hobbies: "",
    isPhysicallyAble: true,
    motherName: "",
    fatherName: "",
    placeOfBirth: "",
    profileImageUrl: "",
    skinComplexion: "",
    socialLinks: "",
    timeOfBirth: "",
    // Additional fields for form completeness
    complexion: "",
    maritalStatus: "Single",
    occupation: "",
    income: 0,
    education: "",
    religion: "Hindu",
    familyOccupation: "",
    wantsToJoinEvent: false,
  })

  const [uploadedImages, setUploadedImages] = useState<File[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-orange-600">लोड हो रहा है...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast({
          title: "फाइल साइज़ बड़ी है",
          description: `${file.name} 5MB से बड़ी है। कृपया छोटी फाइल चुनें।`,
          variant: "destructive",
        })
        return false
      }
      return true
    })

    // Limit to 3 images total
    const remainingSlots = 3 - uploadedImages.length
    const filesToAdd = validFiles.slice(0, remainingSlots)

    if (validFiles.length > remainingSlots) {
      toast({
        title: "अधिकतम 3 फोटो",
        description: "आप केवल 3 फोटो अपलोड कर सकते हैं।",
        variant: "destructive",
      })
    }

    setUploadedImages((prev) => [...prev, ...filesToAdd])
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user?.id) {
      toast({
        title: "त्रुटि",
        description: "कृपया पहले लॉगिन करें।",
        variant: "destructive",
      })
      return
    }

    const profileData = {
      ...formData,
      userId: session.user.id,
      createdByUserId: session.user.id,
      updatedByUserId: session.user.id,
      isProfileActive: true,
      // Map complexion to skinComplexion if not set
      skinComplexion: formData.skinComplexion || formData.complexion,
      // Set income from occupation income if not set separately
      income: formData.income || 0,
    }

    createProfile.mutate(
      { data: profileData, images: uploadedImages },
      {
        onSuccess: () => {
          toast({
            title: "सफलता",
            description: "आपकी प्रोफाइल सफलतापूर्वक बनाई गई है।",
          })
          router.push("/profiles")
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || error?.message || ""

          if (errorMessage.includes("Profile already exists")) {
            toast({
              title: "प्रोफाइल पहले से मौजूद है",
              description: "आपकी प्रोफाइल पहले से बनी हुई है। आपको प्रोफाइल पेज पर भेजा जा रहा है।",
              variant: "destructive",
            })
            // Redirect to profiles page after a short delay
            setTimeout(() => {
              router.push("/profiles")
            }, 2000)
          } else {
            toast({
              title: "त्रुटि",
              description: "प्रोफाइल बनाने में समस्या हुई। कृपया पुनः प्रयास करें।",
              variant: "destructive",
            })
          }
        },
      },
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <PageHeader
            title="नई प्रोफाइल बनाएं"
            description="अपनी मैट्रिमोनियल प्रोफाइल की जानकारी भरें"
            showBack={true}
            backHref="/profiles"
            showBreadcrumb={true}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form - Left Side */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">फोटो अपलोड करें</CardTitle>
                  <CardDescription>अपनी स्पष्ट तस्वीरें अपलोड करें (अधिकतम 3 फोटो, प्रत्येक 5MB तक)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Display uploaded images */}
                    {uploadedImages.map((file, index) => (
                      <div
                        key={index}
                        className="relative aspect-square border-2 border-orange-300 rounded-lg overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    {/* Upload slots */}
                    {uploadedImages.length < 3 && (
                      <label className="aspect-square border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center hover:border-orange-400 cursor-pointer">
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                          <p className="text-sm text-orange-600">फोटो अपलोड करें</p>
                          <p className="text-xs text-gray-500">अधिकतम 5MB</p>
                        </div>
                      </label>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">व्यक्तिगत जानकारी</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">आयु / Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="आपकी आयु"
                        value={formData.age || ""}
                        onChange={(e) => handleInputChange("age", Number.parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">जन्म तिथि / Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeOfBirth">जन्म समय / Time of Birth</Label>
                      <Input
                        id="timeOfBirth"
                        type="time"
                        value={formData.timeOfBirth}
                        onChange={(e) => handleInputChange("timeOfBirth", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="placeOfBirth">जन्म स्थान / Place of Birth *</Label>
                      <Input
                        id="placeOfBirth"
                        placeholder="जन्म स्थान"
                        value={formData.placeOfBirth}
                        onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">जिला / District *</Label>
                      <Input
                        id="district"
                        placeholder="आपका जिला"
                        value={formData.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">ऊंचाई / Height (cm) *</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="सेंटीमीटर में"
                        value={formData.height || ""}
                        onChange={(e) => handleInputChange("height", Number.parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">वजन / Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="किग्रा में"
                        value={formData.weight || ""}
                        onChange={(e) => handleInputChange("weight", Number.parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skinComplexion">रंग / Complexion *</Label>
                      <Select
                        value={formData.skinComplexion}
                        onValueChange={(value) => handleInputChange("skinComplexion", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="रंग चुनें" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fair">गोरा</SelectItem>
                          <SelectItem value="Wheatish">गेहुंआ</SelectItem>
                          <SelectItem value="Dark">सांवला</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">लिंग / Gender *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="लिंग चुनें" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">पुरुष</SelectItem>
                          <SelectItem value="FEMALE">महिला</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherTongue">मातृभाषा / Mother Tongue *</Label>
                      <Input
                        id="motherTongue"
                        placeholder="आपकी मातृभाषा"
                        value={formData.motherTongue}
                        onChange={(e) => handleInputChange("motherTongue", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPhysicallyAble"
                      checked={formData.isPhysicallyAble}
                      onCheckedChange={(checked) => handleInputChange("isPhysicallyAble", checked)}
                    />
                    <Label htmlFor="isPhysicallyAble">मैं शारीरिक रूप से स्वस्थ हूं / I am physically healthy</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">पारिवारिक जानकारी</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherName">पिता का नाम / Father's Name *</Label>
                      <Input
                        id="fatherName"
                        placeholder="पिता का नाम"
                        value={formData.fatherName}
                        onChange={(e) => handleInputChange("fatherName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherName">माता का नाम / Mother's Name *</Label>
                      <Input
                        id="motherName"
                        placeholder="माता का नाम"
                        value={formData.motherName}
                        onChange={(e) => handleInputChange("motherName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grandfatherName">दादाजी का नाम / Grandfather's Name</Label>
                    <Input
                      id="grandfatherName"
                      placeholder="दादाजी का नाम"
                      value={formData.grandfatherName}
                      onChange={(e) => handleInputChange("grandfatherName", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="caste">जाति / Caste *</Label>
                      <Input
                        id="caste"
                        placeholder="आपकी जाति"
                        value={formData.caste}
                        onChange={(e) => handleInputChange("caste", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subCaste">उप-जाति / Sub-Caste</Label>
                      <Input
                        id="subCaste"
                        placeholder="उप-जाति"
                        value={formData.subCaste}
                        onChange={(e) => handleInputChange("subCaste", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gotra">गोत्र / Gotra</Label>
                      <Input
                        id="gotra"
                        placeholder="आपका गोत्र"
                        value={formData.gotra}
                        onChange={(e) => handleInputChange("gotra", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="annualFamilyIncome">पारिवारिक वार्षिक आय / Annual Family Income</Label>
                      <Input
                        id="annualFamilyIncome"
                        type="number"
                        placeholder="पारिवारिक वार्षिक आय"
                        value={formData.annualFamilyIncome || ""}
                        onChange={(e) => handleInputChange("annualFamilyIncome", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="familyOccupation">पारिवारिक व्यवसाय / Family Occupation</Label>
                    <Input
                      id="familyOccupation"
                      placeholder="पारिवारिक व्यवसाय"
                      value={formData.familyOccupation}
                      onChange={(e) => handleInputChange("familyOccupation", e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="manglik"
                      checked={formData.manglik}
                      onCheckedChange={(checked) => handleInputChange("manglik", checked)}
                    />
                    <Label htmlFor="manglik">मंगलिक हैं / Manglik</Label>
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
                      <Label htmlFor="education">शिक्षा / Education *</Label>
                      <Input
                        id="education"
                        placeholder="आपकी शिक्षा"
                        value={formData.education}
                        onChange={(e) => handleInputChange("education", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">पेशा / Occupation *</Label>
                      <Input
                        id="occupation"
                        placeholder="आपका पेशा"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange("occupation", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="income">वार्षिक आय / Annual Income</Label>
                      <Input
                        id="income"
                        type="number"
                        placeholder="वार्षिक आय"
                        value={formData.income || ""}
                        onChange={(e) => handleInputChange("income", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maritalStatus">वैवाहिक स्थिति / Marital Status *</Label>
                      <Select
                        value={formData.maritalStatus}
                        onValueChange={(value) => handleInputChange("maritalStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="वैवाहिक स्थिति चुनें" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">अविवाहित</SelectItem>
                          <SelectItem value="Divorced">तलाकशुदा</SelectItem>
                          <SelectItem value="Widowed">विधवा/विधुर</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">जीवनसाथी की प्राथमिकताएं</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agePreferenceMin">न्यूनतम आयु / Minimum Age</Label>
                      <Input
                        id="agePreferenceMin"
                        type="number"
                        placeholder="न्यूनतम आयु"
                        value={formData.agePreferenceMin || ""}
                        onChange={(e) => handleInputChange("agePreferenceMin", Number.parseInt(e.target.value) || 18)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agePreferenceMax">अधिकतम आयु / Maximum Age</Label>
                      <Input
                        id="agePreferenceMax"
                        type="number"
                        placeholder="अधिकतम आयु"
                        value={formData.agePreferenceMax || ""}
                        onChange={(e) => handleInputChange("agePreferenceMax", Number.parseInt(e.target.value) || 35)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="castePreference">जाति प्राथमिकता / Caste Preference</Label>
                      <Input
                        id="castePreference"
                        placeholder="पसंदीदा जाति"
                        value={formData.castePreference}
                        onChange={(e) => handleInputChange("castePreference", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="locationPreference">स्थान प्राथमिकता / Location Preference</Label>
                      <Input
                        id="locationPreference"
                        placeholder="पसंदीदा स्थान"
                        value={formData.locationPreference}
                        onChange={(e) => handleInputChange("locationPreference", e.target.value)}
                      />
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
                    <Label htmlFor="aboutMe">अपने बारे में लिखें / About Me *</Label>
                    <Textarea
                      id="aboutMe"
                      placeholder="अपने बारे में, अपनी रुचियों और जीवनसाथी की अपेक्षाओं के बारे में लिखें..."
                      rows={4}
                      value={formData.aboutMe}
                      onChange={(e) => handleInputChange("aboutMe", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hobbies">शौक / Hobbies</Label>
                    <Input
                      id="hobbies"
                      placeholder="आपके शौक (कॉमा से अलग करें)"
                      value={formData.hobbies}
                      onChange={(e) => handleInputChange("hobbies", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialLinks">सोशल मीडिया लिंक / Social Media Links</Label>
                    <Input
                      id="socialLinks"
                      placeholder="फेसबुक, इंस्टाग्राम आदि के लिंक"
                      value={formData.socialLinks}
                      onChange={(e) => handleInputChange("socialLinks", e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wantsToJoinEvent"
                      checked={formData.wantsToJoinEvent}
                      onCheckedChange={(checked) => handleInputChange("wantsToJoinEvent", checked)}
                    />
                    <Label htmlFor="wantsToJoinEvent">
                      मैं मैट्रिमोनियल इवेंट्स में भाग लेना चाहता/चाहती हूं / I want to participate in matrimonial events
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={createProfile.isPending}>
                  {createProfile.isPending ? "प्रोफाइल बनाई जा रही है..." : "प्रोफाइल बनाएं"}
                </Button>
              </div>
            </form>
          </div>

          {/* Profile Section - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* User Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-orange-600">आपकी प्रोफाइल</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{session?.user?.name || "उपयोगकर्ता"}</h3>
                      <p className="text-sm text-gray-600">{session?.user?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => router.push("/profile/settings")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      प्रोफाइल संपादित करें
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      लॉग आउट
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-orange-600">त्वरित जानकारी</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">सदस्यता प्रकार:</span>
                    <span className="text-sm font-medium">
                      {session?.user?.memberType === "14-chokhra" ? "14 चोखरा" : "अन्य"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">प्रोफाइल स्थिति:</span>
                    <span className="text-sm font-medium text-orange-600">नई</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

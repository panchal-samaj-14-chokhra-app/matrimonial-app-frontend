import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus } from "lucide-react"

export const metadata: Metadata = {
  title: "साइन अप - पंचाल समाज 14 चोखरा मैट्रिमोनियल",
  description: "नया खाता बनाएं",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="पंचाल समाज लोगो" width={100} height={100} className="rounded-full mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-orange-600 mb-2">साइन अप करें</h1>
          <p className="text-gray-600">अपना खाता बनाने के लिए उपयुक्त विकल्प चुनें</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 14 Chokhra Members */}
          <Card className="border-2 border-orange-200 hover:border-orange-400 transition-colors">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <CardTitle className="text-xl text-orange-600">पंचाल समाज 14 चोखरा सदस्य</CardTitle>
              <CardDescription>यदि आप पंचाल समाज 14 चोखरा के सदस्य हैं</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">पंजीकरण प्रक्रिया:</h4>
                <ol className="text-sm text-orange-700 space-y-1">
                  <li>1. पारिवारिक आईडी दर्ज करें</li>
                  <li>2. परिवारजनों की सूची से नाम चुनें</li>
                  <li>3. ईमेल और मोबाइल नंबर दें</li>
                  <li>4. पासवर्ड बनाएं</li>
                  <li>5. भुगतान करें</li>
                </ol>
              </div>
            </CardContent>
            <CardContent>
              <Link href="/signup/14-chokhra">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">14 चोखरा सदस्य के रूप में साइन अप करें</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Other Members */}
          <Card className="border-2 border-gray-200 hover:border-gray-400 transition-colors">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <UserPlus className="h-8 w-8 text-gray-600" />
                </div>
              </div>
              <CardTitle className="text-xl text-gray-600">अन्य सदस्य</CardTitle>
              <CardDescription>यदि आप 14 चोखरा के सदस्य नहीं हैं</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">पंजीकरण प्रक्रिया:</h4>
                <ol className="text-sm text-gray-700 space-y-1">
                  <li>1. नाम, गांव, शहर, राज्य दर्ज करें</li>
                  <li>2. ईमेल और मोबाइल नंबर दें</li>
                  <li>3. पासवर्ड बनाएं</li>
                  <li>4. एडमिन अप्रूवल की प्रतीक्षा करें</li>
                  <li>5. भुगतान करें</li>
                </ol>
              </div>
            </CardContent>
            <CardContent>
              <Link href="/signup/other">
                <Button className="w-full bg-gray-600 hover:bg-gray-700">अन्य सदस्य के रूप में साइन अप करें</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            पहले से खाता है?{" "}
            <Link href="/login" className="text-orange-600 hover:text-orange-700 hover:underline">
              लॉगिन करें
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

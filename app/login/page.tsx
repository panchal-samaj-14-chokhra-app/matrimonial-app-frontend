"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError(res.error || "लॉगिन में त्रुटि हुई")
      setIsLoading(false)
    } else {
      router.push("/profiles")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="p-4">
        <BackButton href="/" label="होम पर वापस जाएं" />
      </div>

      <div className="flex items-center justify-center p-4 pt-0">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image src="/logo.png" alt="पंचाल समाज लोगो" width={80} height={80} className="rounded-full" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-600">लॉगिन करें</CardTitle>
            <CardDescription>अपने खाते में प्रवेश करने के लिए अपनी जानकारी दर्ज करें</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">{error}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">ईमेल या मोबाइल नंबर</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="आपका ईमेल या मोबाइल नंबर"
                  className="border-orange-200 focus:border-orange-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">पासवर्ड</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="आपका पासवर्ड"
                  className="border-orange-200 focus:border-orange-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  पासवर्ड भूल गए?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                {isLoading ? "लॉगिन हो रहा है..." : "लॉगिन करें"}
              </Button>
              <div className="text-center text-sm text-gray-600">
                खाता नहीं है?{" "}
                <Link href="/signup" className="text-orange-600 hover:text-orange-700 hover:underline">
                  साइन अप करें
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

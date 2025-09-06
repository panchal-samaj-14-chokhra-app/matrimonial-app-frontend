import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { FloatingNav } from "@/components/floating-nav"
import { QueryProvider } from "@/components/providers/query-provider"
import { NextAuthProvider } from "@/components/providers/session-provider"

export const metadata: Metadata = {
  title: "पंचाल समाज मैट्रिमोनियल | Panchal Samaj Matrimonial",
  description: "पंचाल समाज के लिए विवाह संबंधी सेवाएं और कार्यक्रम",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi" className={`${GeistSans.className} ${GeistMono.variable}`}>
      <body>
        <NextAuthProvider>
          <QueryProvider>
            {children}
            <FloatingNav />
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}

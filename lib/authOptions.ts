import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

// Shared NextAuth config so it can be used both by the route handler and by
// getServerSession() in server components.
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null
          const baseUrl = process.env.NEXT_PUBLIC_API_URL
          if (!baseUrl) {
            console.error("[auth] NEXT_PUBLIC_API_URL not set")
            return null
          }
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000)
          const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            signal: controller.signal,
          })
          clearTimeout(timeoutId)
          if (!response.ok) return null
          const contentType = response.headers.get("content-type")
          if (!contentType || !contentType.includes("application/json")) return null
          const data = await response.json()
          if (data && data.userId && data.token) {
            return {
              id: data.userId,
              email: data.email,
              name: data.email,
              token: data.token,
              role: data.role,
              choklaId: data.choklaId,
              villageId: data.villageId,
            } as any
          }
          return null
        } catch (error) {
          console.error("[auth] authorize error:", error)
          return null
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token
        token.role = (user as any).role
        token.choklaId = (user as any).choklaId
        token.villageId = (user as any).villageId
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        ;(session as any).accessToken = token.accessToken as string
        ;(session.user as any).role = token.role as string
        ;(session.user as any).choklaId = token.choklaId as string | null
        ;(session.user as any).villageId = token.villageId as string | null
      }
      return session
    },
  },
  pages: { signIn: "/login" },
}

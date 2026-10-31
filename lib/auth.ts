import { cookies } from "next/headers"

export interface User {
  userId: string
  email: string
  role: string
  choklaId: string
  villageId: string | null
  token: string
}

export interface LoginResponse {
  token: string
  userId: string
  role: string
  email: string
  choklaId: string
  villageId: string | null
}

export async function loginUser(email: string, password: string): Promise<{ user: User } | { error: string }> {
  try {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      console.error("[auth] API_URL is not set");
      return { error: "सर्वर कॉन्फ़िगरेशन त्रुटि" };
    }

    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      return { error: `लॉगिन में त्रुटि: ${response.status}` }
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return { error: "सर्वर से गलत प्रतिक्रिया मिली" }
    }

    const data: LoginResponse = await response.json()

    const user: User = {
      userId: data.userId,
      email: data.email,
      role: data.role,
      choklaId: data.choklaId,
      villageId: data.villageId,
      token: data.token,
    }

    return { user }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { error: "नेटवर्क त्रुटि या सर्वर उपलब्ध नहीं है" }
  }
}

export async function setAuthCookie(user: User) {
  const cookieStore = cookies()
  cookieStore.set("auth-token", user.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  cookieStore.set(
    "user-data",
    JSON.stringify({
      userId: user.userId,
      email: user.email,
      role: user.role,
      choklaId: user.choklaId,
      villageId: user.villageId,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  )
}

export async function getAuthUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value
    const userData = cookieStore.get("user-data")?.value

    if (!token || !userData) {
      return null
    }

    const user = JSON.parse(userData)
    return { ...user, token }
  } catch (error) {
    console.error("[v0] Error getting auth user:", error)
    return null
  }
}

export async function clearAuthCookies() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
  cookieStore.delete("user-data")
}

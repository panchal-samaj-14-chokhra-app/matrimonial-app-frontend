import axios, { type AxiosError, type AxiosResponse } from "axios"
import { toast } from "sonner"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() }

    console.log("[v0] API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    })

    return config
  },
  (error) => {
    console.error("[v0] Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Calculate request duration
    const duration = new Date().getTime() - response.config.metadata?.startTime?.getTime()

    console.log("[v0] API Response:", {
      status: response.status,
      url: response.config.url,
      duration: `${duration}ms`,
      data: response.data,
    })

    return response
  },
  (error: AxiosError) => {
    console.error("[v0] Response Error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    })

    // Handle different error scenarios
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
      toast.error("सत्र समाप्त हो गया है। कृपया फिर से लॉगिन करें।")
      window.location.href = "/login"
    } else if (error.response?.status === 403) {
      toast.error("आपको इस कार्य की अनुमति नहीं है।")
    } else if (error.response?.status === 404) {
      toast.error("अनुरोधित जानकारी नहीं मिली।")
    } else if (error.response?.status >= 500) {
      toast.error("सर्वर में त्रुटि हुई है। कृपया बाद में पुनः प्रयास करें।")
    } else if (error.code === "ECONNABORTED") {
      toast.error("अनुरोध का समय समाप्त हो गया। कृपया पुनः प्रयास करें।")
    } else {
      toast.error("कुछ गलत हुआ है। कृपया पुनः प्रयास करें।")
    }

    return Promise.reject(error)
  },
)

export default api

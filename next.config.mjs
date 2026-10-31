/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Proxy all /api/proxy/* calls to the backend server-side.
  // The browser never sees the real API URL — only /api/proxy/... appears in the Network tab.
  async rewrites() {
    const apiUrl = process.env.API_URL
    if (!apiUrl) {
      console.warn("[next.config] API_URL is not set — /api/proxy/* rewrites will not work")
      return []
    }
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig

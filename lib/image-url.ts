/**
 * Converts a raw storage-service URL to the internal image proxy path.
 * The proxy fetches the image server-side so the storage host never appears
 * in the browser's Network tab.
 *
 * Accepts:
 *   http://storage-host/file/<id>   → /api/image/<id>
 *   /placeholder.svg (or any /...)  → returned as-is
 *   anything else                   → returned as-is (graceful fallback)
 */
export function toProxyUrl(url: string | null | undefined): string {
  if (!url) return "/placeholder.svg"
  if (url.startsWith("/")) return url

  const match = url.match(/\/file\/([a-zA-Z0-9_-]+)/)
  if (match) return `/api/image/${match[1]}`

  return url
}

import Image from "next/image"

// Helper to convert Google Drive open links to direct image links
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, MapPin, Calendar, GraduationCap, Briefcase, Eye } from "lucide-react"
import { ProfileIdBadge } from "./profile-id-badge"

interface ProfileCardProps {
  profile: {
    showImages: boolean;
    profileNumber: number;
    id: string
    name: string
    age: number
    location: string
    education: string
    profession: string
    image: string
    isVerified: boolean
    salary?: string
    height?: string
    lastActive?: string
  }
  variant?: "default" | "compact" | "detailed"
  showActions?: boolean
}

const getDirectImageUrl = (url) => {
  let fileId = null;

  const regexFileId = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const matchFileId = url.match(regexFileId);
  if (matchFileId && matchFileId[1]) {
    fileId = matchFileId[1];
  }

  const regexOpenId = /open\?id=([a-zA-Z0-9_-]+)/;
  if (!fileId) {
    const matchOpenId = url.match(regexOpenId);
    if (matchOpenId && matchOpenId[1]) {
      fileId = matchOpenId[1];
    }
  }

  const regexUcId = /uc\?id=([a-zA-Z0-9_-]+)/;
  if (!fileId) {
    const matchUcId = url.match(regexUcId);
    if (matchUcId && matchUcId[1]) {
      fileId = matchUcId[1];
    }
  }

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  }

  return url;
};

export function ProfileCard({ profile, variant = "default", showActions = true }: ProfileCardProps) {
  if (variant === "compact") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-shrink-0">
              <Image
                src={getDirectImageUrl(profile.image || "/placeholder.svg")}
                alt={profile.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-lg"
              />
              {profile.isVerified && (
                <Badge className="absolute -top-1 -right-1 bg-green-500 hover:bg-green-600 text-xs px-1">✓</Badge>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 truncate">{profile.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{profile.age} वर्ष</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{profile.location}</span>
                  </div>
                </div>
                <ProfileIdBadge profileId={profile.id} size="sm" />
              </div>
              {showActions && (
                <div className="flex gap-2 mt-3">
                  <Link href={`/profiles/${profile.id}`}>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      देखें
                    </Button>
                  </Link>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-xs">
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "detailed") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <Image
            src={getDirectImageUrl((profile.showImages ? profile.image : "/placeholder.svg") || "/placeholder.svg")}
            alt={profile.name}
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-3 right-3">
            {profile.isVerified && <Badge className="bg-green-500 hover:bg-green-600">सत्यापित</Badge>}
          </div>
          <div className="absolute top-3 left-3">
            <ProfileIdBadge profileId={profile.id} variant="secondary" className="bg-white/90" />
          </div>
          {profile.lastActive && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-black/70 text-white text-xs">{profile.lastActive}</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <Calendar className="h-4 w-4" />
                <span>{profile.age} वर्ष</span>
                {profile.height && (
                  <>
                    <span>•</span>
                    <span>{profile.height}</span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profile.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="h-4 w-4" />
                <span className="text-sm">{profile.education}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">{profile.profession}</span>
              </div>

              {profile.salary && (
                <div className="text-sm text-gray-600">
                  <strong>वेतन:</strong> {profile.salary}
                </div>
              )}
            </div>

            {showActions && (
              <div className="flex gap-2 pt-2">
                <Link href={`/profiles/${profile.id}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    विवरण देखें
                  </Button>
                </Link>
                <Button className="bg-pink-500 hover:bg-pink-600">
                  <Heart className="h-4 w-4 mr-2" />
                  पसंद
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default variant — full image fitted inside padding (no crop); card grows to fit
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col">
        {/* Photo: whole image shown inside padding, natural aspect ratio */}
        <Link href={`/profiles/${profile.id}`} className="block p-2">
          <div
            className="relative select-none"
            onContextMenu={(e) => e.preventDefault()}
            style={{ WebkitTouchCallout: "none" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getDirectImageUrl((profile.showImages ? profile.image : "/placeholder.svg") || "/placeholder.svg")}
              alt={profile.name}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-auto rounded-md bg-gray-50 object-contain select-none pointer-events-none"
            />
            {/* transparent overlay so right-click / long-press can't target the image */}
            <div className="absolute inset-0 z-[5]" aria-hidden="true" />
            <div className="absolute top-1.5 left-1.5 z-10">
              <ProfileIdBadge profileId={profile?.profileNumber?.toString()?.padStart(6, '0')} variant="secondary" size="sm" className="bg-white/90 text-[10px]" />
            </div>
            {profile.isVerified && (
              <Badge className="absolute top-1.5 right-1.5 z-10 bg-green-500 hover:bg-green-600 text-[10px] px-1.5 py-0">✓</Badge>
            )}
          </div>
        </Link>

        {/* Details */}
        <CardContent className="min-w-0 px-2.5 pb-2.5 pt-0 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{profile.name}</h3>

          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 min-w-0">
            <Calendar className="h-3 w-3 shrink-0" />
            <span className="shrink-0">{profile.age} वर्ष</span>
            {profile.location && (
              <>
                <span>•</span>
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{profile.location}</span>
              </>
            )}
          </div>

          {profile.education && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 min-w-0">
              <GraduationCap className="h-3 w-3 shrink-0" />
              <span className="truncate">{profile.education}</span>
            </div>
          )}

          {profile.profession && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 min-w-0">
              <Briefcase className="h-3 w-3 shrink-0" />
              <span className="truncate">{profile.profession}</span>
            </div>
          )}

          {showActions && (
            <div className="flex gap-1.5 mt-2">
              <Link href={`/profiles/${profile.id}`} className="flex-1 min-w-0">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-transparent border-orange-200 text-orange-700 hover:bg-orange-50">
                  विवरण देखें
                </Button>
              </Link>
              <Button disabled={true} size="icon" className="h-8 w-8 shrink-0 bg-pink-500 hover:bg-pink-600">
                <Heart className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
}

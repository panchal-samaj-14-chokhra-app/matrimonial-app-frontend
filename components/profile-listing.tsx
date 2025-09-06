"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProfileCard } from "./profile-card"
import { ProfileFilters } from "./profile-filters"
import { Grid, List, LayoutGrid } from "lucide-react"

interface Profile {
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

interface ProfileListingProps {
  profiles: Profile[]
  title?: string
  showFilters?: boolean
}

export function ProfileListing({ profiles, title = "प्रोफाइल्स", showFilters = true }: ProfileListingProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid")
  const [sortBy, setSortBy] = useState("recent")

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilters && <ProfileFilters totalProfiles={profiles.length} activeFilters={["25-30 वर्ष", "अहमदाबाद"]} />}

      {/* View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-orange-600">{title}</h2>
          <p className="text-gray-600">{profiles.length} प्रोफाइल्स मिलीं</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Options */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="क्रमबद्ध करें" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">नवीनतम</SelectItem>
              <SelectItem value="age-low">आयु (कम से अधिक)</SelectItem>
              <SelectItem value="age-high">आयु (अधिक से कम)</SelectItem>
              <SelectItem value="name">नाम के अनुसार</SelectItem>
              <SelectItem value="location">स्थान के अनुसार</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "compact" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("compact")}
              className={viewMode === "compact" ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profiles Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : viewMode === "list"
              ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
              : "grid grid-cols-1 gap-3"
        }
      >
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            variant={viewMode === "grid" ? "default" : viewMode === "list" ? "detailed" : "compact"}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" className="px-8 bg-transparent">
          और प्रोफाइल्स लोड करें
        </Button>
      </div>
    </div>
  )
}

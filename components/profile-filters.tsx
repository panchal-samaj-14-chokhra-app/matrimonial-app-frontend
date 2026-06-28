"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"

interface ProfileFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  totalProfiles?: number;
  activeFilters?: string[];
}

export function ProfileFilters({ filters = { name: "" }, setFilters }: ProfileFiltersProps) {
  return (
    <Card className="mb-4 shadow-sm border border-orange-100">
      <CardContent className="p-2.5 sm:p-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="नाम से खोजें..."
              className="pl-8 h-9 text-sm"
              value={filters.name}
              onChange={e => setFilters({ ...filters, name: e.target.value })}
            />
          </div>

          {/* Filters row */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
            <Select
              value={filters.startAge && filters.endAge ? `${filters.startAge}-${filters.endAge}` : ''}
              onValueChange={val => {
                const [start, end] = val.split('-');
                setFilters({ ...filters, startAge: start, endAge: end });
              }}
            >
              <SelectTrigger className="h-9 text-sm sm:w-[118px]">
                <SelectValue placeholder="आयु सीमा" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-25">18-25 वर्ष</SelectItem>
                <SelectItem value="26-30">26-30 वर्ष</SelectItem>
                <SelectItem value="31-35">31-35 वर्ष</SelectItem>
                <SelectItem value="36-40">36-40 वर्ष</SelectItem>
                <SelectItem value="40-100">40+ वर्ष</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.gender}
              onValueChange={val => setFilters({ ...filters, gender: val })}
            >
              <SelectTrigger className="h-9 text-sm sm:w-[100px]">
                <SelectValue placeholder="लिंग" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">पुरुष</SelectItem>
                <SelectItem value="FEMALE">महिला</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.maritalStatus}
              onValueChange={val => setFilters({ ...filters, maritalStatus: val })}
            >
              <SelectTrigger className="h-9 text-sm sm:w-[140px]">
                <SelectValue placeholder="वैवाहिक स्थिति" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">अविवाहित</SelectItem>
                <SelectItem value="divorced">तलाकशुदा</SelectItem>
                <SelectItem value="widowed">विधवा/विधुर</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="sm"
              className="h-9 text-sm text-orange-600 hover:bg-orange-50"
              onClick={() => setFilters({ name: '', startAge: '', endAge: '', place: '', maritalStatus: '', gender: '' })}
            >
              <X className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">साफ़ करें</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, ChevronDown, Clock, Filter, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PastEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter events based on search query and category
  const filteredEvents = pastEvents.filter((event) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by category
    const matchesCategory = !selectedCategory || event.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Group events by month
  const eventsByMonth = filteredEvents.reduce<Record<string, Event[]>>((acc, event) => {
    const month = event.date.split(",")[0]
    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(event)
    return acc
  }, {})

  // Get unique months
  const months = Object.keys(eventsByMonth)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] to-[#E3F2FD] text-gray-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#32D3A7]/20 px-4 py-3 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#FFC947] to-[#FF6B81] flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-lg bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] bg-clip-text text-transparent">
                  My Guwahati City
                </h1>
                <p className="text-xs text-gray-500">Discover Events</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden md:inline">Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Past Events</h1>
            <p className="text-gray-500">Browse through events that have already taken place</p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Sort By</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                <DropdownMenuItem className="rounded-lg cursor-pointer">Date (Most Recent)</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg cursor-pointer">Date (Oldest)</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg cursor-pointer">Most Popular</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg cursor-pointer">A-Z</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex rounded-lg border border-gray-200 p-1">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-md ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-md ${viewMode === "list" ? "bg-gray-100" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events by name or location..."
              className="pl-10 pr-4 py-2 rounded-full border-[#32D3A7]/30 focus-visible:ring-[#6C5DD3]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px] rounded-full border-[#32D3A7]/30">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Arts">Arts & Culture</SelectItem>
              <SelectItem value="Food">Food & Drinks</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Tech">Technology</SelectItem>
              <SelectItem value="Literature">Literature</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-10 bg-gray-100 rounded-lg p-1">
            <TabsTrigger value="all" className="rounded-md">
              All
            </TabsTrigger>
            <TabsTrigger value="lastMonth" className="rounded-md">
              Last Month
            </TabsTrigger>
            <TabsTrigger value="last3Months" className="rounded-md">
              Last 3 Months
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Events by Month */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-white/50 animate-pulse h-[300px]"></div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="space-y-10">
            {months.map((month) => (
              <div key={month} className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#FF6B81]" />
                  {month}
                </h2>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventsByMonth[month].map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {eventsByMonth[month].map((event) => (
                      <EventListItem key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Calendar className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">No events found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
            <Button
              className="mt-4 rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

// Update the EventCard component to use Link directly
function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="overflow-hidden rounded-xl border-[#32D3A7]/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
        <CardContent className="p-0">
          <div className="relative">
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            {event.featured && (
              <Badge className="absolute top-2 right-2 z-20 bg-gradient-to-r from-[#FF6B81] to-[#FFC947] text-white">
                Featured
              </Badge>
            )}
            <div className="absolute bottom-2 left-2 z-20">
              <Badge className="bg-white/80 backdrop-blur-sm text-gray-800">
                {event.emoji} {event.category}
              </Badge>
            </div>
            <Badge className="absolute top-2 left-2 z-20 bg-[#FF6B81]/90 text-white">Past Event</Badge>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-gray-800 group-hover:text-[#6C5DD3] transition-colors">{event.title}</h3>
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <MapPin className="h-3 w-3 mr-1 text-[#FF6B81]" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar className="h-3 w-3 mr-1 text-[#32D3A7]" />
              <span>{event.date}</span>
            </div>
            <div className="mt-4">
              <Button className="w-full rounded-lg bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Update the EventListItem component to use Link directly
function EventListItem({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="rounded-xl border-[#32D3A7]/20 hover:shadow-md transition-shadow">
        <CardContent className="p-3 flex gap-4">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            <Badge className="absolute top-0 left-0 z-20 bg-[#FF6B81]/90 text-white text-xs px-1.5 py-0.5 rounded-br-lg">
              Past
            </Badge>
            {event.featured && (
              <div className="absolute top-0 right-0 z-20 bg-gradient-to-r from-[#FF6B81] to-[#FFC947] text-white text-xs px-1.5 py-0.5 rounded-bl-lg">
                Featured
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-800">{event.title}</h3>
              <Badge className="bg-white border border-gray-200 text-gray-600">{event.emoji}</Badge>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <MapPin className="h-3 w-3 mr-1 text-[#FF6B81]" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar className="h-3 w-3 mr-1 text-[#32D3A7]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="h-3 w-3 mr-1 text-[#6C5DD3]" />
              <span>{event.time || "7:00 PM"}</span>
            </div>
            <div className="mt-2 flex justify-end">
              <Button
                size="sm"
                className="rounded-lg bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90"
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Sample data
type Event = {
  id: number
  title: string
  category: string
  emoji: string
  location: string
  date: string
  time?: string
  image: string
  featured: boolean
}

const pastEvents: Event[] = [
  {
    id: 1,
    title: "Photography Exhibition",
    category: "Arts",
    emoji: "📸",
    location: "State Museum",
    date: "March, 10-15, 2023",
    time: "10:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 2,
    title: "Classical Music Concert",
    category: "Music",
    emoji: "🎵",
    location: "Rabindra Bhawan",
    date: "February, 25, 2023",
    time: "6:30 PM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 3,
    title: "Book Fair 2023",
    category: "Literature",
    emoji: "📚",
    location: "Judges Field",
    date: "January, 5-15, 2023",
    time: "11:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 4,
    title: "Winter Carnival",
    category: "Entertainment",
    emoji: "❄️",
    location: "Assam State Zoo",
    date: "December, 20-25, 2022",
    time: "10:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 5,
    title: "New Year's Eve Party",
    category: "Entertainment",
    emoji: "🎉",
    location: "Brahmaputra Riverfront",
    date: "December, 31, 2022",
    time: "8:00 PM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 6,
    title: "Charity Marathon",
    category: "Sports",
    emoji: "⚽",
    location: "City Center, Guwahati",
    date: "November, 15, 2022",
    time: "6:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 7,
    title: "Food Festival",
    category: "Food",
    emoji: "🍔",
    location: "Urban Haat",
    date: "November, 5-7, 2022",
    time: "12:00 PM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 8,
    title: "Tech Hackathon",
    category: "Tech",
    emoji: "💻",
    location: "IIT Guwahati",
    date: "October, 22-23, 2022",
    time: "9:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 9,
    title: "Art & Craft Exhibition",
    category: "Arts",
    emoji: "🎭",
    location: "State Art Gallery",
    date: "October, 10-15, 2022",
    time: "10:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 10,
    title: "Jazz Music Festival",
    category: "Music",
    emoji: "🎵",
    location: "Shilpgram, Guwahati",
    date: "September, 25, 2022",
    time: "5:00 PM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
]


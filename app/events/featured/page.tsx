"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, ChevronDown, Filter, MapPin, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function FeaturedEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter))
    } else {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  // Filter events based on search query, category, and filters
  const filteredEvents = allEvents.filter((event) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by category
    const matchesCategory = !selectedCategory || event.category === selectedCategory

    // Filter by selected filters
    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => {
        if (filter === "music") return event.category === "Music"
        if (filter === "arts") return event.category === "Arts"
        if (filter === "food") return event.category === "Food"
        if (filter === "sports") return event.category === "Sports"
        return false
      })

    return matchesSearch && matchesCategory && matchesFilters
  })

  // Group events by category
  const eventsByCategory = filteredEvents.reduce<Record<string, Event[]>>((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = []
    }
    acc[event.category].push(event)
    return acc
  }, {})

  // Get unique categories
  const categories = Object.keys(eventsByCategory)

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
            <h1 className="text-2xl font-bold text-gray-800">Featured Events</h1>
            <p className="text-gray-500">Discover the best events happening in Guwahati</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Sort By</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
              <DropdownMenuItem className="rounded-lg cursor-pointer">Most Popular</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">Date (Newest)</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">Date (Oldest)</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">A-Z</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            </SelectContent>
          </Select>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border-[#FF6B81]/30 hover:bg-[#FF6B81]/10 hover:text-[#FF6B81]",
              selectedFilters.includes("music") && "bg-[#FF6B81]/10 text-[#FF6B81] border-[#FF6B81]",
            )}
            onClick={() => toggleFilter("music")}
          >
            <span className="mr-1">🎵</span> Music
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border-[#32D3A7]/30 hover:bg-[#32D3A7]/10 hover:text-[#32D3A7]",
              selectedFilters.includes("arts") && "bg-[#32D3A7]/10 text-[#32D3A7] border-[#32D3A7]",
            )}
            onClick={() => toggleFilter("arts")}
          >
            <span className="mr-1">🎭</span> Arts
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border-[#FFC947]/30 hover:bg-[#FFC947]/10 hover:text-[#FFC947]",
              selectedFilters.includes("food") && "bg-[#FFC947]/10 text-[#FFC947] border-[#FFC947]",
            )}
            onClick={() => toggleFilter("food")}
          >
            <span className="mr-1">🍔</span> Food
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border-[#6C5DD3]/30 hover:bg-[#6C5DD3]/10 hover:text-[#6C5DD3]",
              selectedFilters.includes("sports") && "bg-[#6C5DD3]/10 text-[#6C5DD3] border-[#6C5DD3]",
            )}
            onClick={() => toggleFilter("sports")}
          >
            <span className="mr-1">⚽</span> Sports
          </Button>
          {selectedFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-gray-500"
              onClick={() => setSelectedFilters([])}
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Events by Category */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-white/50 animate-pulse h-[300px]"></div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="space-y-10">
            {categories.map((category) => (
              <div key={category} className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  {category === "Music" && <span className="mr-2">🎵</span>}
                  {category === "Arts" && <span className="mr-2">🎭</span>}
                  {category === "Food" && <span className="mr-2">🍔</span>}
                  {category === "Sports" && <span className="mr-2">⚽</span>}
                  {category === "Tech" && <span className="mr-2">💻</span>}
                  {category === "Entertainment" && <span className="mr-2">🎉</span>}
                  {category === "Wellness" && <span className="mr-2">🧘</span>}
                  {category === "Literature" && <span className="mr-2">📚</span>}
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventsByCategory[category].map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
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
            <Button className="mt-4 rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90">
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
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-[#FF6B81] to-[#FFC947] text-white">
              Featured
            </Badge>
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-white/80 backdrop-blur-sm text-gray-800">
                {event.emoji} {event.category}
              </Badge>
            </div>
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

// Sample data
type Event = {
  id: number
  title: string
  category: string
  emoji: string
  location: string
  date: string
  image: string
  featured: boolean
}

const allEvents: Event[] = [
  {
    id: 1,
    title: "Bihu Festival 2023",
    category: "Arts",
    emoji: "🎭",
    location: "Nehru Stadium, Guwahati",
    date: "Apr 14-16, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "Rock Music Festival",
    category: "Music",
    emoji: "🎵",
    location: "Shilpgram, Guwahati",
    date: "May 20-21, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    category: "Food",
    emoji: "🍔",
    location: "Brahmaputra Riverfront",
    date: "Jun 10-12, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 4,
    title: "Guwahati Marathon",
    category: "Sports",
    emoji: "⚽",
    location: "City Center, Guwahati",
    date: "Jul 2, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 5,
    title: "Art Exhibition",
    category: "Arts",
    emoji: "🎭",
    location: "State Art Gallery",
    date: "Jul 15-20, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 6,
    title: "Classical Music Concert",
    category: "Music",
    emoji: "🎵",
    location: "Rabindra Bhawan",
    date: "Aug 5, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 7,
    title: "Street Food Festival",
    category: "Food",
    emoji: "🍔",
    location: "Fancy Bazaar",
    date: "Aug 12-13, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 8,
    title: "Tech Conference 2023",
    category: "Tech",
    emoji: "💻",
    location: "IIT Guwahati",
    date: "Aug 20, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 9,
    title: "Football Tournament",
    category: "Sports",
    emoji: "⚽",
    location: "Indira Gandhi Athletic Stadium",
    date: "Sep 1-5, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 10,
    title: "Photography Exhibition",
    category: "Arts",
    emoji: "🎭",
    location: "State Museum",
    date: "Sep 10-15, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 11,
    title: "Jazz Night",
    category: "Music",
    emoji: "🎵",
    location: "Cafe Blues",
    date: "Sep 18, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 12,
    title: "Organic Food Market",
    category: "Food",
    emoji: "🍔",
    location: "Urban Haat",
    date: "Sep 25, 2023",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
]


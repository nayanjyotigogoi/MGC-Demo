"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Edit, Eye, Filter, MapPin, MoreHorizontal, Plus, Search, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const filteredEvents = events.filter((event) => {
    // Filter by search query
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by status
    const matchesStatus = !selectedStatus || event.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Events</h1>
          <p className="text-gray-500">Manage all your events in one place</p>
        </div>
        <Button className="rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events by name or location..."
            className="pl-10 rounded-xl border-gray-200 focus-visible:ring-[#6C5DD3]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={(value) => setSelectedStatus(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px] rounded-xl border-gray-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="rounded-xl border-gray-200">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 h-10 bg-gray-100 rounded-lg p-1">
          <TabsTrigger value="all" className="rounded-md">
            All
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="rounded-md">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="rounded-md">
            Past
          </TabsTrigger>
          <TabsTrigger value="draft" className="rounded-md">
            Drafts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Calendar className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No events found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
              <Button className="mt-4 rounded-xl bg-[#6C5DD3] hover:bg-[#6C5DD3]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create New Event
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents
              .filter((event) => event.upcoming)
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents
              .filter((event) => !event.upcoming && event.status !== "Draft")
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents
              .filter((event) => event.status === "Draft")
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card className="rounded-2xl border-[#32D3A7]/20 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <Eye className="h-4 w-4 mr-2 text-[#6C5DD3]" />
                <span>View Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <Edit className="h-4 w-4 mr-2 text-[#32D3A7]" />
                <span>Edit Event</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg cursor-pointer text-[#FF6B81]">
                <Trash className="h-4 w-4 mr-2" />
                <span>Delete Event</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="absolute bottom-3 left-3">
          <StatusBadge status={event.status} />
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-gray-800 text-lg">{event.title}</h3>

        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Clock className="h-4 w-4 mr-2 text-[#FF6B81]" />
          <span>{event.date}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-2 text-[#32D3A7]" />
          <span>{event.location}</span>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Link href={`/events/${event.id}`} className="flex-1">
            <Button
              variant="outline"
              className="rounded-xl w-full border-gray-200 hover:bg-[#6C5DD3]/10 hover:text-[#6C5DD3] hover:border-[#6C5DD3]"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
          <Link href={`/dashboard/events/${event.id}/edit`} className="flex-1">
            <Button className="rounded-xl w-full bg-[#32D3A7] hover:bg-[#32D3A7]/90 text-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  let bgColor = ""
  let textColor = ""

  switch (status) {
    case "Approved":
      bgColor = "bg-[#32D3A7]/90"
      textColor = "text-white"
      break
    case "Pending":
      bgColor = "bg-[#FFC947]/90"
      textColor = "text-white"
      break
    case "Rejected":
      bgColor = "bg-[#FF6B81]/90"
      textColor = "text-white"
      break
    case "Draft":
      bgColor = "bg-gray-500/90"
      textColor = "text-white"
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-800"
  }

  return <Badge className={`${bgColor} ${textColor} rounded-lg px-2 py-1 backdrop-blur-sm`}>{status}</Badge>
}

// Sample data
type Event = {
  id: number
  title: string
  date: string
  location: string
  status: string
  image: string
  upcoming: boolean
}

const events: Event[] = [
  {
    id: 1,
    title: "Guwahati Food Festival 2023",
    date: "Aug 15, 2023 • 10:00 AM",
    location: "Nehru Stadium, Guwahati",
    status: "Approved",
    image: "/placeholder.svg?height=200&width=400",
    upcoming: true,
  },
  {
    id: 2,
    title: "Tech Conference: Future of AI",
    date: "Aug 22, 2023 • 9:30 AM",
    location: "IIT Guwahati Campus",
    status: "Pending",
    image: "/placeholder.svg?height=200&width=400",
    upcoming: true,
  },
  {
    id: 3,
    title: "Cultural Night: Bihu Special",
    date: "Sep 5, 2023 • 6:00 PM",
    location: "Shilpgram, Guwahati",
    status: "Approved",
    image: "/placeholder.svg?height=200&width=400",
    upcoming: true,
  },
  {
    id: 4,
    title: "Music Concert: Local Artists",
    date: "Jul 10, 2023 • 7:00 PM",
    location: "Brahmaputra Riverfront",
    status: "Approved",
    image: "/placeholder.svg?height=200&width=400",
    upcoming: false,
  },
  {
    id: 5,
    title: "Photography Exhibition",
    date: "Jun 15, 2023 • 11:00 AM",
    location: "State Art Gallery",
    status: "Approved",
    image: "/placeholder.svg?height=200&width=400",
    upcoming: false,
  },
  {
    id: 6,
    title: "Startup Meetup 2023",
    date: "Not scheduled yet",
    location: "Draft location",
    status: "Draft",
    image: "/placeholder.svg?height=200&width=400",
    upcoming: false,
  },
]


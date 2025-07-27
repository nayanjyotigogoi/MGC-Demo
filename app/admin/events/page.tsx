"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Calendar,
  Clock,
  Download,
  Edit,
  Eye,
  Filter,
  MapPin,
  MoreHorizontal,
  Search,
  Trash,
  Users,
} from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [viewType, setViewType] = useState<"grid" | "table">("grid")

  const filteredEvents = events.filter((event) => {
    // Filter by search query
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by status
    const matchesStatus = !selectedStatus || event.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Events</h1>
          <p className="text-gray-500">Manage all events on the platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-lg border-gray-200">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="rounded-lg bg-[#0056D2] hover:bg-[#0056D2]/90 text-white">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events by name or organizer..."
            className="pl-10 rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={(value) => setSelectedStatus(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px] rounded-lg border-gray-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex rounded-lg border border-gray-200 p-1">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-md ${viewType === "grid" ? "bg-gray-100" : ""}`}
              onClick={() => setViewType("grid")}
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
              className={`rounded-md ${viewType === "table" ? "bg-gray-100" : ""}`}
              onClick={() => setViewType("table")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <Card className="rounded-lg border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="selectAll" />
              <label htmlFor="selectAll" className="text-sm font-medium">
                Select All
              </label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg text-[#0056D2] border-[#0056D2]">
                <Eye className="h-3.5 w-3.5 mr-1" />
                View Selected
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg text-[#EF4444] border-[#EF4444]">
                <Trash className="h-3.5 w-3.5 mr-1" />
                Delete Selected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Display */}
      {viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="py-3 px-4 text-left">
                  <Checkbox />
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Event</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Organizer</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Checkbox />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg?height=40&width=40"}
                          alt={event.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{event.organizer}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{event.date}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={event.status} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-[#EF4444]">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-lg">
                          <DialogHeader>
                            <DialogTitle>Delete Event</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this event? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="mt-4">
                            <Button variant="outline" className="rounded-lg">
                              Cancel
                            </Button>
                            <Button className="rounded-lg bg-[#EF4444] hover:bg-[#EF4444]/90">Delete</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Calendar className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">No events found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card className="rounded-lg border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="absolute top-2 left-2">
          <Checkbox className="h-5 w-5 rounded-md bg-white/80 backdrop-blur-sm" />
        </div>
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-2">
          <StatusBadge status={event.status} />
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-gray-800 text-lg">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{event.organizer}</p>

        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Clock className="h-4 w-4 mr-2 text-[#00B6F0]" />
          <span>{event.date}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-2 text-[#00B6F0]" />
          <span>{event.location}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Users className="h-4 w-4 mr-2 text-[#00B6F0]" />
          <span>{event.attendees} attendees</span>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="outline"
            className="rounded-lg flex-1 border-gray-200 hover:bg-[#0056D2]/10 hover:text-[#0056D2] hover:border-[#0056D2]"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button className="rounded-lg flex-1 bg-[#0056D2] hover:bg-[#0056D2]/90 text-white">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-lg border-gray-200">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-lg p-2">
              <DropdownMenuItem className="rounded-md cursor-pointer">
                <Eye className="h-4 w-4 mr-2 text-[#0056D2]" />
                <span>View Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-md cursor-pointer">
                <Edit className="h-4 w-4 mr-2 text-[#00B6F0]" />
                <span>Edit Event</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-md cursor-pointer text-[#EF4444]">
                <Trash className="h-4 w-4 mr-2" />
                <span>Delete Event</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      bgColor = "bg-[#10B981]"
      textColor = "text-white"
      break
    case "Pending":
      bgColor = "bg-[#F59E0B]"
      textColor = "text-white"
      break
    case "Rejected":
      bgColor = "bg-[#EF4444]"
      textColor = "text-white"
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-800"
  }

  return <Badge className={`${bgColor} ${textColor} rounded-full px-2 py-1`}>{status}</Badge>
}

// Sample data
type Event = {
  id: number
  title: string
  organizer: string
  date: string
  location: string
  status: string
  image: string
  attendees: number
}

const events: Event[] = [
  {
    id: 1,
    title: "Guwahati Food Festival 2023",
    organizer: "Acme Corporation",
    date: "Aug 15, 2023",
    location: "Nehru Stadium, Guwahati",
    status: "Approved",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 1250,
  },
  {
    id: 2,
    title: "Tech Conference: Future of AI",
    organizer: "TechHub Guwahati",
    date: "Aug 22, 2023",
    location: "IIT Guwahati Campus",
    status: "Pending",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 450,
  },
  {
    id: 3,
    title: "Cultural Night: Bihu Special",
    organizer: "Assam Cultural Society",
    date: "Sep 5, 2023",
    location: "Shilpgram, Guwahati",
    status: "Approved",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 850,
  },
  {
    id: 4,
    title: "Music Concert: Local Artists",
    organizer: "Guwahati Music Club",
    date: "Jul 10, 2023",
    location: "Brahmaputra Riverfront",
    status: "Approved",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 1100,
  },
  {
    id: 5,
    title: "Photography Exhibition",
    organizer: "Lens Art Association",
    date: "Jun 15, 2023",
    location: "State Art Gallery",
    status: "Rejected",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 320,
  },
  {
    id: 6,
    title: "Startup Meetup 2023",
    organizer: "Assam Startup Hub",
    date: "Sep 20, 2023",
    location: "Hotel Taj Vivanta",
    status: "Pending",
    image: "/placeholder.svg?height=200&width=400",
    attendees: 280,
  },
]


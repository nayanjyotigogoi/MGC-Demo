"use client"

import { useState } from "react"
import { Building, Calendar, Check, Clock, Eye, Filter, MapPin, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function EventRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredRequests = eventRequests.filter((request) => {
    // Filter by search query
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.organizer.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by category
    const matchesCategory = !selectedCategory || request.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Event Requests</h1>
          <p className="text-gray-500">Review and approve event submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-lg border-gray-200">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            Last 7 Days
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
            placeholder="Search by event name or organizer..."
            className="pl-10 rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px] rounded-lg border-gray-200">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Arts">Arts & Culture</SelectItem>
              <SelectItem value="Food">Food & Drinks</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Tech">Technology</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Requests</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{eventRequests.length}</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#0056D2]/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#0056D2]" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {eventRequests.filter((r) => r.status === "Pending").length}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-[#F59E0B]" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Processed Today</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">8</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
              <Check className="h-5 w-5 text-[#10B981]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-800">Event Requests</CardTitle>
          <CardDescription>Review and manage event submissions from organizers</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Category</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Status</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Checkbox />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden">
                          <img
                            src={request.image || "/placeholder.svg?height=40&width=40"}
                            alt={request.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{request.title}</p>
                          <p className="text-xs text-gray-500">{request.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{request.organizer}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{request.date}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full">
                        {request.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-lg">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-lg max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Event Request Details</DialogTitle>
                              <DialogDescription>
                                Review the event details before approving or rejecting
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                              <div className="md:col-span-1">
                                <div className="rounded-lg overflow-hidden">
                                  <img
                                    src={request.image || "/placeholder.svg?height=300&width=300"}
                                    alt={request.title}
                                    className="w-full h-auto object-cover"
                                  />
                                </div>

                                <div className="mt-4 space-y-3">
                                  <div className="flex items-center text-sm">
                                    <Building className="h-4 w-4 mr-2 text-[#00B6F0]" />
                                    <span className="font-medium">Organizer:</span>
                                    <span className="ml-1 text-gray-600">{request.organizer}</span>
                                  </div>

                                  <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-2 text-[#00B6F0]" />
                                    <span className="font-medium">Date:</span>
                                    <span className="ml-1 text-gray-600">{request.date}</span>
                                  </div>

                                  <div className="flex items-center text-sm">
                                    <MapPin className="h-4 w-4 mr-2 text-[#00B6F0]" />
                                    <span className="font-medium">Location:</span>
                                    <span className="ml-1 text-gray-600">{request.location}</span>
                                  </div>

                                  <div className="flex items-center text-sm">
                                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full">
                                      {request.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="md:col-span-2 space-y-4">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-800">{request.title}</h3>
                                  <p className="text-sm text-gray-500 mt-1">Submitted on {request.submittedDate}</p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-gray-700 mb-1">Description</h4>
                                  <p className="text-sm text-gray-600">{request.description}</p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-gray-700 mb-1">Documents</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {request.documents.map((doc, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="rounded-full border-[#0056D2] text-[#0056D2]"
                                      >
                                        {doc}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                  <h4 className="font-medium text-gray-700 mb-2">Admin Decision</h4>

                                  <div className="space-y-3">
                                    <div className="space-y-2">
                                      <Label htmlFor="feedback">Feedback (optional)</Label>
                                      <Textarea
                                        id="feedback"
                                        placeholder="Provide feedback to the organizer..."
                                        className="rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
                                      />
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <Checkbox id="sendEmail" />
                                      <label htmlFor="sendEmail" className="text-sm text-gray-600">
                                        Send email notification to organizer
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <DialogFooter className="mt-6 flex gap-2">
                              <Button variant="outline" className="rounded-lg">
                                Cancel
                              </Button>
                              <Button
                                variant="outline"
                                className="rounded-lg bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 border-[#EF4444]"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button className="rounded-lg bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm" className="rounded-lg text-[#10B981] border-[#10B981]">
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Approve
                        </Button>

                        <Button variant="outline" size="sm" className="rounded-lg text-[#EF4444] border-[#EF4444]">
                          <X className="h-3.5 w-3.5 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Calendar className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No requests found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
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
type EventRequest = {
  id: number
  title: string
  organizer: string
  date: string
  location: string
  category: string
  status: string
  image: string
  submittedDate: string
  description: string
  documents: string[]
}

const eventRequests: EventRequest[] = [
  {
    id: 1,
    title: "Guwahati Food Festival 2023",
    organizer: "Acme Corporation",
    date: "Aug 15, 2023",
    location: "Nehru Stadium, Guwahati",
    category: "Food",
    status: "Pending",
    image: "/placeholder.svg?height=200&width=400",
    submittedDate: "Jul 25, 2023",
    description:
      "A three-day food festival showcasing the diverse culinary traditions of Northeast India. The event will feature food stalls, cooking demonstrations, and cultural performances.",
    documents: ["Event Proposal.pdf", "Venue Permission.pdf", "Food Safety Certificate.pdf"],
  },
  {
    id: 2,
    title: "Tech Conference: Future of AI",
    organizer: "TechHub Guwahati",
    date: "Aug 22, 2023",
    location: "IIT Guwahati Campus",
    category: "Tech",
    status: "Pending",
    image: "/placeholder.svg?height=200&width=400",
    submittedDate: "Jul 28, 2023",
    description:
      "A conference bringing together AI researchers, industry experts, and enthusiasts to discuss the latest advancements and future trends in artificial intelligence.",
    documents: ["Conference Agenda.pdf", "Speaker Profiles.pdf"],
  },
  {
    id: 3,
    title: "Cultural Night: Bihu Special",
    organizer: "Assam Cultural Society",
    date: "Sep 5, 2023",
    location: "Shilpgram, Guwahati",
    category: "Arts",
    status: "Pending",
    image: "/placeholder.svg?height=200&width=400",
    submittedDate: "Jul 30, 2023",
    description:
      "A cultural evening celebrating the traditional Bihu dance and music of Assam. The event will feature performances by local artists and a workshop on Bihu dance.",
    documents: ["Event Schedule.pdf", "Performer List.pdf", "Budget Proposal.pdf"],
  },
  {
    id: 4,
    title: "Charity Run for Education",
    organizer: "Bright Future Foundation",
    date: "Sep 12, 2023",
    location: "Dighalipukhuri Park, Guwahati",
    category: "Sports",
    status: "Approved",
    image: "/placeholder.svg?height=200&width=400",
    submittedDate: "Jul 20, 2023",
    description:
      "A 5K charity run to raise funds for underprivileged children's education. All proceeds will go towards providing scholarships and educational materials.",
    documents: ["Route Map.pdf", "Safety Plan.pdf", "NGO Registration.pdf"],
  },
  {
    id: 5,
    title: "Photography Workshop",
    organizer: "Lens Art Association",
    date: "Aug 28, 2023",
    location: "State Art Gallery",
    category: "Arts",
    status: "Rejected",
    image: "/placeholder.svg?height=200&width=400",
    submittedDate: "Jul 15, 2023",
    description:
      "A hands-on workshop on wildlife photography techniques led by renowned photographer Rajesh Kumar. Participants will learn about camera settings, composition, and post-processing.",
    documents: ["Workshop Outline.pdf", "Instructor Bio.pdf"],
  },
  {
    id: 6,
    title: "Startup Pitch Competition",
    organizer: "Assam Startup Hub",
    date: "Sep 20, 2023",
    location: "Hotel Taj Vivanta",
    category: "Tech",
    status: "Pending",
    image: "/placeholder.svg?height=200&width=400",
    submittedDate: "Aug 1, 2023",
    description:
      "A platform for local startups to pitch their ideas to investors and industry experts. Cash prizes and mentorship opportunities will be awarded to the winners.",
    documents: ["Competition Rules.pdf", "Judging Criteria.pdf", "Venue Booking.pdf"],
  },
]


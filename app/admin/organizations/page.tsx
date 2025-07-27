"use client"

import { useState } from "react"
import {
  Building,
  Calendar,
  Clock,
  Download,
  Eye,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  Trash,
  User,
  X,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredOrgs = organizations.filter((org) => {
    // Filter by search query
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by category
    const matchesCategory = !selectedCategory || org.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Organizations</h1>
          <p className="text-gray-500">Manage verified organizations on the platform</p>
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
            placeholder="Search organizations by name or email..."
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
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="NGO">NGO</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Government">Government</SelectItem>
              <SelectItem value="Community">Community</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Organizations</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{organizations.length}</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#0056D2]/10 flex items-center justify-center">
              <Building className="h-5 w-5 text-[#0056D2]" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Organizations</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {organizations.filter((o) => o.status === "Active").length}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
              <User className="h-5 w-5 text-[#10B981]" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Events</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">248</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#00B6F0]/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#00B6F0]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organizations Table */}
      <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-gray-800">Verified Organizations</CardTitle>
          <CardDescription>Manage organizations and their event permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="py-3 px-4 text-left">
                    <Checkbox />
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Organization</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Contact</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Category</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Events</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Status</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.map((org) => (
                  <tr key={org.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Checkbox />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src={org.logo || "/placeholder.svg?height=40&width=40"}
                            alt={org.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{org.name}</p>
                          <p className="text-xs text-gray-500">{org.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          <span>{org.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          <span>{org.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full">{org.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{org.eventsCount}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={org.status} />
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
                              <DialogTitle>Organization Profile</DialogTitle>
                              <DialogDescription>View detailed information about this organization</DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                              <div className="md:col-span-1">
                                <div className="flex flex-col items-center">
                                  <div className="h-24 w-24 rounded-full overflow-hidden">
                                    <img
                                      src={org.logo || "/placeholder.svg?height=96&width=96"}
                                      alt={org.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>

                                  <h3 className="text-lg font-bold text-gray-800 mt-3">{org.name}</h3>
                                  <Badge className="mt-1 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full">
                                    {org.category}
                                  </Badge>

                                  <StatusBadge status={org.status} className="mt-2" />
                                </div>

                                <div className="mt-6 space-y-3">
                                  <div className="flex items-center text-sm">
                                    <Mail className="h-4 w-4 mr-2 text-[#00B6F0]" />
                                    <span className="font-medium">Email:</span>
                                    <span className="ml-1 text-gray-600">{org.email}</span>
                                  </div>

                                  <div className="flex items-center text-sm">
                                    <Phone className="h-4 w-4 mr-2 text-[#00B6F0]" />
                                    <span className="font-medium">Phone:</span>
                                    <span className="ml-1 text-gray-600">{org.phone}</span>
                                  </div>

                                  <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-2 text-[#00B6F0]" />
                                    <span className="font-medium">Joined:</span>
                                    <span className="ml-1 text-gray-600">{org.joinDate}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="md:col-span-2">
                                <Tabs defaultValue="details" className="w-full">
                                  <TabsList className="grid w-full grid-cols-3 h-10 bg-gray-100 rounded-lg p-1">
                                    <TabsTrigger value="details" className="rounded-md">
                                      Details
                                    </TabsTrigger>
                                    <TabsTrigger value="events" className="rounded-md">
                                      Events
                                    </TabsTrigger>
                                    <TabsTrigger value="documents" className="rounded-md">
                                      Documents
                                    </TabsTrigger>
                                  </TabsList>

                                  <TabsContent value="details" className="mt-4 space-y-4">
                                    <div>
                                      <h4 className="font-medium text-gray-700 mb-1">About</h4>
                                      <p className="text-sm text-gray-600">{org.description}</p>
                                    </div>

                                    <div>
                                      <h4 className="font-medium text-gray-700 mb-1">Address</h4>
                                      <p className="text-sm text-gray-600">{org.address}</p>
                                    </div>

                                    <div>
                                      <h4 className="font-medium text-gray-700 mb-1">Registration Details</h4>
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                          <span className="text-gray-500">Registration No:</span>
                                          <span className="ml-1 text-gray-700">{org.regNumber}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">PAN:</span>
                                          <span className="ml-1 text-gray-700">{org.panNumber}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">GST:</span>
                                          <span className="ml-1 text-gray-700">{org.gstNumber || "N/A"}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="events" className="mt-4">
                                    <div className="space-y-3">
                                      {org.recentEvents.map((event, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                                          <div className="h-10 w-10 rounded-lg overflow-hidden">
                                            <img
                                              src={event.image || "/placeholder.svg?height=40&width=40"}
                                              alt={event.title}
                                              className="h-full w-full object-cover"
                                            />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                                            <div className="flex items-center text-xs text-gray-500">
                                              <Clock className="h-3 w-3 mr-1" />
                                              <span>{event.date}</span>
                                            </div>
                                          </div>
                                          <StatusBadge status={event.status} />
                                        </div>
                                      ))}

                                      <Button
                                        variant="outline"
                                        className="w-full rounded-lg text-[#0056D2] border-[#0056D2]"
                                      >
                                        View All Events
                                      </Button>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="documents" className="mt-4">
                                    <div className="space-y-3">
                                      {org.documents.map((doc, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                                        >
                                          <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-lg bg-[#0056D2]/10 flex items-center justify-center">
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                                                  stroke="#0056D2"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M14 2V8H20"
                                                  stroke="#0056D2"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M16 13H8"
                                                  stroke="#0056D2"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M16 17H8"
                                                  stroke="#0056D2"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M10 9H9H8"
                                                  stroke="#0056D2"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </div>
                                            <div>
                                              <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                                              <p className="text-xs text-gray-500">{doc.size}</p>
                                            </div>
                                          </div>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                                            <Download className="h-4 w-4 text-[#0056D2]" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            </div>

                            <DialogFooter className="mt-6">
                              <Button variant="outline" className="rounded-lg">
                                Close
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-lg border-gray-200 h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-lg p-2">
                            <DropdownMenuItem className="rounded-md cursor-pointer">
                              <Eye className="h-4 w-4 mr-2 text-[#0056D2]" />
                              <span>View Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-md cursor-pointer">
                              <Calendar className="h-4 w-4 mr-2 text-[#00B6F0]" />
                              <span>View Events</span>
                            </DropdownMenuItem>
                            {org.status === "Active" ? (
                              <DropdownMenuItem className="rounded-md cursor-pointer text-[#EF4444]">
                                <X className="h-4 w-4 mr-2" />
                                <span>Suspend</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="rounded-md cursor-pointer text-[#10B981]">
                                <Check className="h-4 w-4 mr-2" />
                                <span>Activate</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="rounded-md cursor-pointer text-[#EF4444]">
                              <Trash className="h-4 w-4 mr-2" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrgs.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Building className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No organizations found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBadge({ status, className = "" }: { status: string; className?: string }) {
  let bgColor = ""
  let textColor = ""

  switch (status) {
    case "Active":
      bgColor = "bg-[#10B981]"
      textColor = "text-white"
      break
    case "Pending":
      bgColor = "bg-[#F59E0B]"
      textColor = "text-white"
      break
    case "Suspended":
      bgColor = "bg-[#EF4444]"
      textColor = "text-white"
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-800"
  }

  return <Badge className={`${bgColor} ${textColor} rounded-full px-2 py-1 ${className}`}>{status}</Badge>
}

// Sample data
type Organization = {
  id: number
  name: string
  logo: string
  email: string
  phone: string
  category: string
  status: string
  joinDate: string
  eventsCount: number
  description: string
  address: string
  regNumber: string
  panNumber: string
  gstNumber: string | null
  recentEvents: {
    title: string
    date: string
    status: string
    image: string
  }[]
  documents: {
    name: string
    size: string
  }[]
}

const organizations: Organization[] = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "/placeholder.svg?height=40&width=40",
    email: "admin@acmecorp.com",
    phone: "+91 98765 43210",
    category: "Business",
    status: "Active",
    joinDate: "Jan 15, 2023",
    eventsCount: 12,
    description:
      "Acme Corporation is a leading event organizer in Guwahati, specializing in cultural, tech, and food festivals.",
    address: "123 Main Street, Guwahati, Assam, India - 781001",
    regNumber: "REG123456789",
    panNumber: "ABCDE1234F",
    gstNumber: "22AAAAA0000A1Z5",
    recentEvents: [
      {
        title: "Guwahati Food Festival 2023",
        date: "Aug 15, 2023",
        status: "Approved",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        title: "Tech Conference: Future of AI",
        date: "Aug 22, 2023",
        status: "Pending",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        title: "Cultural Night: Bihu Special",
        date: "Sep 5, 2023",
        status: "Approved",
        image: "/placeholder.svg?height=40&width=40",
      },
    ],
    documents: [
      {
        name: "Business Registration.pdf",
        size: "2.4 MB",
      },
      {
        name: "PAN Card.pdf",
        size: "1.2 MB",
      },
      {
        name: "GST Certificate.pdf",
        size: "3.1 MB",
      },
    ],
  },
  {
    id: 2,
    name: "TechHub Guwahati",
    logo: "/placeholder.svg?height=40&width=40",
    email: "info@techhub.org",
    phone: "+91 87654 32109",
    category: "Education",
    status: "Active",
    joinDate: "Feb 20, 2023",
    eventsCount: 8,
    description:
      "TechHub Guwahati is a technology community that organizes workshops, hackathons, and tech conferences to promote innovation and learning.",
    address: "45 Tech Park, IIT Campus, Guwahati, Assam, India - 781039",
    regNumber: "REG987654321",
    panNumber: "FGHIJ5678K",
    gstNumber: null,
    recentEvents: [
      {
        title: "Hackathon 2023",
        date: "Jul 10, 2023",
        status: "Approved",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        title: "Web Development Workshop",
        date: "Aug 5, 2023",
        status: "Approved",
        image: "/placeholder.svg?height=40&width=40",
      },
    ],
    documents: [
      {
        name: "NGO Registration.pdf",
        size: "1.8 MB",
      },
      {
        name: "PAN Card.pdf",
        size: "1.0 MB",
      },
    ],
  },
  {
    id: 3,
    name: "Assam Cultural Society",
    logo: "/placeholder.svg?height=40&width=40",
    email: "contact@assamculture.org",
    phone: "+91 76543 21098",
    category: "NGO",
    status: "Active",
    joinDate: "Mar 10, 2023",
    eventsCount: 15,
    description:
      "Assam Cultural Society is dedicated to preserving and promoting the rich cultural heritage of Assam through various cultural events and workshops.",
    address: "78 Cultural Avenue, Shilpgram, Guwahati, Assam, India - 781022",
    regNumber: "REG567891234",
    panNumber: "KLMNO9876P",
    gstNumber: null,
    recentEvents: [
      {
        title: "Bihu Dance Workshop",
        date: "Jun 15, 2023",
        status: "Approved",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        title: "Traditional Music Concert",
        date: "Jul 22, 2023",
        status: "Approved",
        image: "/placeholder.svg?height=40&width=40",
      },
    ],
    documents: [
      {
        name: "Society Registration.pdf",
        size: "2.1 MB",
      },
      {
        name: "PAN Card.pdf",
        size: "1.1 MB",
      },
    ],
  },
  {
    id: 4,
    name: "Green Earth NGO",
    logo: "/placeholder.svg?height=40&width=40",
    email: "info@greenearth.org",
    phone: "+91 65432 10987",
    category: "NGO",
    status: "Suspended",
    joinDate: "Apr 5, 2023",
    eventsCount: 6,
    description:
      "Green Earth NGO works towards environmental conservation and sustainability through awareness campaigns and community initiatives.",
    address: "34 Green Park, Zoo Road, Guwahati, Assam, India - 781005",
    regNumber: "REG345678912",
    panNumber: "PQRST4567U",
    gstNumber: null,
    recentEvents: [
      {
        title: "Tree Plantation Drive",
        date: "May 5, 2023",
        status: "Approved",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        title: "River Cleanup Campaign",
        date: "Jun 10, 2023",
        status: "Rejected",
        image: "/placeholder.svg?height=40&width=40",
      },
    ],
    documents: [
      {
        name: "NGO Registration.pdf",
        size: "1.9 MB",
      },
      {
        name: "PAN Card.pdf",
        size: "1.0 MB",
      },
    ],
  },
  {
    id: 5,
    name: "Guwahati Sports Club",
    logo: "/placeholder.svg?height=40&width=40",
    email: "contact@gsports.com",
    phone: "+91 54321 09876",
    category: "Community",
    status: "Active",
    joinDate: "May 12, 2023",
    eventsCount: 10,
    description:
      "Guwahati Sports Club organizes various sports events and tournaments to promote sports and physical fitness in the community.",
    address: "56 Stadium Road, Nehru Stadium, Guwahati, Assam, India - 781004",
    regNumber: "REG234567891",
    panNumber: "UVWXY2345Z",
    gstNumber: "22BBBBB0000B1Z5",
    recentEvents: [
      {
        title: "Marathon 2023",
        date: "Jun 25, 2023",
        status: "Approved",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        title: "Cricket Tournament",
        date: "Jul 15, 2023",
        status: "Approved",
        image: "/placeholder.svg?height=40&width=40",
      },
    ],
    documents: [
      {
        name: "Club Registration.pdf",
        size: "2.2 MB",
      },
      {
        name: "PAN Card.pdf",
        size: "1.1 MB",
      },
      {
        name: "GST Certificate.pdf",
        size: "2.8 MB",
      },
    ],
  },
]


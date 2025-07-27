"use client"

import { useState } from "react"
import { Building, Check, Clock, Download, Eye, FileText, Filter, Mail, Phone, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function OrganizationRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRequests = orgRequests.filter((request) => {
    // Filter by search query
    const matchesSearch =
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Organization Requests</h1>
          <p className="text-gray-500">Review and verify organization registration requests</p>
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
            placeholder="Search by organization name, email, or contact person..."
            className="pl-10 rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Requests</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{orgRequests.length}</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-[#0056D2]/10 flex items-center justify-center">
              <Building className="h-5 w-5 text-[#0056D2]" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {orgRequests.filter((r) => r.status === "Pending").length}
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
              <h3 className="text-2xl font-bold text-gray-800 mt-1">3</h3>
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
          <CardTitle className="text-lg font-bold text-gray-800">Organization Verification Requests</CardTitle>
          <CardDescription>Review and verify organization registration requests</CardDescription>
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
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Contact Person</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Contact</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Documents</th>
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
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src={request.logo || "/placeholder.svg?height=40&width=40"}
                            alt={request.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{request.name}</p>
                          <p className="text-xs text-gray-500">{request.submittedDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{request.contactPerson}</td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          <span>{request.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          <span>{request.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full">
                        {request.documents.length} docs
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
                              <DialogTitle>Organization Verification Request</DialogTitle>
                              <DialogDescription>
                                Review the organization details and documents before verification
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                              <div className="md:col-span-1">
                                <div className="flex flex-col items-center">
                                  <div className="h-24 w-24 rounded-full overflow-hidden">
                                    <img
                                      src={request.logo || "/placeholder.svg?height=96&width=96"}
                                      alt={request.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>

                                  <h3 className="text-lg font-bold text-gray-800 mt-3">{request.name}</h3>
                                  <Badge className="mt-1 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full">
                                    {request.category}
                                  </Badge>

                                  <StatusBadge status={request.status} className="mt-2" />
                                </div>

                                <div className="mt-6 space-y-3">
                                  <div className="flex items-center text-sm">
                                    <Mail className="h-4 w-4 mr-2 text-[#00B6F0]" />
                                    <span className="font-medium">Email:</span>
                                    <span className="ml-1 text-gray-600">{request.email}</span>
                                  </div>

                                  <div className="flex items-center text-sm">
                                    <Phone className="h-4 w-4 mr-2 text-[#00B6F0]" />
                                    <span className="font-medium">Phone:</span>
                                    <span className="ml-1 text-gray-600">{request.phone}</span>
                                  </div>

                                  <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-[#00B6F0]" />
                                    <span className="font-medium">Submitted:</span>
                                    <span className="ml-1 text-gray-600">{request.submittedDate}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="md:col-span-2">
                                <Tabs defaultValue="details" className="w-full">
                                  <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-100 rounded-lg p-1">
                                    <TabsTrigger value="details" className="rounded-md">
                                      Details
                                    </TabsTrigger>
                                    <TabsTrigger value="documents" className="rounded-md">
                                      Documents
                                    </TabsTrigger>
                                  </TabsList>

                                  <TabsContent value="details" className="mt-4 space-y-4">
                                    <div>
                                      <h4 className="font-medium text-gray-700 mb-1">About</h4>
                                      <p className="text-sm text-gray-600">{request.description}</p>
                                    </div>

                                    <div>
                                      <h4 className="font-medium text-gray-700 mb-1">Address</h4>
                                      <p className="text-sm text-gray-600">{request.address}</p>
                                    </div>

                                    <div>
                                      <h4 className="font-medium text-gray-700 mb-1">Registration Details</h4>
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                          <span className="text-gray-500">Registration No:</span>
                                          <span className="ml-1 text-gray-700">{request.regNumber}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">PAN:</span>
                                          <span className="ml-1 text-gray-700">{request.panNumber}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">GST:</span>
                                          <span className="ml-1 text-gray-700">{request.gstNumber || "N/A"}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium text-gray-700 mb-1">Contact Person</h4>
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                          <span className="text-gray-500">Name:</span>
                                          <span className="ml-1 text-gray-700">{request.contactPerson}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">Designation:</span>
                                          <span className="ml-1 text-gray-700">{request.contactDesignation}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>

                                  <TabsContent value="documents" className="mt-4">
                                    <div className="space-y-3">
                                      {request.documents.map((doc, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                                        >
                                          <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-lg bg-[#0056D2]/10 flex items-center justify-center">
                                              <FileText className="h-4 w-4 text-[#0056D2]" />
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

                                <div className="pt-4 mt-4 border-t border-gray-200">
                                  <h4 className="font-medium text-gray-700 mb-2">Verification Decision</h4>

                                  <div className="space-y-3">
                                    <div className="space-y-2">
                                      <Label htmlFor="feedback">Feedback (optional)</Label>
                                      <Textarea
                                        id="feedback"
                                        placeholder="Provide feedback to the organization..."
                                        className="rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
                                      />
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <Checkbox id="sendEmail" />
                                      <label htmlFor="sendEmail" className="text-sm text-gray-600">
                                        Send email notification to organization
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
                                Verify
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm" className="rounded-lg text-[#10B981] border-[#10B981]">
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Verify
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
                <Building className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No requests found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
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
    case "Verified":
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

  return <Badge className={`${bgColor} ${textColor} rounded-full px-2 py-1 ${className}`}>{status}</Badge>
}

// Sample data
type OrgRequest = {
  id: number
  name: string
  logo: string
  email: string
  phone: string
  category: string
  status: string
  submittedDate: string
  contactPerson: string
  contactDesignation: string
  description: string
  address: string
  regNumber: string
  panNumber: string
  gstNumber: string | null
  documents: {
    name: string
    size: string
  }[]
}

const orgRequests: OrgRequest[] = [
  {
    id: 1,
    name: "TechHub Guwahati",
    logo: "/placeholder.svg?height=40&width=40",
    email: "info@techhub.org",
    phone: "+91 87654 32109",
    category: "Education",
    status: "Pending",
    submittedDate: "Jul 28, 2023",
    contactPerson: "Rahul Sharma",
    contactDesignation: "Director",
    description:
      "TechHub Guwahati is a technology community that organizes workshops, hackathons, and tech conferences to promote innovation and learning.",
    address: "45 Tech Park, IIT Campus, Guwahati, Assam, India - 781039",
    regNumber: "REG987654321",
    panNumber: "FGHIJ5678K",
    gstNumber: null,
    documents: [
      {
        name: "NGO Registration.pdf",
        size: "1.8 MB",
      },
      {
        name: "PAN Card.pdf",
        size: "1.0 MB",
      },
      {
        name: "Director ID Proof.pdf",
        size: "2.3 MB",
      },
    ],
  },
  {
    id: 2,
    name: "Assam Cultural Society",
    logo: "/placeholder.svg?height=40&width=40",
    email: "contact@assamculture.org",
    phone: "+91 76543 21098",
    category: "NGO",
    status: "Pending",
    submittedDate: "Jul 30, 2023",
    contactPerson: "Priya Devi",
    contactDesignation: "Secretary",
    description:
      "Assam Cultural Society is dedicated to preserving and promoting the rich cultural heritage of Assam through various cultural events and workshops.",
    address: "78 Cultural Avenue, Shilpgram, Guwahati, Assam, India - 781022",
    regNumber: "REG567891234",
    panNumber: "KLMNO9876P",
    gstNumber: null,
    documents: [
      {
        name: "Society Registration.pdf",
        size: "2.1 MB",
      },
      {
        name: "PAN Card.pdf",
        size: "1.1 MB",
      },
      {
        name: "Address Proof.pdf",
        size: "1.5 MB",
      },
      {
        name: "Member List.pdf",
        size: "3.2 MB",
      },
    ],
  },
  {
    id: 3,
    name: "Green Earth NGO",
    logo: "/placeholder.svg?height=40&width=40",
    email: "info@greenearth.org",
    phone: "+91 65432 10987",
    category: "NGO",
    status: "Pending",
    submittedDate: "Aug 1, 2023",
    contactPerson: "Amit Kumar",
    contactDesignation: "President",
    description:
      "Green Earth NGO works towards environmental conservation and sustainability through awareness campaigns and community initiatives.",
    address: "34 Green Park, Zoo Road, Guwahati, Assam, India - 781005",
    regNumber: "REG345678912",
    panNumber: "PQRST4567U",
    gstNumber: null,
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
    id: 4,
    name: "Startup Incubator Hub",
    logo: "/placeholder.svg?height=40&width=40",
    email: "contact@startupincubator.com",
    phone: "+91 54321 09876",
    category: "Business",
    status: "Rejected",
    submittedDate: "Jul 15, 2023",
    contactPerson: "Vikram Singh",
    contactDesignation: "CEO",
    description:
      "Startup Incubator Hub provides mentorship, resources, and networking opportunities to early-stage startups in the Northeast region.",
    address: "22 Innovation Street, Guwahati, Assam, India - 781003",
    regNumber: "REG123789456",
    panNumber: "VWXYZ1234A",
    gstNumber: "22CCCCC0000C1Z5",
    documents: [
      {
        name: "Business Registration.pdf",
        size: "2.5 MB",
      },
      {
        name: "PAN Card.pdf",
        size: "1.2 MB",
      },
      {
        name: "GST Certificate.pdf",
        size: "1.8 MB",
      },
    ],
  },
  {
    id: 5,
    name: "Guwahati Art Collective",
    logo: "/placeholder.svg?height=40&width=40",
    email: "hello@artcollective.org",
    phone: "+91 43210 98765",
    category: "Community",
    status: "Verified",
    submittedDate: "Jul 10, 2023",
    contactPerson: "Meena Sharma",
    contactDesignation: "Founder",
    description:
      "Guwahati Art Collective is a community of artists working together to promote local art and provide a platform for emerging artists in the region.",
    address: "56 Art Street, State Art Gallery, Guwahati, Assam, India - 781007",
    regNumber: "REG789123456",
    panNumber: "BCDEF9876G",
    gstNumber: null,
    documents: [
      {
        name: "Community Registration.pdf",
        size: "1.7 MB",
      },
      {
        name: "PAN Card.pdf",
        size: "1.0 MB",
      },
      {
        name: "Founder ID Proof.pdf",
        size: "1.3 MB",
      },
    ],
  },
]


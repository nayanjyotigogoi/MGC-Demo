import Link from "next/link"
import {
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  ClipboardList,
  Clock,
  FileCheck,
  Users,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, John! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-lg border-gray-200">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            Last 7 Days
          </Button>
          <Button className="rounded-lg bg-[#0056D2] hover:bg-[#0056D2]/90 text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Events</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">248</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-[#0056D2]/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-[#0056D2]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">This month</span>
                <span className="font-medium">24 new</span>
              </div>
              <Progress value={65} className="h-1.5 bg-gray-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Organizations</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">56</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-[#00B6F0]/10 flex items-center justify-center">
                <Building className="h-6 w-6 text-[#00B6F0]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">This month</span>
                <span className="font-medium">8 new</span>
              </div>
              <Progress value={40} className="h-1.5 bg-gray-100" indicatorClassName="bg-[#00B6F0]" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">17</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-[#F59E0B]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Events: 12</span>
                <span className="font-medium">Orgs: 5</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Progress value={70} className="h-1.5 bg-gray-100" indicatorClassName="bg-[#F59E0B]" />
                <Progress value={30} className="h-1.5 bg-gray-100" indicatorClassName="bg-[#F59E0B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">1,248</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#10B981]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">This month</span>
                <span className="font-medium">124 new</span>
              </div>
              <Progress value={85} className="h-1.5 bg-gray-100" indicatorClassName="bg-[#10B981]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-800">Pending Event Requests</CardTitle>
                <CardDescription>Events awaiting approval</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg text-[#0056D2] border-[#0056D2]">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center border border-gray-200 overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg?height=48&width=48"}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 truncate">{event.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Building className="h-3 w-3 mr-1" />
                        <span>{event.organizer}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs">
                      View
                    </Button>
                    <Button size="sm" className="rounded-lg h-8 text-xs bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}

              <Link href="/admin/event-requests">
                <Button
                  variant="ghost"
                  className="w-full rounded-lg text-[#0056D2] hover:bg-[#0056D2]/10 hover:text-[#0056D2] mt-2"
                >
                  View All Pending Events
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-800">Pending Organization Requests</CardTitle>
                <CardDescription>Organizations awaiting verification</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg text-[#0056D2] border-[#0056D2]">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingOrgs.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-gray-200 overflow-hidden">
                    <img
                      src={org.logo || "/placeholder.svg?height=48&width=48"}
                      alt={org.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 truncate">{org.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{org.contactPerson}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 truncate">
                        <FileCheck className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{org.documents} docs</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs">
                      View
                    </Button>
                    <Button size="sm" className="rounded-lg h-8 text-xs bg-[#10B981] hover:bg-[#10B981]/90 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verify
                    </Button>
                  </div>
                </div>
              ))}

              <Link href="/admin/organization-requests">
                <Button
                  variant="ghost"
                  className="w-full rounded-lg text-[#0056D2] hover:bg-[#0056D2]/10 hover:text-[#0056D2] mt-2"
                >
                  View All Pending Organizations
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-800">Recent Activity</CardTitle>
              <CardDescription>Latest admin actions and system updates</CardDescription>
            </div>
            <Tabs defaultValue="all" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3 h-8 bg-gray-100 rounded-lg p-1">
                <TabsTrigger value="all" className="rounded-md text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="approvals" className="rounded-md text-xs">
                  Approvals
                </TabsTrigger>
                <TabsTrigger value="system" className="rounded-md text-xs">
                  System
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div
                  className={`h-10 w-10 rounded-lg ${activity.iconBg} flex items-center justify-center flex-shrink-0`}
                >
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{activity.time}</span>
                    {activity.admin && (
                      <>
                        <span className="mx-1">•</span>
                        <span>by {activity.admin}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample data
const pendingEvents = [
  {
    id: 1,
    title: "Guwahati Food Festival 2023",
    organizer: "Acme Corporation",
    date: "Aug 15, 2023",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    title: "Tech Conference: Future of AI",
    organizer: "TechHub Guwahati",
    date: "Aug 22, 2023",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    title: "Cultural Night: Bihu Special",
    organizer: "Assam Cultural Society",
    date: "Sep 5, 2023",
    image: "/placeholder.svg?height=48&width=48",
  },
]

const pendingOrgs = [
  {
    id: 1,
    name: "TechHub Guwahati",
    contactPerson: "Rahul Sharma",
    documents: 3,
    logo: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    name: "Assam Cultural Society",
    contactPerson: "Priya Devi",
    documents: 4,
    logo: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    name: "Green Earth NGO",
    contactPerson: "Amit Kumar",
    documents: 2,
    logo: "/placeholder.svg?height=48&width=48",
  },
]

const activities = [
  {
    id: 1,
    message: "Event 'Guwahati Food Festival 2023' has been approved",
    time: "2 hours ago",
    admin: "John Doe",
    icon: CheckCircle,
    iconBg: "bg-[#10B981]/10",
    iconColor: "text-[#10B981]",
  },
  {
    id: 2,
    message: "Organization 'TechHub Guwahati' verification request rejected",
    time: "5 hours ago",
    admin: "John Doe",
    icon: XCircle,
    iconBg: "bg-[#EF4444]/10",
    iconColor: "text-[#EF4444]",
  },
  {
    id: 3,
    message: "System maintenance scheduled for tonight from 2 AM to 4 AM",
    time: "Yesterday",
    admin: null,
    icon: Clock,
    iconBg: "bg-[#F59E0B]/10",
    iconColor: "text-[#F59E0B]",
  },
  {
    id: 4,
    message: "New admin user 'Sarah Johnson' has been added to the system",
    time: "2 days ago",
    admin: "John Doe",
    icon: Users,
    iconBg: "bg-[#0056D2]/10",
    iconColor: "text-[#0056D2]",
  },
]


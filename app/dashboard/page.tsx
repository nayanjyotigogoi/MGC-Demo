import Link from "next/link"
import {
  BarChart3,
  Calendar,
  Clock,
  Eye,
  FileText,
  MapPin,
  Plus,
  ThumbsUp,
  Ticket,
  TrendingUp,
  Upload,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, Acme Corporation! 👋</h1>
          <p className="text-gray-500">Here's what's happening with your events today.</p>
        </div>
        <Button className="rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90">
          <Upload className="h-4 w-4 mr-2" />
          Upload New Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-[#32D3A7]/20 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Events</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">24</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#32D3A7]/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-[#32D3A7]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[#FFC947]/20 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">8,642</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#FFC947]/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-[#FFC947]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+18%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[#FF6B81]/20 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Registrations</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">1,245</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#FF6B81]/10 flex items-center justify-center">
                <Ticket className="h-6 w-6 text-[#FF6B81]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+24%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[#6C5DD3]/20 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Followers</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">568</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-[#6C5DD3]/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#6C5DD3]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+8%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-[#32D3A7]/20 col-span-1 md:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-800">Upcoming Events</CardTitle>
            <CardDescription>Your next 3 events that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center border border-gray-200">
                    <Calendar className="h-6 w-6 text-[#FF6B81]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 truncate">{event.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="rounded-lg h-8 text-xs bg-[#32D3A7] hover:bg-[#32D3A7]/90">
                      <FileText className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full rounded-xl border-dashed border-2 border-gray-300 hover:border-[#6C5DD3] hover:text-[#6C5DD3] py-6"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Event
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[#FF9F7F]/20 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-800">Event Performance</CardTitle>
            <CardDescription>Top performing events this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topEvents.map((event) => (
                <div key={event.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 truncate">{event.title}</p>
                    <span className="text-xs font-medium text-gray-500">{event.percentage}%</span>
                  </div>
                  <Progress value={event.percentage} className="h-2 bg-gray-100" indicatorClassName={event.color} />
                </div>
              ))}

              <Link href="/dashboard/analytics">
                <Button
                  variant="ghost"
                  className="w-full rounded-xl text-[#6C5DD3] hover:bg-[#6C5DD3]/10 hover:text-[#6C5DD3] mt-2"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-2xl border-[#6C5DD3]/20 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-800">Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </div>
            <Tabs defaultValue="all" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3 h-8 bg-gray-100 rounded-lg p-1">
                <TabsTrigger value="all" className="rounded-md text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="comments" className="rounded-md text-xs">
                  Comments
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
                  className={`h-10 w-10 rounded-full ${activity.iconBg} flex items-center justify-center flex-shrink-0`}
                >
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{activity.time}</span>
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
const upcomingEvents = [
  {
    id: 1,
    title: "Guwahati Food Festival 2023",
    date: "Aug 15, 2023 • 10:00 AM",
    location: "Nehru Stadium, Guwahati",
    status: "Approved",
  },
  {
    id: 2,
    title: "Tech Conference: Future of AI",
    date: "Aug 22, 2023 • 9:30 AM",
    location: "IIT Guwahati Campus",
    status: "Pending",
  },
  {
    id: 3,
    title: "Cultural Night: Bihu Special",
    date: "Sep 5, 2023 • 6:00 PM",
    location: "Shilpgram, Guwahati",
    status: "Approved",
  },
]

const topEvents = [
  {
    id: 1,
    title: "Guwahati Food Festival 2023",
    percentage: 85,
    color: "bg-[#32D3A7]",
  },
  {
    id: 2,
    title: "Music Concert: Local Artists",
    percentage: 72,
    color: "bg-[#FFC947]",
  },
  {
    id: 3,
    title: "Tech Conference: Future of AI",
    percentage: 64,
    color: "bg-[#FF6B81]",
  },
  {
    id: 4,
    title: "Cultural Night: Bihu Special",
    percentage: 58,
    color: "bg-[#6C5DD3]",
  },
]

const activities = [
  {
    id: 1,
    message: "Your event 'Guwahati Food Festival 2023' has been approved by the admin.",
    time: "2 hours ago",
    icon: ThumbsUp,
    iconBg: "bg-[#32D3A7]/10",
    iconColor: "text-[#32D3A7]",
  },
  {
    id: 2,
    message: "User 'Rahul Sharma' commented on your event 'Tech Conference: Future of AI'.",
    time: "5 hours ago",
    icon: MessageSquare,
    iconBg: "bg-[#6C5DD3]/10",
    iconColor: "text-[#6C5DD3]",
  },
  {
    id: 3,
    message: "Your event 'Cultural Night: Bihu Special' has received 15 new registrations.",
    time: "Yesterday",
    icon: Users,
    iconBg: "bg-[#FFC947]/10",
    iconColor: "text-[#FFC947]",
  },
  {
    id: 4,
    message: "System maintenance scheduled for tonight from 2 AM to 4 AM.",
    time: "Yesterday",
    icon: Settings,
    iconBg: "bg-[#FF6B81]/10",
    iconColor: "text-[#FF6B81]",
  },
]


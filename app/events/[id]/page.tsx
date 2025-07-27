"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Heart,
  User,
  Users,
  Building,
  ChevronRight,
  Ticket,
  Info,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([])

  useEffect(() => {
    // Simulate API call to fetch event details
    const fetchEvent = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from an API
        // For this demo, we'll use the sample data
        const foundEvent = allEvents.find((e) => e.id.toString() === eventId)

        if (foundEvent) {
          setEvent(foundEvent)

          // Find related events (same category)
          const related = allEvents
            .filter((e) => e.category === foundEvent.category && e.id !== foundEvent.id)
            .slice(0, 3)
          setRelatedEvents(related)
        } else {
          // Handle event not found
          console.error("Event not found")
        }
      } catch (error) {
        console.error("Error fetching event:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] to-[#E3F2FD] text-gray-800 font-sans flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-4 border-[#6C5DD3] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] to-[#E3F2FD] text-gray-800 font-sans flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-500 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button
            className="rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const isPastEvent = new Date(event.date.split(",")[1] || event.date) < new Date()

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
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden md:inline">Back</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={1200}
            height={400}
            className="w-full h-[300px] md:h-[400px] object-cover"
          />

          {/* Event badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
            <Badge className="bg-white/80 backdrop-blur-sm text-gray-800">
              {event.emoji} {event.category}
            </Badge>
            {event.featured && (
              <Badge className="bg-gradient-to-r from-[#FF6B81] to-[#FFC947] text-white">Featured</Badge>
            )}
            {isPastEvent && <Badge className="bg-[#FF6B81]/90 text-white">Past Event</Badge>}
          </div>

          {/* Event title and basic info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{event.time || "7:00 PM"}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {!isPastEvent && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90">
                  <Ticket className="h-4 w-4 mr-2" />
                  Register Now
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-xl">
                <DialogHeader>
                  <DialogTitle>Register for {event.title}</DialogTitle>
                  <DialogDescription>Fill in your details to register for this event.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional notes (optional)</Label>
                    <Textarea id="notes" placeholder="Any special requirements or questions?" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90"
                  >
                    Complete Registration
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <Button
            variant="outline"
            className={`rounded-xl ${isFavorite ? "bg-[#FF6B81]/10 text-[#FF6B81] border-[#FF6B81]" : ""}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-[#FF6B81]" : ""}`} />
            {isFavorite ? "Saved" : "Save"}
          </Button>

          <Button variant="outline" className="rounded-xl">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="rounded-xl border-[#32D3A7]/20 overflow-hidden">
              <CardContent className="p-6">
                <Tabs defaultValue="about">
                  <TabsList className="grid w-full grid-cols-3 h-10 bg-gray-100 rounded-lg p-1 mb-6">
                    <TabsTrigger value="about" className="rounded-md">
                      About
                    </TabsTrigger>
                    <TabsTrigger value="schedule" className="rounded-md">
                      Schedule
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="rounded-md">
                      Gallery
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-3">About This Event</h2>
                      <p className="text-gray-600">
                        {event.description ||
                          `Join us for an amazing ${event.category} event in the heart of Guwahati! 
                        ${event.title} promises to be an unforgettable experience with activities for all ages.
                        
                        This event will feature the best of local talent, delicious food, and a vibrant atmosphere.
                        Don't miss out on this opportunity to connect with the community and enjoy a day filled with fun and excitement.`}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">What to Expect</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Interactive sessions and workshops</li>
                        <li>Networking opportunities with like-minded individuals</li>
                        <li>Refreshments and snacks provided</li>
                        <li>Certificate of participation</li>
                      </ul>
                    </div>

                    <div className="flex items-start gap-2 p-3 rounded-lg bg-[#FFC947]/10 text-gray-700">
                      <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-[#FFC947]" />
                      <div>
                        <p className="text-sm font-medium">Important Information</p>
                        <p className="text-xs mt-1">
                          Please arrive 15 minutes before the event starts. Bring a valid ID for registration.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Event Schedule</h2>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-24 text-center">
                          <div className="bg-[#6C5DD3]/10 text-[#6C5DD3] font-medium rounded-lg py-1">
                            {event.time?.split(" ")[0] || "10:00 AM"}
                          </div>
                        </div>
                        <div className="flex-1 border-l-2 border-gray-200 pl-4 pb-6">
                          <h3 className="font-medium text-gray-800">Registration & Welcome</h3>
                          <p className="text-sm text-gray-600 mt-1">Check-in and welcome kit distribution</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-24 text-center">
                          <div className="bg-[#32D3A7]/10 text-[#32D3A7] font-medium rounded-lg py-1">11:00 AM</div>
                        </div>
                        <div className="flex-1 border-l-2 border-gray-200 pl-4 pb-6">
                          <h3 className="font-medium text-gray-800">Opening Ceremony</h3>
                          <p className="text-sm text-gray-600 mt-1">Introduction and keynote speech</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-24 text-center">
                          <div className="bg-[#FF6B81]/10 text-[#FF6B81] font-medium rounded-lg py-1">12:30 PM</div>
                        </div>
                        <div className="flex-1 border-l-2 border-gray-200 pl-4 pb-6">
                          <h3 className="font-medium text-gray-800">Lunch Break</h3>
                          <p className="text-sm text-gray-600 mt-1">Networking lunch with participants</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-24 text-center">
                          <div className="bg-[#FFC947]/10 text-[#FFC947] font-medium rounded-lg py-1">2:00 PM</div>
                        </div>
                        <div className="flex-1 border-l-2 border-gray-200 pl-4">
                          <h3 className="font-medium text-gray-800">Main Event</h3>
                          <p className="text-sm text-gray-600 mt-1">Featured performances and activities</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Event Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=200&width=200&text=Gallery+${i + 1}`}
                            alt={`Gallery image ${i + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizer Card */}
            <Card className="rounded-xl border-[#32D3A7]/20 overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Organizer</h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Building className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{event.organizer || "Acme Corporation"}</h3>
                    <p className="text-xs text-gray-500">Event Organizer</p>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-800">contact@acmecorp.com</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Phone:</span>
                    <span className="text-gray-800">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Website:</span>
                    <a href="#" className="text-[#6C5DD3] hover:underline flex items-center">
                      Visit <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
                <Button className="w-full rounded-lg mt-4 bg-white border border-[#6C5DD3] text-[#6C5DD3] hover:bg-[#6C5DD3]/10">
                  View Organizer Profile
                </Button>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="rounded-xl border-[#32D3A7]/20 overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden mb-4 aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=200&width=300&text=Map"
                    alt="Event location map"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-800">{event.location}</h3>
                <p className="text-sm text-gray-500 mb-4">Guwahati, Assam, India</p>
                <Button className="w-full rounded-lg bg-white border border-[#32D3A7] text-[#32D3A7] hover:bg-[#32D3A7]/10">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            {/* Attendees Card */}
            {/* <Card className="rounded-xl border-[#32D3A7]/20 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Attendees</h2>
                  <Badge className="bg-[#32D3A7]/10 text-[#32D3A7] hover:bg-[#32D3A7]/20">
                    <Users className="h-3 w-3 mr-1" />
                    {event.attendees || 120}
                  </Badge>
                </div>
                <div className="flex -space-x-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=32&width=32&text=${i + 1}`}
                        alt={`Attendee ${i + 1}`}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-[#6C5DD3] flex items-center justify-center text-xs text-white">
                    +{(event.attendees || 120) - 5}
                  </div>
                </div>
                <Button className="w-full rounded-lg bg-white border border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81]/10">
                  <User className="h-4 w-4 mr-2" />
                  View Attendees
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="space-y-4 mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Similar Events</h2>
              <Button variant="ghost" className="text-[#6C5DD3] hover:text-[#6C5DD3]/80 gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <Link key={relatedEvent.id} href={`/events/${relatedEvent.id}`}>
                  <Card className="overflow-hidden rounded-xl border-[#32D3A7]/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={relatedEvent.image || "/placeholder.svg"}
                          alt={relatedEvent.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        {relatedEvent.featured && (
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-[#FF6B81] to-[#FFC947] text-white">
                            Featured
                          </Badge>
                        )}
                        <div className="absolute bottom-2 left-2">
                          <Badge className="bg-white/80 backdrop-blur-sm text-gray-800">
                            {relatedEvent.emoji} {relatedEvent.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-[#6C5DD3] transition-colors">
                          {relatedEvent.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 mt-2">
                          <MapPin className="h-3 w-3 mr-1 text-[#FF6B81]" />
                          <span>{relatedEvent.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1 text-[#32D3A7]" />
                          <span>{relatedEvent.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
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
  organizer?: string
  attendees?: number
  description?: string
}

// Combined events from all sources
const allEvents: Event[] = [
  // Featured events
  {
    id: 1,
    title: "Bihu Festival 2023",
    category: "Arts",
    emoji: "🎭",
    location: "Nehru Stadium, Guwahati",
    date: "Apr 14-16, 2023",
    image: "/bihu-event.jpg?height=200&width=400",
    featured: true,
    organizer: "Assam Cultural Society",
    attendees: 1500,
    description:
      "Experience the vibrant celebration of Bihu, the traditional festival of Assam. This three-day cultural extravaganza will feature traditional Bihu dance performances, folk music, traditional games, and authentic Assamese cuisine. Join us to immerse yourself in the rich cultural heritage of Assam and celebrate the harvest season with joy and enthusiasm.",
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
    organizer: "Guwahati Music Club",
    attendees: 850,
  },

  // Upcoming events
  {
    id: 6,
    title: "Comedy Night Special",
    category: "Entertainment",
    emoji: "😂",
    location: "City Center Mall",
    date: "August, 5, 2023",
    time: "8:00 PM",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    organizer: "Laugh Factory",
    attendees: 200,
  },
  {
    id: 7,
    title: "Tech Conference 2023",
    category: "Tech",
    emoji: "💻",
    location: "IIT Guwahati",
    date: "August, 12-13, 2023",
    time: "9:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    organizer: "TechHub Guwahati",
    attendees: 450,
    description:
      "Join us for the biggest tech conference in Northeast India! Tech Conference 2023 brings together industry leaders, innovators, and tech enthusiasts to explore the latest trends and advancements in technology. The two-day event will feature keynote speeches, panel discussions, workshops, and networking opportunities. Whether you're a professional, student, or tech enthusiast, this conference offers valuable insights and connections in the tech world.",
  },

  // Past events
  {
    id: 11,
    title: "Photography Exhibition",
    category: "Arts",
    emoji: "📸",
    location: "State Museum",
    date: "March, 10-15, 2023",
    time: "10:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
    organizer: "Lens Art Association",
    attendees: 320,
    description:
      "Explore the beauty of Northeast India through the lens of talented local photographers. This exhibition showcases stunning landscapes, vibrant cultural moments, and candid street photography that captures the essence of life in Assam. Each photograph tells a unique story and offers a fresh perspective on familiar scenes.",
  },
  {
    id: 12,
    title: "Classical Music Concert",
    category: "Music",
    emoji: "🎵",
    location: "Rabindra Bhawan",
    date: "February, 25, 2023",
    time: "6:30 PM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    organizer: "Assam Music Society",
    attendees: 450,
  },
  {
    id: 13,
    title: "Book Fair 2023",
    category: "Literature",
    emoji: "📚",
    location: "Judges Field",
    date: "January, 5-15, 2023",
    time: "11:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    organizer: "Assam Publishers Association",
    attendees: 5000,
    description:
      "The annual Book Fair brings together publishers, authors, and book lovers from across the region. Explore thousands of titles across genres, attend book launches, participate in author meet-and-greets, and enjoy literary discussions. Special activities for children make this a perfect family event.",
  },
]


"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Calendar,
  User,
  ChevronDown,
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mobile";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] to-[#E3F2FD] text-gray-800 font-sans">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#32D3A7]/20 px-4 py-3 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#FFC947] to-[#FF6B81] flex items-center justify-center">
                {/* <span className="text-white font-bold text-lg">M</span> */}
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#FFC947] to-[#FF6B81] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/Logo_Final1.PNG" // make sure logo.png is in your `public/` folder
                    alt="Logo"
                    width={60} // adjust size if needed
                    height={42}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-lg bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] bg-clip-text text-transparent">
                  MyGuwahatiCity
                </h1>
                <p className="text-xs text-gray-500">Discover Events</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search events, venues, or artists..."
                className="pl-10 pr-4 py-2 rounded-full border-[#32D3A7]/30 focus-visible:ring-[#6C5DD3]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-white">
                <div className="flex flex-col gap-6 pt-6">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#FFC947] to-[#FF6B81] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div>
                      <h1 className="font-bold text-lg bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] bg-clip-text text-transparent">
                        My Guwahati City
                      </h1>
                      <p className="text-xs text-gray-500">Discover Events</p>
                    </div>
                  </Link>

                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-gray-500">MENU</h3>
                    <div className="space-y-2">
                      <Link
                        href="#"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                      >
                        <MapPin className="h-4 w-4 text-[#FF6B81]" />
                        <span>Explore Map</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                      >
                        <Calendar className="h-4 w-4 text-[#32D3A7]" />
                        <span>All Events</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                      >
                        <User className="h-4 w-4 text-[#6C5DD3]" />
                        <span>My Profile</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="sm">
                  <Avatar className="h-8 w-8 border-2 border-[#32D3A7]">
                    <AvatarImage
                      src="/logo_3.jpg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback className="bg-[#FFC947] text-white">
                      MG
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <Link href="/dashboard/profile" className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-[#6C5DD3]" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg cursor-pointer text-[#FF6B81]">
                  <X className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-3 bg-white/50 border-b border-[#32D3A7]/20">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search events, venues, or artists..."
            className="pl-10 pr-4 py-2 rounded-full border-[#32D3A7]/30 focus-visible:ring-[#6C5DD3]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white/50 px-4 py-3 border-b border-[#32D3A7]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border-[#FF6B81]/30 hover:bg-[#FF6B81]/10 hover:text-[#FF6B81]",
              selectedFilters.includes("music") &&
                "bg-[#FF6B81]/10 text-[#FF6B81] border-[#FF6B81]"
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
              selectedFilters.includes("arts") &&
                "bg-[#32D3A7]/10 text-[#32D3A7] border-[#32D3A7]"
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
              selectedFilters.includes("food") &&
                "bg-[#FFC947]/10 text-[#FFC947] border-[#FFC947]"
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
              selectedFilters.includes("sports") &&
                "bg-[#6C5DD3]/10 text-[#6C5DD3] border-[#6C5DD3]"
            )}
            onClick={() => toggleFilter("sports")}
          >
            <span className="mr-1">⚽</span> Sports
          </Button>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full">
              <MapPin className="h-4 w-4 mr-1 text-[#FF6B81]" />
              <span className="text-sm">Guwahati</span>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Calendar className="h-4 w-4 mr-1 text-[#32D3A7]" />
              <span className="text-sm">This Week</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        {isMobile ? <MobileView /> : <DesktopView />}
      </main>
    </div>
  );
}

function DesktopView() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Sidebar - Featured Events */}
      <div className="col-span-3 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-800">Featured Events</h2>
          <Link href="/events/featured">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#6C5DD3] hover:text-[#6C5DD3]/80"
            >
              View All
            </Button>
          </Link>
        </div>

        <div className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 pb-4">
          {featuredEvents.map((event) => (
            <FeaturedEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Center - Interactive Map */}
      <div className="col-span-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#32D3A7]/20 h-[calc(100vh-220px)]">
          <div className="relative w-full h-full">
            <Image
              src="/placeholder.jpg?height=800&width=600"
              alt="Map of Guwahati"
              fill
              className="object-cover"
            />

            {/* Map Markers */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker type="premium" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker type="mid" />
            </div>
            <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker type="basic" />
            </div>
            <div className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker type="mid" />
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button
                size="icon"
                className="rounded-full bg-white text-gray-700 shadow-lg hover:bg-gray-100"
              >
                <span className="text-xl">+</span>
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-white text-gray-700 shadow-lg hover:bg-gray-100"
              >
                <span className="text-xl">-</span>
              </Button>
            </div>

            {/* Map Legend */}
            {/* <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
              <div className="text-xs font-medium mb-2">Event Types</div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🍍</span>
                  <span className="text-xs">Premium Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">🍓</span>
                  <span className="text-xs">Mid-tier Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">🍊</span>
                  <span className="text-xs">Basic Events</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Upcoming & Past Events */}
      <div className="col-span-3 space-y-4">
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex items-center justify-between mb-2">
            <TabsList className="grid w-full grid-cols-2 h-9 bg-gray-100 rounded-lg p-1">
              <TabsTrigger
                value="upcoming"
                className="rounded-md data-[state=active]:bg-[#32D3A7] data-[state=active]:text-white"
              >
                <span className="mr-1">🍃</span> Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="rounded-md data-[state=active]:bg-[#FF6B81] data-[state=active]:text-white"
              >
                <span className="mr-1">⏳</span> Past
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="upcoming"
            className="mt-0 space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 pb-4"
          >
            {upcomingEvents.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
            <Link href="/events/upcoming">
              <Button className="w-full rounded-xl bg-gradient-to-r from-[#FFC947] to-[#FF6B81] text-white hover:opacity-90 hover:scale-[1.02] transition-all">
                View All Upcoming Events
              </Button>
            </Link>
          </TabsContent>

          <TabsContent
            value="past"
            className="mt-0 space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 pb-4"
          >
            {pastEvents.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
            <Link href="/events/past">
              <Button className="w-full rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#32D3A7] text-white hover:opacity-90 hover:scale-[1.02] transition-all">
                View All Past Events
              </Button>
            </Link>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MobileView() {
  return (
    <div className="space-y-6">
      {/* Featured Events */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">Featured Events</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#6C5DD3] hover:text-[#6C5DD3]/80"
          >
            View All
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-3 snap-x">
          {featuredEvents.map((event) => (
            <div key={event.id} className="min-w-[280px] snap-start">
              <FeaturedEventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Map Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">Explore Map</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#32D3A7] hover:text-[#32D3A7]/80"
          >
            Full Map
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#32D3A7]/20 h-[200px]">
          <div className="relative w-full h-full">
            <Image
              src="/placeholder.jpg?height=400&width=800"
              alt="Map of Guwahati"
              fill
              className="object-cover"
            />

            {/* Map Markers */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker type="premium" small />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker type="mid" small />
            </div>
            <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <MapMarker type="basic" small />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming & Past Events */}
      <div>
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex items-center justify-between mb-3">
            <TabsList className="grid w-full grid-cols-2 h-9 bg-gray-100 rounded-lg p-1">
              <TabsTrigger
                value="upcoming"
                className="rounded-md data-[state=active]:bg-[#32D3A7] data-[state=active]:text-white"
              >
                <span className="mr-1">🍃</span> Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="rounded-md data-[state=active]:bg-[#FF6B81] data-[state=active]:text-white"
              >
                <span className="mr-1">⏳</span> Past
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="mt-0 space-y-3">
            {upcomingEvents.slice(0, 3).map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
            <Button className="w-full rounded-xl bg-gradient-to-r from-[#FFC947] to-[#FF6B81] text-white hover:opacity-90 hover:scale-[1.02] transition-all">
              View All Upcoming Events
            </Button>
          </TabsContent>

          <TabsContent value="past" className="mt-0 space-y-3">
            {pastEvents.slice(0, 3).map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
            <Button className="w-full rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#32D3A7] text-white hover:opacity-90 hover:scale-[1.02] transition-all">
              View All Past Events
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function FeaturedEventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="overflow-hidden rounded-xl border-[#32D3A7]/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={300}
              height={150}
              className="w-full h-32 object-cover"
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
          <div className="p-3">
            <h3 className="font-bold text-gray-800 group-hover:text-[#6C5DD3] transition-colors">
              {event.title}
            </h3>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <MapPin className="h-3 w-3 mr-1 text-[#FF6B81]" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar className="h-3 w-3 mr-1 text-[#32D3A7]" />
              <span>{event.date}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function EventListItem({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="flex gap-3 p-2 rounded-xl hover:bg-white/50 transition-colors">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={event.image || "/placeholder.jpg"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-800 text-sm">{event.title}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="h-3 w-3 mr-1 text-[#FF6B81]" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Calendar className="h-3 w-3 mr-1 text-[#32D3A7]" />
            <span>{event.date}</span>
          </div>
        </div>
        <Badge className="self-start mt-1 bg-white text-gray-600 border border-gray-200">
          {event.emoji}
        </Badge>
      </div>
    </Link>
  );
}

// import Image from "next/image"

function MapMarker({
  type,
  small = false,
}: {
  type: "premium" | "mid" | "basic";
  small?: boolean;
}) {
  const size = small ? "h-8 w-8" : "h-12 w-12";
  const imageSize = small ? 20 : 32; // adjust based on your desired image size

  // Define image sources based on marker type
  const imageSrc =
    type === "premium"
      ? "art.jpg"
      : type === "mid"
      ? "bihu-event.jpg"
      : "option-3.jpg";

  const containerStyle =
    type === "premium"
      ? "rounded-lg bg-gradient-to-r from-[#FFC947] to-[#FF6B81]"
      : type === "mid"
      ? "rounded-full bg-white"
      : "rounded-full bg-white";

  return (
    <div
      className={`${size} ${containerStyle} flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}
    >
      <Image
        src={imageSrc}
        alt={`${type} marker`}
        width={imageSize}
        height={imageSize}
      />
    </div>
  );
}

// Sample data
type Event = {
  id: number;
  title: string;
  category: string;
  emoji: string;
  location: string;
  date: string;
  image: string;
};

const featuredEvents: Event[] = [
  {
    id: 1,
    title: "Bihu Festival 2023",
    category: "Cultural",
    emoji: "🎭",
    location: "Nehru Stadium, Guwahati",
    date: "Apr 14-16, 2023",
    image: "/bihu-event.jpg?height=150&width=300",
  },
  {
    id: 2,
    title: "Rock Music Festival",
    category: "Music",
    emoji: "🎵",
    location: "Shilpgram, Guwahati",
    date: "May 20-21, 2023",
    image: "/rock-event.jpg?height=150&width=300",
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    category: "Food",
    emoji: "🍔",
    location: "Brahmaputra Riverfront",
    date: "Jun 10-12, 2023",
    image: "/wine-festival.jpg?height=150&width=300",
  },
  {
    id: 4,
    title: "Guwahati Marathon",
    category: "Sports",
    emoji: "⚽",
    location: "City Center, Guwahati",
    date: "Jul 2, 2023",
    image: "/sports.jpg?height=150&width=300",
  },
  {
    id: 5,
    title: "Art Exhibition",
    category: "Arts",
    emoji: "🎭",
    location: "State Art Gallery",
    date: "Jul 15-20, 2023",
    image: "/art.jpg?height=150&width=300",
  },
];

const upcomingEvents: Event[] = [
  {
    id: 6,
    title: "Comedy Night Special",
    category: "Entertainment",
    emoji: "😂",
    location: "City Center Mall",
    date: "Aug 5, 2023",
    image: "/comedy-night.jpg?height=80&width=80",
  },
  {
    id: 7,
    title: "Tech Conference 2023",
    category: "Technology",
    emoji: "💻",
    location: "IIT Guwahati",
    date: "Aug 12-13, 2023",
    image: "/tech-conference.jpg?height=80&width=80",
  },
  {
    id: 8,
    title: "Pottery Workshop",
    category: "Arts",
    emoji: "🎭",
    location: "Crafts Village",
    date: "Aug 19, 2023",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 9,
    title: "Yoga in the Park",
    category: "Wellness",
    emoji: "🧘",
    location: "Dighalipukhuri Park",
    date: "Aug 26, 2023",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 10,
    title: "Street Food Festival",
    category: "Food",
    emoji: "🍔",
    location: "Fancy Bazaar",
    date: "Sep 2-3, 2023",
    image: "/food-festival.jpg?height=80&width=80",
  },
];

const pastEvents: Event[] = [
  {
    id: 11,
    title: "Photography Exhibition",
    category: "Arts",
    emoji: "📸",
    location: "State Museum",
    date: "Mar 10-15, 2023",
    image: "/photography.jpg?height=80&width=80",
  },
  {
    id: 12,
    title: "Classical Music Concert",
    category: "Music",
    emoji: "🎵",
    location: "Rabindra Bhawan",
    date: "Feb 25, 2023",
    image: "/classic-music.jpg?height=80&width=80",
  },
  {
    id: 13,
    title: "Book Fair 2023",
    category: "Literature",
    emoji: "📚",
    location: "Judges Field",
    date: "Jan 5-15, 2023",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 14,
    title: "Winter Carnival",
    category: "Entertainment",
    emoji: "❄️",
    location: "Assam State Zoo",
    date: "Dec 20-25, 2022",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 15,
    title: "New Year's Eve Party",
    category: "Entertainment",
    emoji: "🎉",
    location: "Brahmaputra Riverfront",
    date: "Dec 31, 2022",
    image: "/new-year.jpg?height=80&width=80",
  },
];

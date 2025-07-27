import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Event = {
  id: number
  title: string
  category: string
  emoji: string
  location: string
  date: string
  image: string
  featured?: boolean
}

export function EventCard({ event }: { event: Event }) {
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
            {event.featured && (
              <Badge className="absolute top-2 right-2 bg-gradient-to-r from-[#FF6B81] to-[#FFC947] text-white">
                Featured
              </Badge>
            )}
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
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}


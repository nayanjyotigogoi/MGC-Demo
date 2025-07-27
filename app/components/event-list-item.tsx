import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type Event = {
  id: number
  title: string
  category: string
  emoji: string
  location: string
  date: string
  image: string
}

export function EventListItem({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`} className="block">
      <div className="flex gap-3 p-2 rounded-xl hover:bg-white/50 transition-colors">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
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
        <Badge className="self-start mt-1 bg-white text-gray-600 border border-gray-200">{event.emoji}</Badge>
      </div>
    </Link>
  )
}


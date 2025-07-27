import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-[#6C5DD3]" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  )
}


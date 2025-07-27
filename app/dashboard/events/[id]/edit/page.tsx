"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Info,
  MapPin,
  Plus,
  Save,
  Tag,
  Trash,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [documents, setDocuments] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call to fetch event details
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from an API
        // For this demo, we'll use the sample data
        const foundEvent = events.find((e) => e.id.toString() === eventId);

        if (foundEvent) {
          setTitle(foundEvent.title);
          setDescription(foundEvent.description || "");
          setCategory(foundEvent.category);
          setLocation(foundEvent.location);
          setOrganizer(foundEvent.organizer || "Acme Corporation");
          setPosterPreview(foundEvent.image);
          setTime(foundEvent.time || "");

          // Parse date string to Date object
          if (foundEvent.date) {
            const dateParts = foundEvent.date.split(",")[0].split(" ");
            if (dateParts.length > 1) {
              const month = new Date(`${dateParts[0]} 1, 2023`).getMonth();
              const day = Number.parseInt(dateParts[1].replace(",", ""));
              const year = Number.parseInt(dateParts[2] || "2023");
              setDate(new Date(year, month, day));
            }
          }

          // Set tags if available
          if (foundEvent.tags) {
            setTags(foundEvent.tags);
          }

          // Set documents if available
          if (foundEvent.documents) {
            setDocuments(foundEvent.documents);
          } else {
            // Default documents
            setDocuments(["Event Proposal.pdf", "Venue Booking.pdf"]);
          }
        } else {
          // Handle event not found
          console.error("Event not found");
          router.push("/dashboard/events");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, router]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just create a local URL
      const url = URL.createObjectURL(file);
      setPosterPreview(url);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just add the filename
      setDocuments([...documents, file.name]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call to update event
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccessDialog(true);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1]/50 to-[#E3F2FD]/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-4 border-[#6C5DD3] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1]/50 to-[#E3F2FD]/50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Edit Event</h1>
              <p className="text-sm text-gray-500 hidden md:block">
                Update your event details
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-lg"
              onClick={() => router.push(`/events/${eventId}`)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-[#32D3A7] hover:bg-[#32D3A7]/90 text-white"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <Card className="rounded-xl border-gray-200 hover:shadow-md transition-shadow lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">
                  Event Details
                </CardTitle>
                <CardDescription>
                  Update information about your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="eventName" className="text-sm font-medium">
                    Event Name <span className="text-[#FF6B81]">*</span>
                  </Label>
                  <Input
                    id="eventName"
                    placeholder="Enter event name"
                    className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description <span className="text-[#FF6B81]">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event"
                    className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3] min-h-[150px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Provide a detailed description of your event</span>
                    <span>{description.length}/2000</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category <span className="text-[#FF6B81]">*</span>
                    </Label>
                    <Select
                      value={category}
                      onValueChange={setCategory}
                      required
                    >
                      <SelectTrigger
                        id="category"
                        className="rounded-lg border-gray-200"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Music">🎵 Music</SelectItem>
                        <SelectItem value="Arts">🎭 Arts & Culture</SelectItem>
                        <SelectItem value="Food">🍔 Food & Drinks</SelectItem>
                        <SelectItem value="Sports">⚽ Sports</SelectItem>
                        <SelectItem value="Tech">💻 Technology</SelectItem>
                        <SelectItem value="Literature">
                          📚 Literature
                        </SelectItem>
                        <SelectItem value="Entertainment">
                          😂 Entertainment
                        </SelectItem>
                        <SelectItem value="Wellness">🧘 Wellness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizer" className="text-sm font-medium">
                      Organizer <span className="text-[#FF6B81]">*</span>
                    </Label>
                    <Input
                      id="organizer"
                      placeholder="Enter organizer name"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Date & Time <span className="text-[#FF6B81]">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "rounded-lg border-gray-200 justify-start text-left font-normal",
                              !date && "text-gray-400"
                            )}
                          >
                            <Calendar className="h-4 w-4 mr-2 text-[#FF6B81]" />
                            {date ? date.toLocaleDateString() : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 rounded-xl"
                          align="start"
                        >
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="rounded-lg border-gray-200">
                          <SelectValue placeholder="Time" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                          <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                          <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                          <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                          <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                          <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location <span className="text-[#FF6B81]">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        placeholder="Enter event location"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-lg border-gray-200"
                      >
                        <MapPin className="h-4 w-4 text-[#32D3A7]" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-sm font-medium">
                    Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add tags (press Enter)"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-lg border-gray-200"
                      onClick={handleAddTag}
                    >
                      <Tag className="h-4 w-4 text-[#6C5DD3]" />
                    </Button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="rounded-lg bg-[#6C5DD3]/10 text-[#6C5DD3] hover:bg-[#6C5DD3]/20"
                        >
                          {tag}
                          <button
                            type="button"
                            className="ml-1 hover:text-[#FF6B81]"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Tabs defaultValue="schedule" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-100 rounded-lg p-1 mb-4">
                    <TabsTrigger value="schedule" className="rounded-md">
                      Schedule
                    </TabsTrigger>
                    <TabsTrigger value="additional" className="rounded-md">
                      Additional Info
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="schedule" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="schedule" className="text-sm font-medium">
                        Event Schedule
                      </Label>
                      <Textarea
                        id="schedule"
                        placeholder="Provide a detailed schedule of your event"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3] min-h-[150px]"
                        defaultValue="10:00 AM - Registration & Welcome
                        11:00 AM - Opening Ceremony
                        12:30 PM - Lunch Break
                        2:00 PM - Main Event"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="additional" className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="additionalInfo"
                        className="text-sm font-medium"
                      >
                        Additional Information
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any additional information about your event"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3] min-h-[150px]"
                        defaultValue="Please arrive 15 minutes before the event starts. Bring a valid ID for registration."
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="rounded-xl border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800">
                    Upload Media
                  </CardTitle>
                  <CardDescription>
                    Add poster and documents for your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Event Poster <span className="text-[#FF6B81]">*</span>
                    </Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[#6C5DD3] transition-colors">
                      {posterPreview ? (
                        <div className="relative">
                          <Image
                            src={posterPreview || "/placeholder.svg"}
                            alt="Event poster preview"
                            width={300}
                            height={200}
                            className="mx-auto rounded-lg object-cover h-[200px]"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 rounded-full"
                            onClick={() => setPosterPreview(null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center gap-2 cursor-pointer py-4">
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            Click to upload poster
                          </span>
                          <span className="text-xs text-gray-500">
                            PNG, JPG or GIF (max. 5MB)
                          </span>
                          <Input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePosterUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Documents</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[#6C5DD3] transition-colors">
                      {documents.length > 0 ? (
                        <div className="space-y-2">
                          {documents.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                            >
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 text-[#6C5DD3] mr-2" />
                                <span className="text-sm truncate">{doc}</span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full hover:bg-gray-200"
                                onClick={() =>
                                  setDocuments(
                                    documents.filter((_, i) => i !== index)
                                  )
                                }
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          <label className="flex items-center justify-center gap-2 cursor-pointer py-2 text-sm text-[#6C5DD3] hover:underline">
                            <Plus className="h-4 w-4" />
                            <span>Add more documents</span>
                            <Input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={handleDocumentUpload}
                            />
                          </label>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center gap-2 cursor-pointer py-4">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            Click to upload documents
                          </span>
                          <span className="text-xs text-gray-500">
                            PDF, DOC or DOCX (max. 10MB)
                          </span>
                          <Input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleDocumentUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-[#FFC947]/10 text-gray-700 mb-4">
                    <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-[#FFC947]" />
                    <div>
                      <p className="text-sm font-medium">Event Status</p>
                      <p className="text-xs mt-1">
                        Your event will be reviewed by our team before it's
                        published.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-xl border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Changes Saved Successfully!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your event has been updated and is pending review.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#32D3A7]/20 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#32D3A7]"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button
              className="w-full rounded-xl bg-[#32D3A7] hover:bg-[#32D3A7]/90 text-white"
              onClick={() => router.push(`/events/${eventId}`)}
            >
              View Event
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => router.push("/dashboard/events")}
            >
              Back to Events
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  time?: string;
  image: string;
  featured: boolean;
  organizer?: string;
  description?: string;
  tags?: string[];
  documents?: string[];
};

const events: Event[] = [
  {
    id: 1,
    title: "Bihu Festival 2023",
    category: "Arts",
    emoji: "🎭",
    location: "Nehru Stadium, Guwahati",
    date: "Apr 14, 2023",
    time: "10:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    organizer: "Assam Cultural Society",
    description:
      "Experience the vibrant celebration of Bihu, the traditional festival of Assam. This three-day cultural extravaganza will feature traditional Bihu dance performances, folk music, traditional games, and authentic Assamese cuisine.",
    tags: ["Cultural", "Festival", "Dance", "Music"],
    documents: [
      "Event Proposal.pdf",
      "Venue Booking.pdf",
      "Performer List.pdf",
    ],
  },
  {
    id: 2,
    title: "Rock Music Festival",
    category: "Music",
    emoji: "🎵",
    location: "Shilpgram, Guwahati",
    date: "May 20, 2023",
    time: "5:00 PM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    organizer: "Guwahati Music Club",
    description:
      "Join us for an electrifying rock music festival featuring local and national bands. Experience the energy of live performances, great food, and a vibrant atmosphere.",
    tags: ["Music", "Rock", "Festival", "Live"],
    documents: ["Event Proposal.pdf", "Artist Lineup.pdf", "Safety Plan.pdf"],
  },
  {
    id: 7,
    title: "Tech Conference 2023",
    category: "Tech",
    emoji: "💻",
    location: "IIT Guwahati",
    date: "August 12, 2023",
    time: "9:00 AM",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    organizer: "TechHub Guwahati",
    description:
      "Join us for the biggest tech conference in Northeast India! Tech Conference 2023 brings together industry leaders, innovators, and tech enthusiasts to explore the latest trends and advancements in technology.",
    tags: ["Technology", "Conference", "Innovation", "Networking"],
    documents: ["Conference Agenda.pdf", "Speaker Profiles.pdf"],
  },
];

"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Calendar, FileText, Info, MapPin, Plus, Tag, Upload, X, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function SuccessCard() {
  return (
    <Card className="rounded-2xl border-[#32D3A7]/20 hover:shadow-md transition-shadow">
      <CardContent className="pt-6 pb-4 px-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#32D3A7]/20 flex items-center justify-center mb-4">
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

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Submitted Successfully!</h2>
        <p className="text-gray-500 mb-6">
          Your event has been submitted for review. We'll notify you once it's approved.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
          <Button className="rounded-xl bg-[#32D3A7] hover:bg-[#32D3A7]/90 text-white">
            <Eye className="h-4 w-4 mr-2" />
            View Event
          </Button>
          <Button variant="outline" className="rounded-xl border-[#6C5DD3] text-[#6C5DD3] hover:bg-[#6C5DD3]/10">
            <Plus className="h-4 w-4 mr-2" />
            Add Another
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function UploadPage() {
  const [date, setDate] = useState<Date>()
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [posterPreview, setPosterPreview] = useState<string | null>(null)
  const [documents, setDocuments] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just create a local URL
      const url = URL.createObjectURL(file)
      setPosterPreview(url)
    }
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just create a local URL
      setDocuments([...documents, file.name])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Upload Event</h1>
        <p className="text-gray-500">Create a new event and publish it to the platform</p>
      </div>

      {isSuccess ? (
        <SuccessCard />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <Card className="rounded-2xl border-[#32D3A7]/20 hover:shadow-md transition-shadow lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">Event Details</CardTitle>
                <CardDescription>Fill in the details about your event</CardDescription>
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
                    required
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Provide a detailed description of your event</span>
                    <span>0/2000</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category <span className="text-[#FF6B81]">*</span>
                    </Label>
                    <Select required>
                      <SelectTrigger id="category" className="rounded-lg border-gray-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="music">🎵 Music</SelectItem>
                        <SelectItem value="arts">🎭 Arts & Culture</SelectItem>
                        <SelectItem value="food">🍔 Food & Drinks</SelectItem>
                        <SelectItem value="sports">⚽ Sports</SelectItem>
                        <SelectItem value="tech">💻 Technology</SelectItem>
                        <SelectItem value="business">💼 Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                              !date && "text-gray-400",
                            )}
                          >
                            <Calendar className="h-4 w-4 mr-2 text-[#FF6B81]" />
                            {date ? date.toLocaleDateString() : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                          <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>

                      <Select>
                        <SelectTrigger className="rounded-lg border-gray-200">
                          <SelectValue placeholder="Time" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="9:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="19:00">7:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                      required
                    />
                    <Button type="button" variant="outline" className="rounded-lg border-gray-200">
                      <MapPin className="h-4 w-4 text-[#32D3A7]" />
                    </Button>
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
                          e.preventDefault()
                          handleAddTag()
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
                        <Badge key={tag} className="rounded-lg bg-[#6C5DD3]/10 text-[#6C5DD3] hover:bg-[#6C5DD3]/20">
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
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="rounded-2xl border-[#FF9F7F]/20 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800">Upload Media</CardTitle>
                  <CardDescription>Add poster and documents for your event</CardDescription>
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
                          <span className="text-sm font-medium text-gray-700">Click to upload poster</span>
                          <span className="text-xs text-gray-500">PNG, JPG or GIF (max. 5MB)</span>
                          <Input type="file" className="hidden" accept="image/*" onChange={handlePosterUpload} />
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
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 text-[#6C5DD3] mr-2" />
                                <span className="text-sm truncate">{doc}</span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full hover:bg-gray-200"
                                onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
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
                          <span className="text-sm font-medium text-gray-700">Click to upload documents</span>
                          <span className="text-xs text-gray-500">PDF, DOC or DOCX (max. 10MB)</span>
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

              <Card className="rounded-2xl border-[#32D3A7]/20 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800">Publish Event</CardTitle>
                  <CardDescription>Review and submit your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-[#FFC947]/10 text-[#FFC947]">
                    <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Event Review Process</p>
                      <p className="text-xs mt-1">
                        Your event will be reviewed by our team before it's published on the platform.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90 h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Submit Event
                        </>
                      )}
                    </Button>

                    <div className="flex justify-center mt-4">
                      <Button type="button" variant="ghost" className="text-gray-500 hover:text-gray-700">
                        Save as Draft
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}


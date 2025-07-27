"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Camera, FileText, Globe, Info, Save, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrganizationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Organization Details</h1>
        <p className="text-gray-500">Manage your organization information and verification documents</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <Card className="rounded-2xl border-[#32D3A7]/20 hover:shadow-md transition-shadow lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Business Information</CardTitle>
              <CardDescription>Update your organization's business details</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-10 bg-gray-100 rounded-lg p-1">
                  <TabsTrigger value="basic" className="rounded-md">
                    Basic Info
                  </TabsTrigger>
                  <TabsTrigger value="legal" className="rounded-md">
                    Legal Info
                  </TabsTrigger>
                  <TabsTrigger value="social" className="rounded-md">
                    Social & Web
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-sm font-medium">
                        Business Name <span className="text-[#FF6B81]">*</span>
                      </Label>
                      <Input
                        id="businessName"
                        placeholder="Enter business name"
                        defaultValue="Acme Corporation"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType" className="text-sm font-medium">
                        Business Type <span className="text-[#FF6B81]">*</span>
                      </Label>
                      <Select required defaultValue="company">
                        <SelectTrigger id="businessType" className="rounded-lg border-gray-200">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="individual">Individual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Business Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your business"
                      defaultValue="Acme Corporation is a leading event organizer in Guwahati, specializing in cultural, tech, and food festivals."
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3] min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number <span className="text-[#FF6B81]">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        defaultValue="+91 98765 43210"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address <span className="text-[#FF6B81]">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        defaultValue="admin@acmecorp.com"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Address <span className="text-[#FF6B81]">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Enter business address"
                      defaultValue="123 Main Street, Guwahati, Assam, India - 781001"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-[#FF6B81]">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="City"
                        defaultValue="Guwahati"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium">
                        State <span className="text-[#FF6B81]">*</span>
                      </Label>
                      <Input
                        id="state"
                        placeholder="State"
                        defaultValue="Assam"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode" className="text-sm font-medium">
                        Pincode <span className="text-[#FF6B81]">*</span>
                      </Label>
                      <Input
                        id="pincode"
                        placeholder="Pincode"
                        defaultValue="781001"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                        required
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="legal" className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="panNumber" className="text-sm font-medium">
                        PAN Number <span className="text-[#FF6B81]">*</span>
                      </Label>
                      <Input
                        id="panNumber"
                        placeholder="Enter PAN number"
                        defaultValue="ABCDE1234F"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gstNumber" className="text-sm font-medium">
                        GST Number
                      </Label>
                      <Input
                        id="gstNumber"
                        placeholder="Enter GST number"
                        defaultValue="22AAAAA0000A1Z5"
                        className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regNumber" className="text-sm font-medium">
                      Registration Number
                    </Label>
                    <Input
                      id="regNumber"
                      placeholder="Enter registration number"
                      defaultValue="REG123456789"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-[#FFC947]/10 text-[#FFC947]">
                    <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Verification Required</p>
                      <p className="text-xs mt-1">
                        Please upload your business registration documents for verification. This helps us maintain a
                        trusted platform.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="social" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium">
                      Website
                    </Label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
                        <Globe className="h-4 w-4 text-gray-500" />
                      </div>
                      <Input
                        id="website"
                        placeholder="https://example.com"
                        defaultValue="https://acmecorp.com"
                        className="rounded-none rounded-r-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="text-sm font-medium">
                      Facebook
                    </Label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
                        <svg className="h-4 w-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                        </svg>
                      </div>
                      <Input
                        id="facebook"
                        placeholder="Facebook username or page"
                        defaultValue="acmecorp"
                        className="rounded-none rounded-r-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-sm font-medium">
                      Instagram
                    </Label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
                        <svg className="h-4 w-4 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                      <Input
                        id="instagram"
                        placeholder="Instagram username"
                        defaultValue="acmecorp"
                        className="rounded-none rounded-r-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-sm font-medium">
                      Twitter
                    </Label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
                        <svg className="h-4 w-4 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </div>
                      <Input
                        id="twitter"
                        placeholder="Twitter username"
                        defaultValue="acmecorp"
                        className="rounded-none rounded-r-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-sm font-medium">
                      LinkedIn
                    </Label>
                    <div className="flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
                        <svg className="h-4 w-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <Input
                        id="linkedin"
                        placeholder="LinkedIn company page"
                        defaultValue="acme-corporation"
                        className="rounded-none rounded-r-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-[#FF9F7F]/20 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">Organization Logo</CardTitle>
                <CardDescription>Upload your organization logo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-[#32D3A7]/20">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        alt="Organization logo"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium text-gray-700">Upload Logo</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG or GIF (max. 2MB)</p>
                    <Button variant="outline" size="sm" className="mt-2 rounded-lg">
                      <Upload className="h-3 w-3 mr-1" />
                      Change Logo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-[#6C5DD3]/20 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">KYC Documents</CardTitle>
                <CardDescription>Upload verification documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Business Registration <span className="text-[#FF6B81]">*</span>
                  </Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 text-center hover:border-[#6C5DD3] transition-colors">
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-[#6C5DD3] mr-2" />
                        <span className="text-sm truncate">business-reg.pdf</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-gray-200"
                      >
                        <Upload className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    PAN Card <span className="text-[#FF6B81]">*</span>
                  </Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 text-center hover:border-[#6C5DD3] transition-colors">
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-[#6C5DD3] mr-2" />
                        <span className="text-sm truncate">pan-card.jpg</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-gray-200"
                      >
                        <Upload className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">GST Certificate</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 text-center hover:border-[#6C5DD3] transition-colors">
                    <label className="flex flex-col items-center gap-2 cursor-pointer py-2">
                      <FileText className="h-6 w-6 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Click to upload document</span>
                      <span className="text-xs text-gray-500">PDF, JPG or PNG (max. 5MB)</span>
                      <Input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Update Details
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}


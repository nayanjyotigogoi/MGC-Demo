"use client"

import { useState } from "react"
import { Camera, Mail, Phone, Save, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>
        <p className="text-gray-500">Manage your organization profile and contact details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="rounded-2xl border-[#32D3A7]/20 hover:shadow-md transition-shadow lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-800">Organization Profile</CardTitle>
            <CardDescription>Your public profile information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-4 border-[#32D3A7]/20">
                <AvatarImage src="/logo_3.jpg?height=96&width=96" alt="Organization" />
                <AvatarFallback className="bg-[#FFC947] text-white text-2xl">AC</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>

            <h3 className="text-xl font-bold mt-4">Acme Corporation</h3>
            <p className="text-gray-500 text-sm">Verified Event Organizer</p>

            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center p-3 rounded-xl bg-gray-50">
                <Mail className="h-5 w-5 text-[#FF6B81] mr-3" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-sm font-medium">admin@acmecorp.com</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-xl bg-gray-50">
                <Phone className="h-5 w-5 text-[#32D3A7] mr-3" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-xl bg-gray-50">
                <User className="h-5 w-5 text-[#6C5DD3] mr-3" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Account Type</p>
                  <p className="text-sm font-medium">Business</p>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-6 rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] text-white hover:opacity-90"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="rounded-2xl border-[#FF9F7F]/20 hover:shadow-md transition-shadow lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-800">Edit Profile Information</CardTitle>
            <CardDescription>Update your organization details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-10 bg-gray-100 rounded-lg p-1">
                <TabsTrigger value="basic" className="rounded-md">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="contact" className="rounded-md">
                  Contact
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-md">
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgName" className="text-sm font-medium">
                      Organization Name
                    </Label>
                    <Input
                      id="orgName"
                      placeholder="Enter organization name"
                      defaultValue="Acme Corporation"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orgType" className="text-sm font-medium">
                      Organization Type
                    </Label>
                    <Input
                      id="orgType"
                      placeholder="Enter organization type"
                      defaultValue="Business"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Bio / Description
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your organization"
                    defaultValue="Acme Corporation is a leading event organizer in Guwahati, specializing in cultural, tech, and food festivals."
                    className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3] min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500">Brief description of your organization (max 500 characters)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium">
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    defaultValue="https://acmecorp.com"
                    className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                  />
                </div>

                <div className="pt-4">
                  <Button className="rounded-xl bg-[#32D3A7] hover:bg-[#32D3A7]/90 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      defaultValue="admin@acmecorp.com"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      defaultValue="+91 98765 43210"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your address"
                    defaultValue="123 Main Street, Guwahati, Assam, India - 781001"
                    className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      City
                    </Label>
                    <Input
                      id="city"
                      placeholder="City"
                      defaultValue="Guwahati"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">
                      State
                    </Label>
                    <Input
                      id="state"
                      placeholder="State"
                      defaultValue="Assam"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm font-medium">
                      Pincode
                    </Label>
                    <Input
                      id="pincode"
                      placeholder="Pincode"
                      defaultValue="781001"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="rounded-xl bg-[#32D3A7] hover:bg-[#32D3A7]/90 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="security" className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-sm font-medium">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#6C5DD3]"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="rounded-xl bg-[#32D3A7] hover:bg-[#32D3A7]/90 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


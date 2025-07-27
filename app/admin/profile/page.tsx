"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Mail, Phone, Save, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
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
        <h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>
        <p className="text-gray-500">Manage your admin profile and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-800">Admin Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-4 border-[#00B6F0]/20">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Admin" />
                <AvatarFallback className="bg-[#0056D2] text-white text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>

            <h3 className="text-xl font-bold mt-4">John Doe</h3>
            <Badge className="mt-1 bg-[#0056D2] text-white">Super Admin</Badge>

            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center p-3 rounded-lg bg-gray-50">
                <Mail className="h-5 w-5 text-[#00B6F0] mr-3" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-sm font-medium">admin@mgc.com</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-gray-50">
                <Phone className="h-5 w-5 text-[#00B6F0] mr-3" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-gray-50">
                <Shield className="h-5 w-5 text-[#00B6F0] mr-3" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="text-sm font-medium">Super Administrator</p>
                </div>
              </div>
            </div>

            <div className="w-full mt-6 space-y-2">
              <Button className="w-full rounded-lg bg-[#0056D2] hover:bg-[#0056D2]/90 text-white">Edit Profile</Button>
              <Button
                variant="outline"
                className="w-full rounded-lg border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10"
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="rounded-lg border-gray-200 hover:shadow-md transition-shadow lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-800">Edit Profile Information</CardTitle>
            <CardDescription>Update your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-100 rounded-lg p-1">
                <TabsTrigger value="basic" className="rounded-md">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-md">
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      defaultValue="John"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      defaultValue="Doe"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      defaultValue="admin@mgc.com"
                      className="rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
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
                      className="rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    Role
                  </Label>
                  <Input
                    id="role"
                    placeholder="Role"
                    defaultValue="Super Administrator"
                    disabled
                    className="rounded-lg border-gray-200 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">Role changes can only be made by the system administrator</p>
                </div>

                <div className="pt-4">
                  <Button
                    className="rounded-lg bg-[#0056D2] hover:bg-[#0056D2]/90 text-white"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
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
                    className="rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
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
                      className="rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
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
                      className="rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
                    />
                  </div>
                </div>

                <div className="space-y-2 p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <h4 className="font-medium text-gray-800">Password Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
                    <li>Minimum 8 characters long</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Button
                    className="rounded-lg bg-[#0056D2] hover:bg-[#0056D2]/90 text-white"
                    onClick={handleSubmit}
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
                        Update Password
                      </>
                    )}
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


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Building,
  Calendar,
  ChevronDown,
  ClipboardList,
  FileCheck,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMounted) return null

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      title: "Profile Info",
      href: "/admin/profile",
      icon: User,
    },
    {
      title: "Events",
      href: "/admin/events",
      icon: Calendar,
    },
    {
      title: "Event Requests",
      href: "/admin/event-requests",
      icon: ClipboardList,
      badge: "12",
    },
    {
      title: "Organizations",
      href: "/admin/organizations",
      icon: Building,
    },
    {
      title: "Organization Requests",
      href: "/admin/organization-requests",
      icon: FileCheck,
      badge: "5",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <Sheet open={isMobile ? undefined : false}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 bg-white">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-[#0056D2] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg text-[#0056D2]">MGC Admin</h1>
                  <p className="text-xs text-gray-500">Super Admin Panel</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto py-4">
              <nav className="space-y-1 px-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200",
                      pathname === item.href
                        ? "bg-[#0056D2] text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg",
                          pathname === item.href ? "bg-white/20" : "bg-gray-100",
                        )}
                      >
                        <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-white" : "text-gray-500")} />
                      </div>
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs",
                          pathname === item.href ? "bg-white text-[#0056D2]" : "bg-[#00B6F0] text-white",
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-10 w-10 border-2 border-[#00B6F0]">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                  <AvatarFallback className="bg-[#0056D2] text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 truncate">admin@mgc.com</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-[#0056D2] flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-[#0056D2]">MGC Admin</h1>
                <p className="text-xs text-gray-500">Super Admin Panel</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto py-4">
            <nav className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    pathname === item.href ? "bg-[#0056D2] text-white font-medium" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                        pathname === item.href ? "bg-white/20" : "bg-gray-100 group-hover:bg-white",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 transition-all duration-200",
                          pathname === item.href ? "text-white" : "text-gray-500 group-hover:text-gray-700",
                        )}
                      />
                    </div>
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs",
                        pathname === item.href ? "bg-white text-[#0056D2]" : "bg-[#00B6F0] text-white",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar className="h-10 w-10 border-2 border-[#00B6F0]">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                <AvatarFallback className="bg-[#0056D2] text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">admin@mgc.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("transition-all duration-300 ease-in-out", isOpen ? "lg:ml-64" : "lg:ml-0")}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setIsOpen(!isOpen)}>
                <Menu className="h-5 w-5" />
              </Button>

              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events, organizations, or users..."
                  className="pl-10 pr-4 py-2 rounded-lg border-gray-200 focus-visible:ring-[#0056D2]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative rounded-lg">
                <Bell className="h-5 w-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#EF4444] text-white text-xs">
                  5
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-lg flex items-center gap-2">
                    <Avatar className="h-8 w-8 border-2 border-[#00B6F0]">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                      <AvatarFallback className="bg-[#0056D2] text-white">JD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-gray-500">Super Admin</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-lg p-2">
                  <DropdownMenuItem className="rounded-md cursor-pointer">
                    <User className="h-4 w-4 mr-2 text-[#0056D2]" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-md cursor-pointer">
                    <Settings className="h-4 w-4 mr-2 text-[#00B6F0]" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-md cursor-pointer text-[#EF4444]">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">{children}</main>
      </div>
    </div>
  )
}


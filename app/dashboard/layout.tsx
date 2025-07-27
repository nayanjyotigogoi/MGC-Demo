"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  Upload,
  User,
  BarChart3,
  MessageSquare,
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

export default function DashboardLayout({
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
      href: "/dashboard",
      icon: Home,
      color: "text-[#FFC947]",
      bgColor: "bg-[#FFC947]/10",
    },
    {
      title: "Profile Info",
      href: "/dashboard/profile",
      icon: User,
      color: "text-[#FF6B81]",
      bgColor: "bg-[#FF6B81]/10",
    },
    {
      title: "Your Events",
      href: "/dashboard/events",
      icon: Calendar,
      color: "text-[#32D3A7]",
      bgColor: "bg-[#32D3A7]/10",
    },
    {
      title: "Upload Event",
      href: "/dashboard/upload",
      icon: Upload,
      color: "text-[#6C5DD3]",
      bgColor: "bg-[#6C5DD3]/10",
    },
    {
      title: "Organization Details",
      href: "/dashboard/organization",
      icon: FileText,
      color: "text-[#FF9F7F]",
      bgColor: "bg-[#FF9F7F]/10",
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      color: "text-[#4ECDC4]",
      bgColor: "bg-[#4ECDC4]/10",
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      color: "text-[#FF8A5B]",
      bgColor: "bg-[#FF8A5B]/10",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      color: "text-[#6C5DD3]",
      bgColor: "bg-[#6C5DD3]/10",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1]/50 to-[#E3F2FD]/50">
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
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#FFC947] to-[#FF6B81] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] bg-clip-text text-transparent">
                    My Guwahati City
                  </h1>
                  <p className="text-xs text-gray-500">Organization Dashboard</p>
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                      pathname === item.href
                        ? `${item.bgColor} ${item.color} font-medium`
                        : "text-gray-600 hover:bg-gray-100",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg",
                        pathname === item.href ? item.bgColor : "bg-gray-100",
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", pathname === item.href ? item.color : "text-gray-500")} />
                    </div>
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-10 w-10 border-2 border-[#32D3A7]">
                  <AvatarImage src="/logo_3.jpg?height=40&width=40" alt="Organization" />
                  <AvatarFallback className="bg-[#FFC947] text-white">AC</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">Acme Corporation</p>
                  <p className="text-xs text-gray-500 truncate">admin@acme.com</p>
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
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#FFC947] to-[#FF6B81] flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-[#6C5DD3] to-[#FF6B81] bg-clip-text text-transparent">
                  My Guwahati City
                </h1>
                <p className="text-xs text-gray-500">Organization Dashboard</p>
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
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                    pathname === item.href
                      ? `${item.bgColor} ${item.color} font-medium`
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                      pathname === item.href ? item.bgColor : "bg-gray-100 group-hover:bg-white",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 transition-all duration-200",
                        pathname === item.href ? item.color : "text-gray-500 group-hover:text-gray-700",
                      )}
                    />
                  </div>
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar className="h-10 w-10 border-2 border-[#32D3A7]">
                <AvatarImage src="/logo_3.jpg?height=40&width=40" alt="Organization" />
                <AvatarFallback className="bg-[#FFC947] text-white">AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">Acme Corporation</p>
                <p className="text-xs text-gray-500 truncate">admin@acme.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("transition-all duration-300 ease-in-out", isOpen ? "lg:ml-64" : "lg:ml-0")}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setIsOpen(!isOpen)}>
                <Menu className="h-5 w-5" />
              </Button>

              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events, users, or settings..."
                  className="pl-10 pr-4 py-2 rounded-full border-gray-200 focus-visible:ring-[#6C5DD3]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative rounded-full">
                <Bell className="h-5 w-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#FF6B81] text-white text-xs">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full flex items-center gap-2">
                    <Avatar className="h-8 w-8 border-2 border-[#32D3A7]">
                      <AvatarImage src="/logo_3.jpg?height=32&width=32" alt="Organization" />
                      <AvatarFallback className="bg-[#FFC947] text-white">AC</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">Acme Corporation</p>
                      <p className="text-xs text-gray-500">Verified Organizer</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                  
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href="/" className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-[#6C5DD3]" />
                      <span>Home</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer">
                    <User className="h-4 w-4 mr-2 text-[#6C5DD3]" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer">
                    <Settings className="h-4 w-4 mr-2 text-[#32D3A7]" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-lg cursor-pointer text-[#FF6B81]">
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


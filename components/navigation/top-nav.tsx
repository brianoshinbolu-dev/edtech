import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Home, BookOpen, Briefcase, Users, MessageSquare, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-4 px-4">
        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-6">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Home className="size-5" />
                Home
              </Link>
              <Link href="/learning" className="flex items-center gap-2 text-lg font-semibold">
                <BookOpen className="size-5" />
                Learning
              </Link>
              <Link href="/jobs" className="flex items-center gap-2 text-lg font-semibold">
                <Briefcase className="size-5" />
                Jobs
              </Link>
              <Link href="/network" className="flex items-center gap-2 text-lg font-semibold">
                <Users className="size-5" />
                Network
              </Link>
              <Link href="/messages" className="flex items-center gap-2 text-lg font-semibold">
                <MessageSquare className="size-5" />
                Messages
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded bg-primary">
            <span className="font-sans text-lg font-bold text-primary-foreground">L</span>
          </div>
          <span className="hidden font-sans text-lg font-semibold md:inline-block">LearnConnect</span>
        </Link>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search for courses, jobs, people..." className="pl-10" />
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-1 md:flex ml-auto">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex flex-col items-center gap-1">
              <Home className="size-5" />
              <span className="text-xs">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/learning" className="flex flex-col items-center gap-1">
              <BookOpen className="size-5" />
              <span className="text-xs">Learning</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/jobs" className="flex flex-col items-center gap-1">
              <Briefcase className="size-5" />
              <span className="text-xs">Jobs</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/network" className="flex flex-col items-center gap-1">
              <Users className="size-5" />
              <span className="text-xs">Network</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/messages" className="flex flex-col items-center gap-1">
              <MessageSquare className="size-5" />
              <span className="text-xs">Messages</span>
            </Link>
          </Button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
           {/* Mobile Search Trigger (Optional, if needed) */}
           <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="size-5" />
           </Button>

          <Button variant="ghost" size="icon-sm">
            <Bell className="size-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="rounded-full">
                <Avatar className="size-8">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/my-learning">My Learning</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

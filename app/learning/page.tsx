"use client"

import { useState } from "react"
import { TopNav } from "@/components/navigation/top-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, LayoutDashboard, GraduationCap, Search, MapPin, Filter, Loader2 } from "lucide-react"
import { CourseAdminDashboard } from "@/components/learning/course-admin-dashboard"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { useCourses } from "@/hooks/use-courses"

export default function LearningPage() {
  const [isInstructorView, setIsInstructorView] = useState(false)
  const { courses, isLoading } = useCourses()

  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        {/* Header Toggle */}
        <div className="mb-6 flex justify-end">
          <div className="flex items-center space-x-2 rounded-lg border bg-background p-2">
            <div className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${!isInstructorView ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
              <GraduationCap className="size-4" />
              Learner
            </div>
            <Switch
              id="view-mode"
              checked={isInstructorView}
              onCheckedChange={setIsInstructorView}
            />
            <div className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${isInstructorView ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
              <LayoutDashboard className="size-4" />
              Instructor
            </div>
          </div>
        </div>

        {isInstructorView ? (
          <CourseAdminDashboard />
        ) : (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative w-full bg-muted overflow-hidden flex flex-col md:block">
              {/* Background Image Placeholder */}
              <div className="h-48 md:h-[400px] w-full bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center opacity-80 md:absolute md:inset-0">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Floating Content Card */}
              <div className="relative z-10 mx-4 -mt-8 mb-6 md:absolute md:top-12 md:left-12 md:lg:left-24 md:m-0 max-w-md bg-card p-6 shadow-lg rounded-lg border">
                <h1 className="text-3xl font-bold font-serif mb-3 text-foreground">
                  Learning that gets you
                </h1>
                <p className="text-base mb-5 text-muted-foreground">
                  Skills for your present (and your future). Get started with us today.
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="w-full h-12 pl-4 pr-12 border rounded-md bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="absolute right-0 top-0 h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 rounded-r-md">
                    <Search className="size-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Trusted By Bar */}
            <div className="bg-card py-6 border-y">
              <div className="mx-auto max-w-screen-xl px-4 text-center">
                <p className="text-sm font-semibold text-muted-foreground mb-4">Trusted by over 15,000 companies and millions of learners around the world</p>
                <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale transition-all hover:grayscale-0">
                  {/* Logos */}
                  <div className="flex items-center gap-2 font-bold text-xl text-foreground"><div className="size-6 bg-blue-600 rounded-sm"></div> Volkwagen</div>
                  <div className="flex items-center gap-2 font-bold text-xl text-foreground"><div className="size-6 bg-red-600 rounded-sm"></div> Samsung</div>
                  <div className="flex items-center gap-2 font-bold text-xl text-foreground"><div className="size-6 bg-orange-600 rounded-sm"></div> Cisco</div>
                  <div className="flex items-center gap-2 font-bold text-xl text-foreground"><div className="size-6 bg-blue-900 rounded-sm"></div> AT&T</div>
                </div>
              </div>
            </div>

            {/* Course Selection Section */}
            <div className="px-4">
              <h2 className="text-2xl font-bold text-foreground mb-2">A broad selection of courses</h2>
              <p className="text-lg text-muted-foreground mb-6">Choose from 220,000 online video courses with new additions published every month</p>

              {/* Tabs mimic */}
              <div className="flex gap-4 border-b mb-6 overflow-x-auto pb-1">
                <button className="text-sm font-bold text-foreground hover:text-primary whitespace-nowrap pb-2 border-b-2 border-foreground">Python</button>
                <button className="text-sm font-bold text-muted-foreground hover:text-foreground whitespace-nowrap pb-2">Excel</button>
                <button className="text-sm font-bold text-muted-foreground hover:text-foreground whitespace-nowrap pb-2">Web Development</button>
                <button className="text-sm font-bold text-muted-foreground hover:text-foreground whitespace-nowrap pb-2">JavaScript</button>
                <button className="text-sm font-bold text-muted-foreground hover:text-foreground whitespace-nowrap pb-2">Data Science</button>
                <button className="text-sm font-bold text-muted-foreground hover:text-foreground whitespace-nowrap pb-2">AWS Certification</button>
              </div>

              {/* Course Carousel / Grid */}
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="size-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {courses.map((course) => (
                    <Link href={`/learning/course/${course.id}`} key={course.id} className="block group">
                      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full bg-card">
                        {/* Card Image */}
                        <div className="h-40 bg-muted relative overflow-hidden">
                          {/* Placeholder for thumbnail */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          {/* In a real app, use next/image here */}
                          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground group-hover:scale-105 transition-transform duration-500">
                            <GraduationCap className="size-10 opacity-20" />
                          </div>
                        </div>

                        <CardContent className="p-4">
                          <div className="mb-2">
                            <h3 className="font-bold text-base leading-tight line-clamp-2 h-10 mb-1 group-hover:text-primary transition-colors text-foreground">{course.title}</h3>
                            <p className="text-xs text-muted-foreground">By {course.instructor}</p>
                          </div>

                          <div className="flex items-center gap-1 text-sm font-medium mb-3">
                            <span className="font-bold text-amber-700">{course.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`size-3 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({course.reviews})</span>
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex flex-col">
                              <span className="font-bold text-lg text-foreground">{course.price}</span>
                              <span className="text-xs text-muted-foreground line-through">{course.originalPrice}</span>
                            </div>
                            {course.bestseller && (
                              <Badge variant="secondary" className="rounded-sm bg-yellow-100 text-yellow-800 font-bold text-xs px-2 py-0.5 border-none">Bestseller</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Top Categories */}
            <div className="px-4 pb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Top Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["Design", "Development", "Marketing", "IT and Software", "Personal Development", "Business", "Photography", "Music"].map((cat) => (
                  <div key={cat} className="p-4 border bg-card hover:bg-accent/50 hover:shadow-md transition-all cursor-pointer rounded-lg">
                    <h3 className="font-bold text-lg text-foreground">{cat}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

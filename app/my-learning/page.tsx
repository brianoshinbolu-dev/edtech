"use client"

import { TopNav } from "@/components/navigation/top-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EnrolledCourseCard } from "@/components/learning/enrolled-course-card"
import { useEnrolledCourses } from "@/hooks/use-enrolled-courses"
import { Skeleton } from "@/components/ui/skeleton"

export default function MyLearningPage() {
    const { enrolledCourses, isLoading } = useEnrolledCourses()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNav />

            {/* Header Section - Dark Theme like Udemy */}
            <div className="bg-slate-900 pt-10 pb-4 text-white">
                <main className="container mx-auto px-4 max-w-screen-xl">
                    <h1 className="text-4xl font-bold font-serif mb-8">My Learning</h1>

                    {/* Navigation Tabs - Visual only for now (except 'All Courses') */}
                    <div className="flex gap-6 border-b border-slate-700 text-sm font-medium">
                        <button className="pb-4 border-b-2 border-white text-white">All Courses</button>
                        <button className="pb-4 border-b-2 border-transparent text-slate-400 hover:text-white transition-colors">My Lists</button>
                        <button className="pb-4 border-b-2 border-transparent text-slate-400 hover:text-white transition-colors">Wishlist</button>
                        <button className="pb-4 border-b-2 border-transparent text-slate-400 hover:text-white transition-colors">Archived</button>
                        <button className="pb-4 border-b-2 border-transparent text-slate-400 hover:text-white transition-colors">Learning Tools</button>
                    </div>
                </main>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-screen-xl flex-1">
                <Tabs defaultValue="all-courses" className="w-full">

                    {/* Filters Bar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="h-10 border-slate-300 text-slate-700 rounded-none hover:bg-slate-50">
                                Sort by
                            </Button>
                            <Button variant="outline" className="h-10 border-slate-300 text-slate-700 rounded-none hover:bg-slate-50">
                                Filter by
                                <Filter className="ml-2 size-4" />
                            </Button>
                        </div>

                        <div className="relative w-full md:w-72">
                            <Input
                                placeholder="Search my courses"
                                className="h-10 bg-white border-slate-300 pr-10 rounded-none"
                            />
                            <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-10 w-10 text-slate-500 hover:text-primary">
                                <Search className="size-4" />
                            </Button>
                        </div>
                    </div>

                    <TabsContent value="all-courses" className="mt-0">
                        {isLoading ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="space-y-3">
                                        <Skeleton className="h-40 w-full rounded-md" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {enrolledCourses.map((course) => (
                                    <div key={course.id} className="h-[300px]">
                                        <EnrolledCourseCard course={course} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {!isLoading && enrolledCourses.length === 0 && (
                            <div className="text-center py-20 bg-muted/20 rounded-lg border border-dashed">
                                <h3 className="font-semibold text-xl mb-2">No courses found</h3>
                                <p className="text-muted-foreground mb-6">Start learning today by exploring new courses.</p>
                                <Button>Browse Courses</Button>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

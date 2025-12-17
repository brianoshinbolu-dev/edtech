"use client"

import { use } from "react"
import { TopNav } from "@/components/navigation/top-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, PlayCircle, FileText, Download, Award, Clock, Infinity, Smartphone, Globe, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useCourses } from "@/hooks/use-courses"

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { getCourseById, isLoading } = useCourses()
    const course = getCourseById(id)

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
                <h1 className="text-2xl font-bold">Course not found</h1>
                <Button asChild><Link href="/learning">Return to Courses</Link></Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <TopNav />

            {/* Hero Section */}
            <div className="bg-card py-8 border-b">
                <div className="mx-auto max-w-screen-xl px-4 flex flex-col lg:flex-row gap-8 relative">

                    {/* Main Content Area (Left) */}
                    <div className="lg:w-2/3 space-y-4">

                        {/* Breadcrumbs */}
                        <div className="flex gap-2 text-sm text-primary font-semibold mb-2">
                            <Link href="/learning" className="hover:underline">Development</Link>
                            <span>{'>'}</span>
                            <Link href="/learning" className="hover:underline">Programming Languages</Link>
                            <span>{'>'}</span>
                            <Link href="/learning" className="hover:underline">Python</Link>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold font-serif leading-tight text-foreground">
                            {course.title}
                        </h1>
                        <p className="text-lg text-muted-foreground line-clamp-2">
                            {course.subtitle}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap text-sm">
                            {course.bestseller && (
                                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none font-bold rounded-sm px-2">Bestseller</Badge>
                            )}
                            <span className="text-amber-700 font-bold flex items-center gap-1">
                                {course.rating}
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`size-3 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                                    ))}
                                </div>
                            </span>
                            <Link href="#reviews" className="text-primary underline hover:text-primary/80">({course.reviews.toLocaleString()} ratings)</Link>
                            <span className="text-muted-foreground">{course.students.toLocaleString()} students</span>
                        </div>

                        <div className="text-sm text-foreground">
                            Created by <Link href="#instructor" className="text-primary underline hover:text-primary/80">{course.author.name}</Link>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Clock className="size-4" />
                                Last updated {course.lastUpdated}
                            </div>
                            <div className="flex items-center gap-1">
                                <Globe className="size-4" />
                                {course.language}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Sidebar Placeholder (for layout spacing on mobile, actual sidebar is absolute/fixed on desktop) */}
                    <div className="lg:w-1/3 hidden lg:block"></div>
                </div>
            </div>

            <main className="mx-auto max-w-screen-xl px-4 py-8 flex flex-col lg:flex-row gap-8 relative">
                {/* Left Content */}
                <div className="lg:w-2/3 space-y-10">

                    {/* What you'll learn */}
                    <div className="border bg-card p-6 rounded-sm">
                        <h2 className="text-2xl font-bold mb-4 text-foreground">What you'll learn</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                            {course.whatYouWillLearn.map((item, i) => (
                                <div key={i} className="flex gap-2 items-start text-sm text-muted-foreground">
                                    <Check className="size-4 shrink-0 mt-0.5 text-foreground" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Curriculum */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Course content</h2>
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>{course.curriculum.length} sections • {course.curriculum.reduce((acc, curr) => acc + curr.lectures, 0)} lectures</span>
                            <button className="text-primary font-bold hover:text-primary/80">Expand all sections</button>
                        </div>
                        <Accordion type="single" collapsible className="w-full border rounded-sm overflow-hidden">
                            {course.curriculum.map((section, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`} className="border-b last:border-b-0">
                                    <AccordionTrigger className="bg-muted px-4 py-3 hover:no-underline hover:bg-muted/80">
                                        <div className="flex items-center justify-between w-full pr-4">
                                            <span className="font-bold text-foreground">{section.title}</span>
                                            <span className="text-xs text-muted-foreground font-normal">{section.lectures} lectures • {section.duration}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col">
                                            {section.items.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50">
                                                    <div className="flex items-center gap-3">
                                                        {item.type === 'video' ? <PlayCircle className="size-4 text-muted-foreground" /> : <FileText className="size-4 text-muted-foreground" />}
                                                        <span className="text-sm text-primary underline cursor-pointer">{item.title}</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">{item.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Requirements */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Requirements</h2>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm pl-2">
                            <li>Access to a computer with an internet connection.</li>
                            <li>No prior programming experience needed. You will learn everything you need to know.</li>
                        </ul>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Description</h2>
                        <div className="text-sm text-muted-foreground space-y-4">
                            <p>{course.description}</p>
                        </div>
                    </div>

                    {/* Instructor */}
                    <div id="instructor">
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Instructor</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-primary underline">{course.author.name}</h3>
                            <p className="text-muted-foreground">{course.author.role}</p>
                            <div className="flex gap-4">
                                <Avatar className="size-24 rounded-full">
                                    <AvatarImage src={course.author.image} />
                                    <AvatarFallback>{course.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="text-sm text-muted-foreground space-y-2">
                                    <div className="flex gap-4 text-muted-foreground mb-2">
                                        <div className="flex items-center gap-1"><Star className="size-3 fill-muted-foreground" /> 4.6 Instructor Rating</div>
                                        <div className="flex items-center gap-1"><Award className="size-3" /> 1M+ Reviews</div>
                                        <div className="flex items-center gap-1"><Smartphone className="size-3" /> 58 Courses</div>
                                    </div>
                                    <p>{course.author.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar (Sticky) */}
                <div className="lg:w-1/3 lg:absolute lg:top-8 lg:right-4 h-full pointer-events-none">
                    <div className="sticky top-6 pointer-events-auto">
                        <div className="bg-card shadow-xl border rounded-sm overflow-hidden lg:-mt-60 lg:z-10 relative">
                            {/* Preview Image/Video */}
                            <div className="h-48 bg-muted relative group cursor-pointer border-b">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="size-16 text-white fill-black opacity-80 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center text-white font-bold text-sm drop-shadow-md">Preview this course</div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold text-foreground">{course.price}</span>
                                    <span className="text-lg text-muted-foreground line-through mb-1">{course.originalPrice}</span>
                                    <span className="text-lg text-muted-foreground mb-1">{course.discount}</span>
                                </div>
                                <div className="flex items-center gap-2 text-red-700 text-sm">
                                    <Clock className="size-4" />
                                    <span className="font-bold">2 days left at this price!</span>
                                </div>

                                <div className="space-y-2">
                                    <Button size="lg" className="w-full font-bold h-12 text-base rounded-sm" asChild>
                                        <Link href={`/learning/course/${course.id}/learn`}>Go to Course</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="w-full font-bold h-12 text-base rounded-sm border-foreground text-foreground hover:bg-muted">Add to Cart</Button>
                                </div>

                                <p className="text-xs text-center text-muted-foreground">30-Day Money-Back Guarantee</p>

                                <div className="space-y-2 pt-2">
                                    <h4 className="font-bold text-foreground text-sm">This course includes:</h4>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-3"><PlayCircle className="size-4" /> 22 hours on-demand video</li>
                                        <li className="flex items-center gap-3"><FileText className="size-4" /> 15 articles</li>
                                        <li className="flex items-center gap-3"><Download className="size-4" /> 19 downloadable resources</li>
                                        <li className="flex items-center gap-3"><Infinity className="size-4" /> Full lifetime access</li>
                                        <li className="flex items-center gap-3"><Smartphone className="size-4" /> Access on mobile and TV</li>
                                        <li className="flex items-center gap-3"><Award className="size-4" /> Certificate of completion</li>
                                    </ul>
                                </div>

                                <div className="flex justify-between border-t pt-4 text-sm font-bold text-foreground underline decoration-muted-foreground/30">
                                    <button>Share</button>
                                    <button>Gift this course</button>
                                    <button>Apply Coupon</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

"use client"

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlayCircle, CheckCircle, FileText, ChevronLeft, ChevronRight, Menu, Download, MessageSquare, StickyNote, Loader2 } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCourses } from "@/hooks/use-courses"
import { Badge } from "@/components/ui/badge"

export default function LearningPlayerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { getCourseById, isLoading: isCourseLoading } = useCourses()
    const course = getCourseById(id)

    const [activeLessonId, setActiveLessonId] = useState<string>("")
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

    // Initialize active lesson when course loads
    useEffect(() => {
        if (course && course.curriculum.length > 0 && course.curriculum[0].items.length > 0 && !activeLessonId) {
            setActiveLessonId(course.curriculum[0].items[0].id)
        }
    }, [course, activeLessonId])

    if (isCourseLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-black text-white">
                <Loader2 className="size-8 animate-spin" />
            </div>
        )
    }

    if (!course) {
        return (
            <div className="flex h-screen items-center justify-center bg-black text-white flex-col gap-4">
                <h1 className="text-xl font-bold">Course not found</h1>
                <Button asChild variant="secondary"><Link href="/learning">Back to Learning</Link></Button>
            </div>
        )
    }

    // Find active lesson details
    let activeLesson = { title: "Loading...", duration: "0:00", type: "video" }
    course.curriculum.forEach(section => {
        const found = section.items.find(l => l.id === activeLessonId)
        if (found) activeLesson = found
    })

    // Calculate total items
    const totalLessons = course.curriculum.reduce((acc, curr) => acc + curr.items.length, 0)

    const toggleLessonComplete = (lessonId: string) => {
        const newCompleted = new Set(completedLessons)
        if (newCompleted.has(lessonId)) {
            newCompleted.delete(lessonId)
        } else {
            newCompleted.add(lessonId)
        }
        setCompletedLessons(newCompleted)
    }

    const CourseSidebarContent = () => (
        <div className="h-full flex flex-col bg-muted border-l">
            <div className="p-4 border-b bg-card flex items-center justify-between sticky top-0 z-10">
                <h3 className="font-bold text-sm text-foreground">Course Content</h3>
                <span className="text-xs text-muted-foreground">{completedLessons.size} / {totalLessons} completed</span>
            </div>
            <ScrollArea className="flex-1">
                <Accordion type="multiple" defaultValue={course.curriculum.map(s => s.id)} className="w-full">
                    {course.curriculum.map((section) => (
                        <AccordionItem key={section.id} value={section.id}>
                            <AccordionTrigger className="px-4 py-3 hover:bg-accent hover:no-underline text-sm font-semibold text-foreground data-[state=open]:bg-accent">
                                <div className="text-left">
                                    <div>{section.title}</div>
                                    <div className="text-xs font-normal text-muted-foreground mt-1">0 / {section.items.length} | {section.duration}</div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                                {section.items.map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        className={`flex items-start gap-3 p-3 px-4 cursor-pointer hover:bg-muted/80 transition-colors ${activeLessonId === lesson.id ? "bg-muted border-l-4 border-primary" : ""}`}
                                        onClick={() => setActiveLessonId(lesson.id)}
                                    >
                                        <Checkbox
                                            checked={completedLessons.has(lesson.id)}
                                            onCheckedChange={() => toggleLessonComplete(lesson.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="mt-1"
                                        />
                                        <div className="flex-1 space-y-1">
                                            <p className={`text-sm ${activeLessonId === lesson.id ? "font-bold" : "font-medium"} text-foreground`}>{lesson.title}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                {lesson.type === 'video' ? <PlayCircle className="size-3" /> : <FileText className="size-3" />}
                                                {lesson.duration}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
        </div>
    )

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Top Bar */}
            <header className="h-14 bg-card border-b flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href={`/learning/course/${id}`} className="hover:opacity-80 transition-opacity">
                        <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                            <span className="font-serif text-lg font-bold text-primary">L</span> <span className="hidden sm:inline">| LearnConnect</span>
                        </div>
                    </Link>
                    <div className="h-6 w-px bg-border" />
                    <h1 className="text-sm font-medium line-clamp-1 text-foreground">{activeLesson.title || "Loading..."}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Your Progress:</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${totalLessons > 0 ? (completedLessons.size / totalLessons) * 100 : 0}%` }}
                            />
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        Share
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden" asChild>
                        <Sheet>
                            <SheetTrigger><Menu /></SheetTrigger>
                            <SheetContent side="right" className="p-0 w-80">
                                <CourseSidebarContent />
                            </SheetContent>
                        </Sheet>
                    </Button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left: Player + Tabs */}
                <div className="flex-1 flex flex-col bg-background overflow-y-auto">

                    {/* Video Player Placeholder - Keeps Dark Mode as it's media */}
                    <div className="bg-black aspect-video w-full flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                            <div className="flex items-center justify-between text-white">
                                <div className="space-y-1">
                                    <h2 className="text-lg font-bold">{activeLesson.title}</h2>
                                    <p className="text-sm opacity-80">{activeLesson.duration}</p>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20"><ChevronLeft /></Button>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20"><ChevronRight /></Button>
                                </div>
                            </div>
                        </div>
                        <PlayCircle className="size-20 text-white opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
                    </div>

                    {/* Tabs Section */}
                    <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
                        <Tabs defaultValue="overview">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="qa">Q&A</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                            </TabsList>
                            <Separator className="my-4" />

                            <TabsContent value="overview" className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2 text-foreground">About this lesson</h2>
                                    <p className="text-muted-foreground">In this lesson, we will cover the fundamentals of {activeLesson.title}. Make sure to have your environment set up as discussed in the previous section.</p>
                                </div>

                                <div className="flex gap-8 py-4 border-y">
                                    <div className="space-y-1">
                                        <span className="text-sm font-bold block text-foreground">By the numbers</span>
                                        <div className="text-muted-foreground text-sm">
                                            Skill level: All Levels<br />
                                            Students: {course.students.toLocaleString()}<br />
                                            Languages: {course.language}<br />
                                            Captions: Yes
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm font-bold block text-foreground">Certificates</span>
                                        <div className="text-muted-foreground text-sm">
                                            Get certificate by completing entire course
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm font-bold block text-foreground">Features</span>
                                        <div className="text-muted-foreground text-sm">
                                            Available on iOS and Android
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-2 text-foreground">Description</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {course.author.bio}
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="qa">
                                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                    <div className="bg-muted p-4 rounded-full">
                                        <MessageSquare className="size-8 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">No questions yet</h3>
                                        <p className="text-sm text-muted-foreground">Be the first to ask a question about this lesson!</p>
                                    </div>
                                    <Button>Ask a Question</Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="notes">
                                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                    <div className="bg-muted p-4 rounded-full">
                                        <StickyNote className="size-8 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">Start taking notes</h3>
                                        <p className="text-sm text-muted-foreground">Click the button below to add a new note at the current timestamp.</p>
                                    </div>
                                    <Button variant="outline">Create a new note</Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Right: Sidebar (Desktop) */}
                <div className="hidden md:block w-96 shrink-0 h-full overflow-hidden border-l">
                    <CourseSidebarContent />
                </div>

            </div>
        </div>
    )
}

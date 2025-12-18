"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, Award } from "lucide-react"
import { EnrolledCourse } from "@/hooks/use-enrolled-courses"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface EnrolledCourseCardProps {
    course: EnrolledCourse
}

export function EnrolledCourseCard({ course }: EnrolledCourseCardProps) {
    const { toast } = useToast()

    const handleClaimCertificate = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toast({
            title: "Certificate Claimed!",
            description: `You have successfully claimed your certificate for ${course.title}. It has been added to your profile.`,
            variant: "default",
        })
    }

    return (
        <div className="group relative flex flex-col h-full">
            <Toaster />
            <Card className="h-full border-0 shadow-none hover:bg-accent/5 transition-colors">
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Overlay Play Button (Visible on Hover) */}
                    <div className="absolute inset-0 z-10 hidden items-center justify-center bg-black/40 group-hover:flex transition-all">
                        <PlayCircle className="size-12 text-white fill-black/50" />
                    </div>

                    <Link href={`/learning/course/${course.id}/learn`} className="absolute inset-0 z-20">
                        <span className="sr-only">Start learning {course.title}</span>
                    </Link>
                </div>

                <CardContent className="p-0 pt-3 flex flex-col gap-2 flex-grow">
                    <div className="space-y-1">
                        <h3 className="font-bold font-sans text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            <Link href={`/learning/course/${course.id}/learn`}>
                                {course.title}
                            </Link>
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{course.instructor}</p>
                    </div>

                    <div className="mt-auto pt-2 space-y-2">
                        {course.progress === 100 ? (
                            <Button
                                className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white h-8 text-xs font-semibold"
                                onClick={handleClaimCertificate}
                            >
                                <Award className="size-4" />
                                Claim Certificate
                            </Button>
                        ) : (
                            <>
                                <div className="relative w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-primary"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-medium text-muted-foreground">{course.progress}% complete</span>
                                    {course.progress < 100 && (
                                        <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                            Click to resume
                                        </span>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

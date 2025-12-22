"use client"

import { useState } from "react"
import { Star, MoreHorizontal, MessageSquare, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface ReviewsManagerProps {
    reviews: any[]
}

export function ReviewsManager({ reviews }: ReviewsManagerProps) {
    const [filter, setFilter] = useState("all")

    const filteredReviews = filter === "all"
        ? reviews
        : reviews.filter(r => r.rating.toString() === filter)

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
                    <p className="text-muted-foreground">See what your students are saying.</p>
                </div>
                <div className="w-[200px]">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Ratings</SelectItem>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="1">1 Star</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6">
                {filteredReviews.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card">
                        No reviews found matching your filter.
                    </div>
                ) : (
                    filteredReviews.map((review) => (
                        <div key={review.id} className="bg-card border rounded-lg p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold">
                                        {review.rating}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{review.courseId === "1" ? "Python Bootcamp" : "Course ID " + review.courseId}</div>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-3 w-3 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                                                />
                                            ))}
                                            <span className="text-xs text-muted-foreground ml-2">
                                                {new Date(review.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>

                            <p className="text-sm leading-relaxed">
                                {review.comment}
                            </p>

                            <Separator />

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback>S</AvatarFallback>
                                    </Avatar>
                                    <span>Student {review.studentId}</span>
                                </div>
                                <div className="ml-auto flex gap-2">
                                    <Button size="sm" variant="ghost" className="gap-2">
                                        <ThumbsUp className="h-4 w-4" />
                                        Helpful ({review.helpful})
                                    </Button>
                                    <Button size="sm" variant="outline" className="gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        Reply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

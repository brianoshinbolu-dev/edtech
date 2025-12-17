"use client"

import { useState, useEffect } from "react"
import coursesData from "@/lib/courses.json"

export type Course = typeof coursesData[0]
export type CurriculumSection = Course['curriculum'][0]
export type Lesson = CurriculumSection['items'][0]

export function useCourses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate API fetch delay
        const timer = setTimeout(() => {
            setCourses(coursesData)
            setIsLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const getCourseById = (id: string | number) => {
        return courses.find(c => c.id.toString() === id.toString())
    }

    return {
        courses,
        isLoading,
        getCourseById
    }
}

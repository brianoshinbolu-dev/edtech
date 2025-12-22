"use client"

import { useState, useEffect } from "react"
import { getCourses } from "@/lib/actions"
// We still need the type definition, relying on the shape of data returned
// For simplicity, we can define the interface or infer it.
// To avoid circular dependency or import issues, let's redefine the interface matching the JSON structure or import it if the action was typed accurately.
// Since getCourses returns 'any' implicitly or explicitly, we should ideally type it. 
// For now, let's assume the shape matches.

export interface Course {
    id: string
    title: string
    subtitle: string
    instructor: string
    author: {
        name: string
        role: string
        image: string
        bio: string
    }
    rating: number
    reviews: number
    students: number
    price: string
    originalPrice: string
    discount: string
    bestseller: boolean
    image: string
    language: string
    lastUpdated: string
    description: string
    whatYouWillLearn: string[]
    curriculum: {
        id: string
        title: string
        lectures: number
        duration: string
        items: {
            id: string
            title: string
            duration: string
            type: string
        }[]
    }[]
}

export function useCourses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses()
                setCourses(data as Course[])
            } catch (error) {
                console.error("Failed to fetch courses", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCourses()
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

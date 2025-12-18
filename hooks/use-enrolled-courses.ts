"use client"

import { useState, useEffect } from "react"
import type { Course } from "@/hooks/use-courses"

export interface EnrolledCourse extends Course {
    progress: number // 0 to 100
    lastAccessed: string
}

const MOCK_ENROLLED_COURSES: EnrolledCourse[] = [
    {
        "id": "1",
        "title": "The Complete Python Bootcamp From Zero to Hero in Python",
        "subtitle": "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games",
        "instructor": "Jose Portilla",
        "author": {
            "name": "Jose Portilla",
            "role": "Head of Data Science, Pierian Data Inc.",
            "image": "/user-1.jpg",
            "bio": "Jose Marcial Portilla has a BS and MS in Mechanical Engineering from Santa Clara University and years of experience as a professional instructor and trainer for Data Science and programming."
        },
        "rating": 4.6,
        "reviews": 512143,
        "students": 1850381,
        "price": "₦19,900",
        "originalPrice": "₦84,900",
        "discount": "76% off",
        "bestseller": true,
        "image": "/course-python.jpg",
        "language": "English",
        "lastUpdated": "11/2024",
        "description": "Become a Python Programmer and learn one of employer's most requested skills of 2024!",
        "whatYouWillLearn": [],
        "curriculum": [],
        "progress": 35,
        "lastAccessed": "2 days ago"
    },
    {
        "id": "3",
        "title": "The Web Developer Bootcamp 2024",
        "subtitle": "The only course you need to learn web development - HTML, CSS, JS, Node, and More!",
        "instructor": "Colt Steele",
        "author": {
            "name": "Colt Steele",
            "role": "Developer and Bootcamp Instructor",
            "image": "/user-3.jpg",
            "bio": "Colt Steele is a developer and instructor who has taught thousands of students how to code."
        },
        "rating": 4.7,
        "reviews": 265901,
        "students": 890123,
        "price": "₦14,900",
        "originalPrice": "₦74,900",
        "discount": "80% off",
        "bestseller": false,
        "image": "/course-web.jpg",
        "language": "English",
        "lastUpdated": "12/2024",
        "description": "The only course you need to learn web development.",
        "whatYouWillLearn": [],
        "curriculum": [],
        "progress": 12,
        "lastAccessed": "1 week ago"
    },
    {
        "id": "4",
        "title": "100 Days of Code: The Complete Python Pro Bootcamp for 2024",
        "subtitle": "Master Python by building 100 projects in 100 days.",
        "instructor": "Dr. Angela Yu",
        "author": {
            "name": "Dr. Angela Yu",
            "role": "Lead Instructor at App Brewery",
            "image": "/professional-user.png",
            "bio": "Angela is the lead instructor at the London App Brewery."
        },
        "rating": 4.8,
        "reviews": 289012,
        "students": 1203948,
        "price": "₦18,900",
        "originalPrice": "₦79,900",
        "discount": "76% off",
        "bestseller": true,
        "image": "/course-angela.jpg",
        "language": "English",
        "lastUpdated": "01/2025",
        "description": "Welcome to the 100 Days of Code.",
        "whatYouWillLearn": [],
        "curriculum": [],
        "progress": 2,
        "lastAccessed": "Just now"
    }
]

export function useEnrolledCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate API fetch
        const timer = setTimeout(() => {
            setEnrolledCourses(MOCK_ENROLLED_COURSES)
            setIsLoading(false)
        }, 800)

        return () => clearTimeout(timer)
    }, [])

    return {
        enrolledCourses,
        isLoading
    }
}

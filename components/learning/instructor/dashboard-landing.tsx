"use client"

import { Button } from "@/components/ui/button"
import { Monitor, Users, Video } from "lucide-react"

export function DashboardLanding({ onCreateCourse }: { onCreateCourse: () => void }) {
    return (
        <div className="space-y-8 max-w-5xl mx-auto py-8">
            {/* Hero Section */}
            <div className="bg-white p-8 rounded-none border shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-gray-800">Jump Into Course Creation</h2>
                        <p className="text-gray-600">Create your course and start teaching today.</p>
                    </div>
                    <Button
                        onClick={onCreateCourse}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold h-12 px-8 text-base rounded-none"
                    >
                        Create Your Course
                    </Button>
                </div>
            </div>

            <div className="text-center py-4">
                <p className="text-sm text-gray-500">Based on your experience, we think these resources will be helpful.</p>
            </div>

            {/* Engaging Course Section */}
            <div className="bg-white p-8 rounded-none border shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 flex justify-center">
                        {/* Placeholder for illustration */}
                        <div className="w-48 h-32 bg-gray-100 flex items-center justify-center rounded-md">
                            <Monitor className="h-16 w-16 text-purple-200" />
                        </div>
                    </div>
                    <div className="flex-[2] space-y-4 text-center md:text-left">
                        <h3 className="text-xl font-bold text-gray-800">Create an Engaging Course</h3>
                        <p className="text-gray-600">
                            Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.
                        </p>
                        <Button variant="link" className="text-purple-600 p-0 h-auto font-semibold">
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Video Section */}
                <div className="bg-white p-8 rounded-none border shadow-sm flex gap-6 items-start">
                    <div className="shrink-0">
                        <div className="h-12 w-12 bg-gray-100 flex items-center justify-center rounded-full">
                            <Video className="h-6 w-6 text-gray-600" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-800">Get Started with Video</h3>
                        <p className="text-sm text-gray-600">
                            Quality video lectures can set your course apart. Use our resources to learn the basics.
                        </p>
                        <Button variant="link" className="text-purple-600 p-0 h-auto font-semibold">
                            Get Started
                        </Button>
                    </div>
                </div>

                {/* Audience Section */}
                <div className="bg-white p-8 rounded-none border shadow-sm flex gap-6 items-start">
                    <div className="shrink-0">
                        <div className="h-12 w-12 bg-gray-100 flex items-center justify-center rounded-full">
                            <Users className="h-6 w-6 text-gray-600" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-800">Build Your Audience</h3>
                        <p className="text-sm text-gray-600">
                            Set your course up for success by building your audience.
                        </p>
                        <Button variant="link" className="text-purple-600 p-0 h-auto font-semibold">
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

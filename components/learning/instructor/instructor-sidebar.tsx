"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, BookOpen, MessageSquare, Settings, Video, HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface InstructorSidebarProps {
    className?: string
    activeTab?: string
    onTabChange?: (tab: string) => void
}

export function InstructorSidebar({ className, activeTab = "dashboard", onTabChange }: InstructorSidebarProps) {
    return (
        <div className={cn("pb-12 h-full bg-[#1c1d1f] text-white", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:border-l-4 data-[active=true]:border-purple-500 data-[active=true]:bg-gray-800 rounded-none pl-4"
                            data-active={activeTab === "courses"}
                            onClick={() => onTabChange?.("courses")}
                        >
                            <BookOpen className="mr-4 h-5 w-5" />
                            Courses
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:border-l-4 data-[active=true]:border-purple-500 data-[active=true]:bg-gray-800 rounded-none pl-4"
                            data-active={activeTab === "communication"}
                            onClick={() => onTabChange?.("communication")}
                        >
                            <MessageSquare className="mr-4 h-5 w-5" />
                            Communication
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:border-l-4 data-[active=true]:border-purple-500 data-[active=true]:bg-gray-800 rounded-none pl-4"
                            data-active={activeTab === "performance"}
                            onClick={() => onTabChange?.("performance")}
                        >
                            <BarChart3 className="mr-4 h-5 w-5" />
                            Performance
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:border-l-4 data-[active=true]:border-purple-500 data-[active=true]:bg-gray-800 rounded-none pl-4"
                            data-active={activeTab === "tools"}
                            onClick={() => onTabChange?.("tools")}
                        >
                            <Settings className="mr-4 h-5 w-5" />
                            Tools
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:border-l-4 data-[active=true]:border-purple-500 data-[active=true]:bg-gray-800 rounded-none pl-4"
                            data-active={activeTab === "resources"}
                            onClick={() => onTabChange?.("resources")}
                        >
                            <HelpCircle className="mr-4 h-5 w-5" />
                            Resources
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

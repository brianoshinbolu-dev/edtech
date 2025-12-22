"use client"

import { ArrowLeft, LayoutList, Settings, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CourseEditorLayoutProps {
    course: any
    activeStep: string
    onStepChange: (step: string) => void
    onBack: () => void
    children: React.ReactNode
}

export function CourseEditorLayout({
    course,
    activeStep,
    onStepChange,
    onBack,
    children
}: CourseEditorLayoutProps) {

    const steps = [
        { id: "basics", label: "Basics", icon: FileText },
        { id: "curriculum", label: "Curriculum", icon: LayoutList },
        { id: "settings", label: "Settings", icon: Settings },
    ]

    return (
        <div className="flex h-screen flex-col bg-background">
            {/* Header */}
            <div className="border-b px-6 py-3 flex items-center justify-between bg-card text-card-foreground">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col">
                        <span className="font-semibold text-lg flex items-center gap-2">
                            {course.title}
                            <Badge variant={course.status === "published" ? "default" : "secondary"}>
                                {course.status}
                            </Badge>
                        </span>
                        <span className="text-xs text-muted-foreground">Draft saved just now</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Preview</Button>
                    {course.status !== "published" && (
                        <Button size="sm">Publish Course</Button>
                    )}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-60 border-r bg-muted/30 p-4 shrink-0 hidden md:block">
                    <div className="space-y-1">
                        {steps.map((step) => {
                            const Icon = step.icon
                            return (
                                <button
                                    key={step.id}
                                    onClick={() => onStepChange(step.id)}
                                    className={cn(
                                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                        activeStep === step.id
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {step.label}
                                    {/* In a real app we'd show completion checks here */}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

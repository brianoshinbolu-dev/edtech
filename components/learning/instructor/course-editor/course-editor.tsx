"use client"

import { useState } from "react"
import { CourseEditorLayout } from "./course-editor-layout"
import { CourseBasicsForm } from "./basics-form"
import { CurriculumBuilder } from "./curriculum-builder"

interface CourseEditorProps {
    course: any
    onBack: () => void
    onSave: (updatedCourse: any) => void
}

export function CourseEditor({ course, onBack, onSave }: CourseEditorProps) {
    const [activeStep, setActiveStep] = useState("basics")
    const [currentCourse, setCurrentCourse] = useState(course)

    // When sub-components save, we update local state and notify parent
    const handleUpdate = (updated: any) => {
        setCurrentCourse(updated)
        onSave(updated)
    }

    const renderStep = () => {
        switch (activeStep) {
            case "basics":
                return <CourseBasicsForm course={currentCourse} onSave={handleUpdate} />
            case "curriculum":
                return <CurriculumBuilder course={currentCourse} onSave={handleUpdate} />
            case "settings":
                return (
                    <div className="text-center py-20 text-muted-foreground">
                        Settings (Price, Coupons, Status) coming soon.
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <CourseEditorLayout
            course={currentCourse}
            activeStep={activeStep}
            onStepChange={setActiveStep}
            onBack={onBack}
        >
            {renderStep()}
        </CourseEditorLayout>
    )
}

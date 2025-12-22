"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import {
    GripVertical,
    Plus,
    Trash2,
    Edit,
    ChevronDown,
    ChevronRight,
    FileVideo,
    FileText,
    HelpCircle,
    FolderOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { updateCourseCurriculum } from "@/lib/actions"

interface CurriculumBuilderProps {
    course: any
    onSave: (updatedCourse: any) => void
}

export function CurriculumBuilder({ course, onSave }: CurriculumBuilderProps) {
    // Deep clone to avoid mutating props directly
    const [sections, setSections] = useState<any[]>(course.sections || [])
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    // Helper to update specific section/module/unit
    const addSection = () => {
        setSections([...sections, {
            id: `sec_${Date.now()}`,
            title: "New Section",
            modules: []
        }])
    }

    const addModule = (sectionIndex: number) => {
        const newSections = [...sections]
        newSections[sectionIndex].modules.push({
            id: `mod_${Date.now()}`,
            title: "New Module",
            units: []
        })
        setSections(newSections)
    }

    const addUnit = (sectionIndex: number, moduleIndex: number, type: string) => {
        const newSections = [...sections]
        newSections[sectionIndex].modules[moduleIndex].units.push({
            id: `u_${Date.now()}`,
            title: `New ${type}`,
            type: type,
            duration: "00:00"
        })
        setSections(newSections)
    }

    const updateTitle = (id: string, newTitle: string, type: 'section' | 'module' | 'unit') => {
        // Recursive or structured update would be better, but implementing simple deep search for MVP
        const newSections = JSON.parse(JSON.stringify(sections))

        if (type === 'section') {
            const sec = newSections.find((s: any) => s.id === id)
            if (sec) sec.title = newTitle;
        } else if (type === 'module') {
            newSections.forEach((s: any) => {
                const mod = s.modules.find((m: any) => m.id === id)
                if (mod) mod.title = newTitle;
            })
        } else {
            newSections.forEach((s: any) => {
                s.modules.forEach((m: any) => {
                    const u = m.units.find((u: any) => u.id === id)
                    if (u) u.title = newTitle;
                })
            })
        }
        setSections(newSections)
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            await updateCourseCurriculum(course.id, sections)
            toast({ title: "Curriculum Saved", description: "All changes have been published." })
        } catch (error) {
            toast({ title: "Error", description: "Failed to save curriculum.", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Curriculum</h2>
                <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            <div className="space-y-4">
                {sections.map((section: any, sIdx: number) => (
                    <div key={section.id} className="border rounded-lg bg-card p-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                            <Input
                                value={section.title}
                                onChange={(e) => updateTitle(section.id, e.target.value, 'section')}
                                className="font-bold text-lg border-none bg-transparent hover:bg-muted focus:bg-background h-auto py-1 px-2"
                            />
                            <div className="ml-auto flex gap-2">
                                <Button size="sm" variant="secondary" onClick={() => addModule(sIdx)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Module
                                </Button>
                                <Button size="icon" variant="ghost" className="text-destructive h-8 w-8">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="pl-6 border-l-2 ml-2 space-y-4">
                            {section.modules?.length === 0 && (
                                <div className="text-center text-sm text-muted-foreground py-4 border border-dashed rounded">
                                    No modules in this section. Add one to start adding content.
                                </div>
                            )}
                            {section.modules?.map((module: any, mIdx: number) => (
                                <div key={module.id} className="bg-muted/30 rounded-md p-3 border">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FolderOpen className="h-4 w-4 text-primary" />
                                        <Input
                                            value={module.title}
                                            onChange={(e) => updateTitle(module.id, e.target.value, 'module')}
                                            className="font-medium bg-transparent hover:bg-muted focus:bg-background h-8"
                                        />
                                        <div className="ml-auto flex gap-2">
                                            <Select onValueChange={(v) => addUnit(sIdx, mIdx, v)}>
                                                <SelectTrigger className="h-8 w-[130px]">
                                                    <div className="flex items-center text-xs">
                                                        <Plus className="h-3 w-3 mr-1" />
                                                        Add Content
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="video">Video</SelectItem>
                                                    <SelectItem value="article">Article</SelectItem>
                                                    <SelectItem value="quiz">Quiz</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pl-4">
                                        {module.units?.length === 0 && (
                                            <div className="text-xs text-muted-foreground italic">Empty module</div>
                                        )}
                                        {module.units?.map((unit: any) => (
                                            <div key={unit.id} className="flex items-center gap-3 bg-background p-2 rounded border text-sm group">
                                                {unit.type === 'video' && <FileVideo className="h-4 w-4 text-blue-500" />}
                                                {unit.type === 'article' && <FileText className="h-4 w-4 text-green-500" />}
                                                {unit.type === 'quiz' && <HelpCircle className="h-4 w-4 text-orange-500" />}

                                                <span className="flex-1">{unit.title}</span> {/* Editable in future */}

                                                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                                                    <Button size="icon" variant="ghost" className="h-6 w-6">
                                                        <Edit className="h-3 w-3" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive">
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Button variant="outline" className="w-full py-8 border-dashed" onClick={addSection}>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
            </Button>
        </div>
    )
}

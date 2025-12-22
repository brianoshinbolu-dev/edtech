"use client"

import { useState } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet"
import { createCourse } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

interface CreateCourseSheetProps {
    onCourseCreated: () => void
}

export function CreateCourseSheet({ onCourseCreated }: CreateCourseSheetProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        price: "",
        category: "",
        description: "",
        image: "/course-placeholder.jpg"
    })
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await createCourse({
                ...formData,
                price: `₦${formData.price}`,
                originalPrice: `₦${(parseInt(formData.price) * 1.5).toFixed(0)}`, // Mock algo
                discount: "New!",
                whatYouWillLearn: ["To be added"]
            })

            toast({
                title: "Course created",
                description: "Your new course draft has been created successfully."
            })

            onCourseCreated()
            setOpen(false)
            setFormData({
                title: "",
                subtitle: "",
                price: "",
                category: "",
                description: "",
                image: "/course-placeholder.jpg"
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create course. Please try again.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Course
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Create New Course</SheetTitle>
                    <SheetDescription>
                        Start building your new course. You can add curriculum content later.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Course Title</Label>
                        <Input
                            id="title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Advanced React Patterns"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input
                            id="subtitle"
                            required
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            placeholder="A brief summary of what students will learn"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g. Development"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₦)</Label>
                            <Input
                                id="price"
                                type="number"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="19900"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Markdown supported)</Label>
                        <Textarea
                            id="description"
                            className="h-32"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Detailed description of the course..."
                        />
                    </div>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </SheetClose>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Course
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}

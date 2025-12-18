import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trophy } from "lucide-react"

interface SkillPathCardProps {
    title: string
    description: string
    courseCount: number
    image: string
}

export function SkillPathCard({ title, description, courseCount, image }: SkillPathCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-32 bg-slate-900">
                <img src={image} alt={title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-0">
                        Learning Path
                    </Badge>
                </div>
            </div>
            <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-1.5">
                        <BookOpen className="size-4 text-primary" />
                        {courseCount} Courses
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Trophy className="size-4 text-yellow-600" />
                        Certification
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

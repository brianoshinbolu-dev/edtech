import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MapPin, Users } from "lucide-react"

interface CompanyHoverCardProps {
    children: React.ReactNode
    companyName: string
    location?: string
    description?: string
}

export function CompanyHoverCard({ children, companyName, location, description }: CompanyHoverCardProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <span className="cursor-pointer underline decoration-dotted underline-offset-2 hover:text-primary">
                    {children}
                </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src="/company-logo.png" />
                        <AvatarFallback>{companyName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{companyName}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {description || "A leading company in the technology sector, focused on innovation and growth."}
                        </p>
                        <div className="flex items-center pt-2">
                            <Users className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">1,000+ employees</span>
                        </div>
                        {location && (
                            <div className="flex items-center pt-1">
                                <MapPin className="mr-2 h-4 w-4 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">{location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

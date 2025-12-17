import { TopNav } from "@/components/navigation/top-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus } from "lucide-react"

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        <h1 className="mb-6 font-sans text-3xl font-bold">My Network</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Alice Chen", role: "Product Designer", connections: 289 },
            { name: "Bob Smith", role: "Software Engineer", connections: 412 },
            { name: "Carol Johnson", role: "Data Scientist", connections: 356 },
            { name: "David Lee", role: "Marketing Manager", connections: 523 },
            { name: "Emma Wilson", role: "UX Researcher", connections: 198 },
            { name: "Frank Martinez", role: "DevOps Engineer", connections: 445 },
          ].map((person, i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <Avatar className="mx-auto size-20">
                  <AvatarImage src={`/network-${i}.jpg`} />
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-3 font-sans text-base font-semibold">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{person.connections} connections</p>
                <Button className="mt-4 w-full gap-2">
                  <UserPlus className="size-4" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

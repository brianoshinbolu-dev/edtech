import { TopNav } from "@/components/navigation/top-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Send } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        <h1 className="mb-6 font-sans text-3xl font-bold">Messages</h1>

        <Card className="h-[600px]">
          <div className="flex h-full">
            {/* Conversation List */}
            <div className="w-80 border-r">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search messages..." className="pl-10" />
                </div>
              </div>
              <div className="overflow-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    className="flex w-full items-center gap-3 border-b p-4 transition-colors hover:bg-accent"
                  >
                    <Avatar>
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-sans text-sm font-medium">User {i}</p>
                      <p className="text-xs text-muted-foreground">Latest message preview...</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex flex-1 flex-col">
              <div className="flex-1 p-4">
                <p className="text-center text-sm text-muted-foreground">Select a conversation to view messages</p>
              </div>
              <div className="flex gap-2 border-t p-4">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon">
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}

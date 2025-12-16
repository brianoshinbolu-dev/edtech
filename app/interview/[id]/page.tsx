"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Video, Phone, MessageSquare, FileText, Clock, MoreVertical, Maximize2 } from "lucide-react"

export default function InterviewRoomPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-sans text-lg font-bold text-primary-foreground">L</span>
          </div>
          <div>
            <h1 className="font-sans text-sm font-semibold">Interview: Frontend Developer</h1>
            <p className="text-xs text-muted-foreground">with Sarah Johnson</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5">
            <Clock className="size-4 text-primary" />
            <span className="font-sans text-sm font-medium">24:35</span>
          </div>
          <Button variant="ghost" size="icon-sm">
            <MoreVertical className="size-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Video and Controls */}
        <div className="flex flex-1 flex-col">
          {/* Video Grid */}
          <div className="flex-1 grid gap-2 p-4 md:grid-cols-2">
            {/* Candidate Video */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="absolute bottom-4 left-4 z-10">
                <Badge className="bg-background/90">Sarah Johnson (Candidate)</Badge>
              </div>
              <Button
                size="icon-sm"
                variant="ghost"
                className="absolute right-4 top-4 z-10 bg-background/90 hover:bg-background"
              >
                <Maximize2 className="size-4" />
              </Button>
            </Card>

            {/* Interviewer Video */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-muted/30" />
              <div className="absolute bottom-4 left-4 z-10">
                <Badge className="bg-background/90">You (Interviewer)</Badge>
              </div>
            </Card>
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-center gap-3 border-t bg-card p-4">
            <Button size="icon" variant="outline" className="size-12 rounded-full bg-background">
              <Mic className="size-5" />
            </Button>
            <Button size="icon" variant="outline" className="size-12 rounded-full bg-background">
              <Video className="size-5" />
            </Button>
            <Button size="icon" variant="destructive" className="size-14 rounded-full">
              <Phone className="size-6" />
            </Button>
            <Button size="icon" variant="outline" className="size-12 rounded-full bg-background">
              <MessageSquare className="size-5" />
            </Button>
            <Button size="icon" variant="outline" className="size-12 rounded-full bg-background">
              <FileText className="size-5" />
            </Button>
          </div>
        </div>

        {/* Right Side - Tabs for Notes and Coding */}
        <aside className="w-96 border-l bg-card">
          <Tabs defaultValue="notes" className="flex h-full flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="test">Coding Test</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-sans text-sm font-semibold">Interview Notes</h3>
                  <Textarea placeholder="Take notes during the interview..." className="min-h-[200px] resize-none" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-sans text-sm font-semibold">Questions</h3>
                  <div className="space-y-2">
                    {[
                      "Tell me about your experience with React",
                      "Explain the difference between props and state",
                      "Describe a challenging project you worked on",
                      "How do you handle performance optimization?",
                    ].map((question, i) => (
                      <Card key={i} className="cursor-pointer transition-colors hover:bg-accent">
                        <CardContent className="p-3">
                          <p className="text-sm leading-relaxed">{question}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-sans text-sm font-semibold">Rating</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button key={star} variant="outline" size="sm">
                        {star}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="test" className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-sans text-sm font-semibold">Live Coding Challenge</h3>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">React Component Challenge</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Create a custom React hook that fetches data from an API and handles loading and error states.
                      </p>
                      <div className="rounded-lg bg-muted p-3">
                        <code className="font-mono text-xs">
                          {`function useFetch(url) {
  // Implement here
}`}
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-2 font-sans text-sm font-semibold">Candidate Solution</h3>
                  <Card className="bg-muted/50">
                    <CardContent className="p-3">
                      <pre className="font-mono text-xs">
                        {`const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(url)
    .then(res => res.json())
    .then(setData)
    .finally(() => setLoading(false));
}, [url]);`}
                      </pre>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Share Screen
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Full Code
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="mx-auto mb-3 size-20 rounded-full bg-primary/10" />
                  <h3 className="font-sans text-base font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Frontend Developer</p>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Next.js", "CSS", "Testing"].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-sans text-sm font-medium">Senior Frontend Developer</p>
                      <p className="text-xs text-muted-foreground">Tech Corp • 2021 - Present</p>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium">Frontend Developer</p>
                      <p className="text-xs text-muted-foreground">Digital Co • 2018 - 2021</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Test Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Technical Assessment</span>
                      <span className="text-xl font-bold text-primary">85%</span>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full">View Full Profile</Button>
              </div>
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  )
}

import { TopNav } from "@/components/navigation/top-nav"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageCircle, Share2, TrendingUp, Briefcase } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-12">
          {/* Left Sidebar - Profile Summary */}
          <aside className="md:col-span-3">
            <Card>
              <CardContent className="p-0">
                <div className="h-16 bg-primary/10" />
                <div className="px-4 pb-4">
                  <Avatar className="size-16 -mt-8 border-4 border-card">
                    <AvatarImage src="/professional-user.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 font-sans text-base font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Senior Product Manager</p>
                  <div className="mt-4 flex justify-between border-t pt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Connections</p>
                      <p className="font-semibold">583</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Views</p>
                      <p className="font-semibold">1,247</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Feed */}
          <section className="md:col-span-6 space-y-4">
            {/* Post Creation Box */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/user-profile-illustration.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Textarea placeholder="Share your thoughts or updates..." className="min-h-[80px] resize-none" />
                </div>
                <div className="mt-3 flex justify-end">
                  <Button>Post</Button>
                </div>
              </CardContent>
            </Card>

            {/* Feed Posts */}
            {[1, 2, 3].map((post) => (
              <Card key={post}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={`/user-.jpg?height=40&width=40&query=user+${post}`} />
                      <AvatarFallback>U{post}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-sans text-sm font-semibold">Sarah Johnson</h4>
                      <p className="text-xs text-muted-foreground">UX Designer at Tech Corp • 2h ago</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pb-3">
                  <p className="text-sm leading-relaxed">
                    Just completed an amazing course on Advanced React Patterns! The things you can do with custom hooks
                    and composition patterns are incredible. Highly recommend to anyone looking to level up their React
                    skills.
                  </p>

                  <div className="flex items-center gap-6 border-t pt-3">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUp className="size-4" />
                      <span className="text-xs">Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="size-4" />
                      <span className="text-xs">Comment</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="size-4" />
                      <span className="text-xs">Share</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Right Sidebar */}
          <aside className="md:col-span-3 space-y-4">
            {/* Trending Courses */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  <h3 className="font-sans text-sm font-semibold">Trending Courses</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                {["Advanced TypeScript", "System Design", "AWS Solutions Architect"].map((course) => (
                  <button key={course} className="block w-full text-left hover:bg-accent rounded p-2 transition-colors">
                    <p className="font-sans text-sm font-medium">{course}</p>
                    <p className="text-xs text-muted-foreground">2,345 enrolled</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Featured Jobs */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="size-4 text-primary" />
                  <h3 className="font-sans text-sm font-semibold">Featured Jobs</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                {["Senior Frontend Developer", "Product Manager", "UX Researcher"].map((job) => (
                  <button key={job} className="block w-full text-left hover:bg-accent rounded p-2 transition-colors">
                    <p className="font-sans text-sm font-medium">{job}</p>
                    <p className="text-xs text-muted-foreground">Tech Company • Remote</p>
                  </button>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

import { TopNav } from "@/components/navigation/top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Star, Users, Award, BookOpen, PlayCircle } from "lucide-react"

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold">My Learning</h1>
          <p className="mt-2 text-muted-foreground">Continue your journey and explore new courses</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-8">
            {/* In Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-sans text-xl">
                  <PlayCircle className="size-5 text-primary" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Advanced React Patterns",
                    instructor: "Sarah Wilson",
                    progress: 65,
                    timeLeft: "2h 30m left",
                  },
                  {
                    title: "System Design Fundamentals",
                    instructor: "Michael Chen",
                    progress: 42,
                    timeLeft: "4h 15m left",
                  },
                ].map((course, i) => (
                  <Card key={i} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-sans text-base font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{course.progress}% complete</span>
                              <span className="text-muted-foreground">{course.timeLeft}</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                        <Button>Continue</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-xl">Recommended for You</CardTitle>
                <CardDescription>Based on your interests and career goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "AWS Solutions Architect",
                      instructor: "James Rodriguez",
                      rating: 4.8,
                      students: 12450,
                      duration: "8 hours",
                      level: "Intermediate",
                    },
                    {
                      title: "Product Management Mastery",
                      instructor: "Emma Thompson",
                      rating: 4.9,
                      students: 8230,
                      duration: "6 hours",
                      level: "Advanced",
                    },
                    {
                      title: "TypeScript Deep Dive",
                      instructor: "David Park",
                      rating: 4.7,
                      students: 15680,
                      duration: "5 hours",
                      level: "Intermediate",
                    },
                    {
                      title: "UI/UX Design Principles",
                      instructor: "Lisa Anderson",
                      rating: 4.9,
                      students: 9870,
                      duration: "7 hours",
                      level: "Beginner",
                    },
                  ].map((course, i) => (
                    <Card key={i} className="overflow-hidden transition-shadow hover:shadow-md">
                      <div className="h-32 bg-primary/5" />
                      <CardContent className="p-4">
                        <h3 className="font-sans text-base font-semibold leading-tight">{course.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">by {course.instructor}</p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="size-3 fill-primary text-primary" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="size-3" />
                            {course.students.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {course.duration}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <Badge variant="secondary">{course.level}</Badge>
                          <Button size="sm">Enroll</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-sans text-xl">
                  <BookOpen className="size-5 text-primary" />
                  Skill Paths
                </CardTitle>
                <CardDescription>Curated learning paths to master in-demand skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: "Full-Stack Web Development",
                    courses: 8,
                    duration: "40 hours",
                    enrolled: 5420,
                  },
                  {
                    title: "Cloud Architecture & DevOps",
                    courses: 6,
                    duration: "32 hours",
                    enrolled: 3890,
                  },
                  {
                    title: "Data Science & Machine Learning",
                    courses: 10,
                    duration: "55 hours",
                    enrolled: 7240,
                  },
                ].map((path, i) => (
                  <Card key={i} className="border-2 transition-shadow hover:shadow-md">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex-1">
                        <h3 className="font-sans text-base font-semibold">{path.title}</h3>
                        <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span>{path.courses} courses</span>
                          <span>•</span>
                          <span>{path.duration}</span>
                          <span>•</span>
                          <span>{path.enrolled.toLocaleString()} enrolled</span>
                        </div>
                      </div>
                      <Button variant="outline">View Path</Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            {/* My Certificates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-sans text-base">
                  <Award className="size-5 text-primary" />
                  My Certificates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Advanced React Certification", "AWS Cloud Practitioner", "Agile Scrum Master"].map((cert, i) => (
                  <div key={i} className="rounded-lg border bg-primary/5 p-3">
                    <div className="flex items-start gap-3">
                      <Award className="size-5 shrink-0 text-primary" />
                      <div className="flex-1">
                        <p className="font-sans text-sm font-medium leading-tight">{cert}</p>
                        <p className="text-xs text-muted-foreground">Completed Dec 2024</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-base">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-primary">87</p>
                  <p className="text-sm text-muted-foreground">Hours Learned</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-primary">5</p>
                  <p className="text-sm text-muted-foreground">Certificates Earned</p>
                </div>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-base">Weekly Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Complete 5 hours of learning</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>3.5 / 5 hours</span>
                    <span className="font-medium text-primary">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

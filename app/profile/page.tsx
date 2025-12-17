import { TopNav } from "@/components/navigation/top-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Pencil, Award, Briefcase, GraduationCap } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />

      <main className="mx-auto max-w-screen-lg px-4 py-6">
        {/* Profile Header Card */}
        <Card className="mb-6 shadow-md">
          <div className="h-32 bg-primary/10" />
          <CardContent className="px-6 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <Avatar className="size-32 -mt-16 border-4 border-card">
                  <AvatarImage src="/profile-photo.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h1 className="font-sans text-2xl font-bold">John Doe</h1>
                  <p className="text-base text-muted-foreground">Senior Product Manager at Tech Innovations Inc.</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      San Francisco, CA
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="size-4" />
                      john.doe@email.com
                    </span>
                  </div>
                </div>
              </div>
              <Button className="gap-2">
                <Pencil className="size-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 md:col-span-2">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  Experienced product manager with a passion for building user-centric solutions. Specialized in SaaS
                  products, agile methodologies, and cross-functional team leadership. Always learning and growing
                  through continuous education.
                </p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-sans text-lg">
                  <Briefcase className="size-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    title: "Senior Product Manager",
                    company: "Tech Innovations Inc.",
                    period: "2021 - Present",
                    description: "Leading product strategy and roadmap for enterprise SaaS platform.",
                  },
                  {
                    title: "Product Manager",
                    company: "Digital Solutions Co.",
                    period: "2018 - 2021",
                    description: "Managed development of mobile and web applications for B2C markets.",
                  },
                ].map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded bg-primary/10">
                      <Briefcase className="size-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-sans text-base font-semibold">{exp.title}</h3>
                      <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-sans text-lg">
                  <GraduationCap className="size-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded bg-primary/10">
                    <GraduationCap className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans text-base font-semibold">Master of Business Administration</h3>
                    <p className="text-sm font-medium text-muted-foreground">Stanford University</p>
                    <p className="text-sm text-muted-foreground">2016 - 2018</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded bg-primary/10">
                    <GraduationCap className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans text-base font-semibold">Bachelor of Science in Computer Science</h3>
                    <p className="text-sm font-medium text-muted-foreground">UC Berkeley</p>
                    <p className="text-sm text-muted-foreground">2012 - 2016</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-sans text-lg">
                  <Award className="size-5" />
                  Certifications from Completed Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "AWS Certified Solutions Architect",
                  "Advanced React Patterns",
                  "Product Management Professional Certificate",
                  "Agile Scrum Master Certification",
                ].map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                    <Award className="size-5 text-primary" />
                    <span className="font-sans text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-base">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Product Strategy",
                    "Agile",
                    "User Research",
                    "Data Analysis",
                    "Leadership",
                    "React",
                    "TypeScript",
                    "AWS",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-base">Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">583</p>
                  <p className="text-sm text-muted-foreground">Connections</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">1,247</p>
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

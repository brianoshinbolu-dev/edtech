import { TopNav } from "@/components/navigation/top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, DollarSign, Clock, Building2, Search } from "lucide-react"
import { CompanyHoverCard } from "@/components/jobs/company-hover-card"

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-sans text-3xl font-bold">Find Your Next Opportunity</h1>
          <p className="mt-2 text-muted-foreground">Discover jobs that match your skills and career goals</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans text-base">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="sf">San Francisco, CA</SelectItem>
                      <SelectItem value="ny">New York, NY</SelectItem>
                      <SelectItem value="sea">Seattle, WA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select>
                    <SelectTrigger id="jobType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="intern">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select>
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="lead">Lead/Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Minimum Salary</Label>
                  <Select>
                    <SelectTrigger id="salary">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50k">$50,000+</SelectItem>
                      <SelectItem value="75k">$75,000+</SelectItem>
                      <SelectItem value="100k">$100,000+</SelectItem>
                      <SelectItem value="150k">$150,000+</SelectItem>
                      <SelectItem value="200k">$200,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </aside>

          {/* Job Listings */}
          <section className="lg:col-span-9 space-y-4">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search by job title, company, or keyword..." className="pl-10" />
                </div>
              </CardContent>
            </Card>

            {/* Job Cards */}
            {[
              {
                title: "Senior Product Manager",
                company: "TechCorp Inc.",
                location: "San Francisco, CA",
                type: "Full-time",
                salary: "$140k - $180k",
                posted: "2 days ago",
                remote: true,
                description:
                  "We're looking for an experienced Product Manager to lead our flagship SaaS product. You'll work with engineering, design, and business teams to define product strategy and roadmap.",
                skills: ["Product Strategy", "Agile", "Data Analysis", "Leadership"],
              },
              {
                title: "Frontend Engineer (React)",
                company: "Digital Solutions Co.",
                location: "Remote",
                type: "Full-time",
                salary: "$120k - $160k",
                posted: "5 days ago",
                remote: true,
                description:
                  "Join our engineering team to build beautiful, performant web applications using React, TypeScript, and modern web technologies. We value clean code and user experience.",
                skills: ["React", "TypeScript", "Next.js", "CSS"],
              },
              {
                title: "UX Designer",
                company: "Creative Studios",
                location: "New York, NY",
                type: "Full-time",
                salary: "$100k - $130k",
                posted: "1 week ago",
                remote: false,
                description:
                  "We're seeking a talented UX Designer to create intuitive, user-centered designs for our mobile and web applications. Strong portfolio required.",
                skills: ["Figma", "User Research", "Prototyping", "UI Design"],
              },
              {
                title: "DevOps Engineer",
                company: "Cloud Innovations",
                location: "Seattle, WA",
                type: "Full-time",
                salary: "$130k - $170k",
                posted: "3 days ago",
                remote: true,
                description:
                  "Help us build and maintain scalable cloud infrastructure. Experience with AWS, Docker, and Kubernetes is essential. You'll work on CI/CD pipelines and infrastructure automation.",
                skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
              },
              {
                title: "Data Scientist",
                company: "AI Labs",
                location: "Boston, MA",
                type: "Full-time",
                salary: "$150k - $200k",
                posted: "4 days ago",
                remote: true,
                description:
                  "We're looking for a Data Scientist to develop machine learning models and derive insights from large datasets. Strong statistics and programming skills required.",
                skills: ["Python", "Machine Learning", "SQL", "Statistics"],
              },
            ].map((job, i) => (
              <Card key={i} className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded bg-primary/10">
                        <Building2 className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="font-sans text-lg">{job.title}</CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-2 text-sm">
                          <CompanyHoverCard companyName={job.company} location={job.location}>
                            <span className="font-medium">{job.company}</span>
                          </CompanyHoverCard>
                        </CardDescription>
                      </div>
                    </div>
                    <Button>Apply</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="size-4" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="size-4" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {job.posted}
                    </span>
                  </div>

                  {job.remote && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Remote
                    </Badge>
                  )}

                  <p className="leading-relaxed text-sm text-muted-foreground">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 border-t pt-4">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                    <Button className="flex-1">Apply with Profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { TopNav } from "@/components/navigation/top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, FileText, Mail, Phone, Users, ChevronRight, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

type Stage = "Applied" | "Test" | "Interview" | "Hired"

interface Candidate {
  id: number
  name: string
  role: string
  status: Stage
  appliedDate: string
  email: string
  phone: string
  skills: string[]
  experience: string
  testScore?: number
  interviewDate?: string
}

// Imports updated to include server actions
import { getCandidates, updateCandidateStatus } from "@/lib/actions"
import { useEffect } from "react"

const STAGES: Stage[] = ["Applied", "Test", "Interview", "Hired"]

export default function RecruitmentDashboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates()
        setCandidates(data)
      } catch (error) {
        console.error("Failed to fetch candidates", error)
      }
    }
    fetchCandidates()
  }, [])

  const handleMoveToNextStage = async (candidateId: number, currentStatus: Stage) => {
    const currentIndex = STAGES.indexOf(currentStatus)
    if (currentIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentIndex + 1]

      // Optimistic update
      setCandidates(prev => prev.map(c =>
        c.id === candidateId ? { ...c, status: nextStage } : c
      ))

      try {
        await updateCandidateStatus(candidateId, nextStage)
        toast({
          title: "Candidate Moved",
          description: `Candidate moved to ${nextStage} stage.`,
        })
      } catch (error) {
        console.error("Failed to update candidate status", error)
        // Revert optimistic update if needed
      }
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />
      <Toaster />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-sans text-3xl font-bold">Recruitment Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Manage your hiring pipeline</p>
          </div>
          <Button size="lg">Post New Job</Button>
        </div>

        {/* Stats Overview */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Applicants", value: candidates.length.toString(), icon: Users },
            { label: "In Review", value: candidates.filter(c => c.status === "Test").length.toString(), icon: FileText },
            { label: "Scheduled Interviews", value: candidates.filter(c => c.status === "Interview").length.toString(), icon: Calendar },
            { label: "Hired This Month", value: candidates.filter(c => c.status === "Hired").length.toString(), icon: CheckCircle2 },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Candidate Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans text-xl">Candidate Pipeline</CardTitle>
            <CardDescription>Track candidates through your hiring process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {STAGES.map((stage) => {
                const stageCandidates = candidates.filter((c) => c.status === stage)
                return (
                  <div key={stage}>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-sans text-base font-semibold">{stage}</h3>
                      <Badge variant="secondary">{stageCandidates.length}</Badge>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {stageCandidates.map((candidate) => (
                        <Dialog key={candidate.id}>
                          <DialogTrigger asChild>
                            <Card className="cursor-pointer transition-shadow hover:shadow-md">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <Avatar>
                                    <AvatarImage src={`/candidate-${candidate.id}.jpg`} />
                                    <AvatarFallback>
                                      {candidate.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-sans text-sm font-semibold truncate">{candidate.name}</h4>
                                    <p className="text-xs text-muted-foreground">{candidate.role}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                      Applied {candidate.appliedDate}
                                    </p>
                                    {candidate.testScore && (
                                      <Badge variant="secondary" className="mt-2">
                                        Test: {candidate.testScore}%
                                      </Badge>
                                    )}
                                    {candidate.interviewDate && (
                                      <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                                        <Calendar className="size-3" />
                                        {candidate.interviewDate}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>

                          {/* Candidate Detail Modal */}
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="font-sans text-xl">Candidate Profile</DialogTitle>
                              <DialogDescription>Detailed information and actions</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="flex items-start gap-4">
                                <Avatar className="size-20">
                                  <AvatarImage src={`/candidate-${candidate.id}.jpg`} />
                                  <AvatarFallback className="text-xl">
                                    {candidate.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="font-sans text-xl font-bold">{candidate.name}</h3>
                                  <p className="text-muted-foreground">{candidate.role}</p>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {candidate.skills.map((skill) => (
                                      <Badge key={skill} variant="secondary">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="grid gap-3 sm:grid-cols-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="size-4 text-muted-foreground" />
                                  <span>{candidate.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="size-4 text-muted-foreground" />
                                  <span>{candidate.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="size-4 text-muted-foreground" />
                                  <span>{candidate.experience} experience</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <FileText className="size-4 text-muted-foreground" />
                                  <span>Applied {candidate.appliedDate}</span>
                                </div>
                              </div>

                              {candidate.testScore && (
                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Test Results</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm">Technical Assessment</span>
                                      <span className="text-2xl font-bold text-primary">{candidate.testScore}%</span>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}

                              <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 bg-transparent">
                                  View Resume
                                </Button>
                                <Button variant="outline" className="flex-1 bg-transparent">
                                  Schedule Interview
                                </Button>
                                {candidate.status !== "Hired" && (
                                  <Button
                                    className="flex-1"
                                    onClick={() => handleMoveToNextStage(candidate.id, candidate.status)}
                                  >
                                    Move to {STAGES[STAGES.indexOf(candidate.status) + 1]}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Interview Calendar (Static for now as mostly display) */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-sans text-xl">
              <Calendar className="size-5 text-primary" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Emily Rodriguez", role: "UX Designer", time: "Tomorrow at 2:00 PM" },
                { name: "David Park", role: "DevOps Engineer", time: "Dec 20 at 10:00 AM" },
                { name: "Alex Thompson", role: "Backend Developer", time: "Dec 21 at 3:30 PM" },
              ].map((interview, i) => (
                <Card key={i} className="border-2">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {interview.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-sans text-sm font-semibold">{interview.name}</p>
                        <p className="text-xs text-muted-foreground">{interview.role}</p>
                        <p className="mt-1 text-xs text-primary">{interview.time}</p>
                      </div>
                    </div>
                    <Button size="sm">Join Interview</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

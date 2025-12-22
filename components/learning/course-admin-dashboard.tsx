"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Menu,
  BookOpen,
  MessageSquare,
  Users,
  Star
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { InstructorSidebar } from "./instructor/instructor-sidebar"
import { OverviewAnalytics } from "./instructor/overview-analytics"
import { CourseManager } from "./instructor/course-manager"
import { CommunicationCenter } from "./instructor/communication-center"
import { StudentList } from "./instructor/students/student-list"
import { ReviewsManager } from "./instructor/community/reviews-manager"
import { CourseEditor } from "./instructor/course-editor/course-editor"
import { DashboardLanding } from "./instructor/dashboard-landing"
import { CourseCreationWizard, WizardData } from "./instructor/course-creation-wizard"

import { getInstructorStats, getCourses, getStudents, getReviews } from "@/lib/actions"
import { Loader2 } from "lucide-react"

export function CourseAdminDashboard() {
  const [activeTab, setActiveTab] = useState("courses") // Default to courses like Udemy often does, or 'overview'
  const [stats, setStats] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCourse, setEditingCourse] = useState<any>(null)

  // Udemy default "landing" might be a specific view, let's call it "dashboard_landing" if activeTab is 'dashboard' or 'overview'
  // But wait, the user wants 'Courses' to be the tab...
  // In our sidebar we have: Courses, Communication, Performance, Tools, Resources.
  // The 'Landing' view we built ("Jump Into Course Creation") typically appears when you first log in or on "Courses" if empty? 
  // Let's make "Courses" the default tab but if the user wants the "Dashboard" view from the screenshot, that looked like a "Courses" page overview or a Home.
  // The screenshot shows "Courses" selected in sidebar.
  // So the "Jump Into Course Creation" view IS the Courses view when arguably empty or just the main view.
  // Let's map "courses" to the landing view IF there are no courses? Or just making it the default view as requested "replace formal dashboard".
  // Actually, the screenshot shows "Courses" active in sidebar.
  // So let's make `activeTab` default to "courses".

  /* State for Course Creation Wizard */
  const [isCreatingCourse, setIsCreatingCourse] = useState(false)

  const loadData = async () => {
    try {
      const [statsData, coursesData, studentsData, reviewsData] = await Promise.all([
        getInstructorStats(),
        getCourses(),
        getStudents(),
        getReviews()
      ])
      setStats(statsData)
      setCourses(coursesData)
      setStudents(studentsData)
      setReviews(reviewsData)
    } catch (error) {
      console.error("Failed to load instructor data", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // If creating a course, show wizard full screen
  if (isCreatingCourse) {
    return (
      <CourseCreationWizard
        onExit={() => setIsCreatingCourse(false)}
        onComplete={(data: WizardData) => {
          // Here we would normally save to DB
          // For now we simulate creating a draft and switching to editor
          const newCourse = {
            id: Date.now(), // temporary ID
            title: data.title,
            category: data.category,
            status: "draft",
            price: 0,
            students: 0,
            revenue: 0,
            image: "/placeholder-course.jpg"
          }
          setCourses([...courses, newCourse])
          setIsCreatingCourse(false)
          setEditingCourse(newCourse)
        }}
      />
    )
  }

  // If editing a course, show the editor full screen (replacing dashboard)
  if (editingCourse) {
    return (
      <CourseEditor
        course={editingCourse}
        onBack={() => {
          setEditingCourse(null)
          loadData() // Reload to catch any title changes etc
        }}
        onSave={(updated) => {
          // Update local list for immediate feedback
          setCourses(courses.map(c => c.id === updated.id ? updated : c))
          // Also update editing course reference
          setEditingCourse(updated)
        }}
      />
    )
  }

  const handleCreateCourseStart = () => {
    setIsCreatingCourse(true)
  }

  // For now, let's switch to a 'list' view or similar if we implement that separation.
  // If this landing IS the courses view, we need a way to actually see the list vs the landing.
  // Typically Udemy shows the list if you have courses.
  // The request is "replace the formal dashboard" with "Udemy instructor dashboard".
  // I will assume for now "Courses" tab shows `DashboardLanding` which has the create button.
  // But wait, `DashboardLanding` has a create button. The `CourseManager` HAS the list.
  // Let's render `DashboardLanding` if courses.length === 0, else `CourseManager`?
  // Or just put `DashboardLanding` as the specific 'overview' and maintain `CourseManager` for the list.
  // The sidebar in screenshot selects "Courses".
  // I will use `DashboardLanding` as the main content for "Courses" tab initially or maybe always at top?
  // Let's use `DashboardLanding` as the view for `courses` tab for now as requested. 
  // BUT, the user probably still wants to see their list. 
  // I'll make `DashboardLanding` the view for "courses" and stick the Course List logic inside it or below it?
  // Simpler: Use `DashboardLanding` for now.

  // actually, if I look at logic below:


  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-96"><Loader2 className="animate-spin text-primary" /></div>
    }

    switch (activeTab) {
      case "courses":
        return (
          <div className="space-y-6">
            <DashboardLanding onCreateCourse={handleCreateCourseStart} />

            {/* I will append the Course List (CourseManager) below it so functionality isn't lost */}
            {(courses.length > 0) && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-xl font-bold mb-4">Your Courses</h3>
                <CourseManager
                  courses={courses}
                  onCourseCreated={loadData}
                  onEditCourse={setEditingCourse}
                />
              </div>
            )}
            {courses.length === 0 && (
              <div className="hidden">
                {/* Hidden manager to keep the create sheet accessible if we hook it up later or via other buttons */}
                <CourseManager
                  courses={courses}
                  onCourseCreated={loadData}
                  onEditCourse={setEditingCourse}
                />
              </div>
            )}
          </div>
        )
      case "performance":
        return <OverviewAnalytics stats={stats} />
      case "students":
        return <StudentList students={students} />
      case "reviews": // mapped to Resources? No. 
        // Sidebar: Performance -> OverviewAnalytics
        // Sidebar: Communication -> CommunicationCenter?
        // Sidebar: Tools -> ? 
        // Sidebar: Resources -> ?
        return <ReviewsManager reviews={reviews} />
      case "communication":
        return <CommunicationCenter />
      default:
        return <div className="text-center py-20 text-muted-foreground">Component for {activeTab} under construction</div>
    }
  }

  return (
    <div className="flex min-h-screen bg-background rounded-lg border overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0">
        <InstructorSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="border-r-0"
        />
      </div>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center border-b p-4 bg-[#1c1d1f] text-white">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r-0 bg-[#1c1d1f] text-white">
              <InstructorSidebar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab)
                  // Close sheet? wrapper handles it usually or we need state.
                }}
              />
            </SheetContent>
          </Sheet>
          <h1 className="ml-4 font-bold">Instructor</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

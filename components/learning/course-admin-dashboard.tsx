"use client"

import { useState } from "react"
import { 
  BarChart3, 
  BookOpen, 
  DollarSign, 
  LayoutDashboard, 
  MoreVertical, 
  PenSquare, 
  Plus, 
  Search, 
  TrendingUp, 
  Users,
  LineChart as LineChartIcon,
  Trash2,
  Edit
} from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

// Mock Data
const revenueData = [
  { name: "Jan", total: 12000 },
  { name: "Feb", total: 18500 },
  { name: "Mar", total: 15000 },
  { name: "Apr", total: 24000 },
  { name: "May", total: 32000 },
  { name: "Jun", total: 38000 },
  { name: "Jul", total: 45000 },
  { name: "Aug", total: 52000 },
]

const topCourses = [
  {
    title: "Complete Web Development Bootcamp 2024",
    students: 1243,
    revenue: 111827.57,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&q=80"
  },
  {
    title: "Digital Marketing Masterclass",
    students: 892,
    revenue: 71351.08,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80"
  },
  {
    title: "Python for Data Science",
    students: 534,
    revenue: 50724.66,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=100&q=80"
  },
  {
    title: "UI/UX Design Fundamentals",
    students: 657,
    revenue: 45983.43,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=100&q=80"
  }
]

const recentCourses = [
  {
    title: "Complete Web Development Bootcamp 2024",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
    category: "Development",
    price: 89.99,
    students: 1243,
    revenue: 111827.57,
    status: "published",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=100&q=80"
  },
  {
    title: "Digital Marketing Masterclass",
    description: "Master SEO, Social Media, Email Marketing, and more",
    category: "Marketing",
    price: 79.99,
    students: 892,
    revenue: 71351.08,
    status: "published",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80"
  },
  {
    title: "Python for Data Science",
    description: "Learn Python, Pandas, NumPy, and Machine Learning",
    category: "Development",
    price: 94.99,
    students: 534,
    revenue: 50724.66,
    status: "draft",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=100&q=80"
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Create beautiful and user-friendly interfaces",
    category: "Design",
    price: 69.99,
    students: 657,
    revenue: 45983.43,
    status: "published",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=100&q=80"
  }
]

export function CourseAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Course Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage your courses and track performance</p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          New Course
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard" className="gap-2">
            <LayoutDashboard className="size-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="courses" className="gap-2">
            <BookOpen className="size-4" />
            My Courses
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="size-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$279,886.74</div>
                <p className="text-xs text-green-500 flex items-center font-medium">
                  <TrendingUp className="mr-1 size-3" />
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,326</div>
                <p className="text-xs text-muted-foreground">+180 new students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">1 draft, 3 published</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                <LineChartIcon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6</div>
                <p className="text-xs text-muted-foreground">+0.2 from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue Overview Chart */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <XAxis 
                        dataKey="name" 
                        stroke="#888888" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--background))", 
                          borderColor: "hsl(var(--border))" 
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "hsl(var(--primary))" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Courses */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Performing Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topCourses.map((course, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="size-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none line-clamp-1">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.students.toLocaleString()} students</p>
                      </div>
                      <div className="font-medium">
                        ${course.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Courses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>
                A list of your recent courses including their status and performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCourses.map((course, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="size-10 rounded-lg object-cover"
                          />
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium line-clamp-1 max-w-[200px]">{course.title}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>${course.price}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell className="text-right">${course.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={course.status === "published" ? "default" : "secondary"}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="size-8">
                            <Edit className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="size-8 text-destructive">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
            <Card>
                <CardHeader>
                    <CardTitle>My Courses</CardTitle>
                    <CardDescription>Manage your course catalog</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center py-8 text-muted-foreground">
                        My Courses Content (To Be Implemented)
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="analytics">
            <Card>
                <CardHeader>
                    <CardTitle>Detailed Analytics</CardTitle>
                    <CardDescription>Deep dive into your course performance</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center py-8 text-muted-foreground">
                        Analytics Content (To Be Implemented)
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

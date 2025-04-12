import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  BookOpen,
  DollarSign,
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sider";

export default function TeacherDashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center gap-2 px-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold">EduLearn</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/teacher/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/courses">
                    <BookOpen className="h-4 w-4" />
                    <span>My Courses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/students">
                    <Users className="h-4 w-4" />
                    <span>Students</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/analytics">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/earnings">
                    <DollarSign className="h-4 w-4" />
                    <span>Earnings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/messages">
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center gap-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                width={40}
                height={40}
                alt="User avatar"
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Sarah Johnson</span>
                <span className="text-xs text-muted-foreground">
                  sarah.johnson@example.com
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Teacher Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, Sarah! Here&apos;s your teaching summary.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline">View Analytics</Button>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Courses
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">
                  +324 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">
                  +$2,100 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">
                  +0.2 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="courses">
              <TabsList className="mb-4">
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="students">Recent Students</TabsTrigger>
                <TabsTrigger value="reviews">Latest Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="courses">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {teacherCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          width={400}
                          height={220}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-lg">
                          {course.title}
                        </CardTitle>
                        <CardDescription>
                          {course.students} students enrolled
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Revenue
                          </span>
                          <span className="text-sm font-medium">
                            ${course.revenue}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Rating
                          </span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">
                              {course.rating}
                            </span>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Last updated: {course.lastUpdated}
                          </span>
                          <Button size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>Recently Enrolled Students</CardTitle>
                    <CardDescription>
                      Students who enrolled in your courses in the last 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={student.avatar || "/placeholder.svg"}
                              alt={student.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Enrolled in: {student.course}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {student.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Latest Reviews</CardTitle>
                    <CardDescription>
                      Recent reviews from your students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {latestReviews.map((review) => (
                        <div key={review.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Image
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <p className="font-medium">{review.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {review.course}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <BarChart3
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-primary text-primary"
                                      : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {review.date}
                            </span>
                            <Button size="sm" variant="ghost">
                              Reply
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Sample data
const teacherCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    students: 845,
    revenue: "7,650",
    rating: 4.8,
    lastUpdated: "Apr 10, 2023",
    image: "/placeholder.svg?height=220&width=400",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    students: 512,
    revenue: "4,320",
    rating: 4.9,
    lastUpdated: "Mar 22, 2023",
    image: "/placeholder.svg?height=220&width=400",
  },
  {
    id: 3,
    title: "React & Redux Masterclass",
    students: 378,
    revenue: "3,210",
    rating: 4.7,
    lastUpdated: "Feb 15, 2023",
    image: "/placeholder.svg?height=220&width=400",
  },
  {
    id: 4,
    title: "Node.js API Development",
    students: 245,
    revenue: "2,080",
    rating: 4.6,
    lastUpdated: "Jan 30, 2023",
    image: "/placeholder.svg?height=220&width=400",
  },
];

const recentStudents = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Complete Web Development Bootcamp",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Emma Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Advanced JavaScript Concepts",
    date: "3 days ago",
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "React & Redux Masterclass",
    date: "5 days ago",
  },
  {
    id: 4,
    name: "Sophia Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Node.js API Development",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Complete Web Development Bootcamp",
    date: "1 week ago",
  },
];

const latestReviews = [
  {
    id: 1,
    name: "David Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Complete Web Development Bootcamp",
    rating: 5,
    comment:
      "This course is amazing! I learned so much and was able to build my own projects from scratch. The instructor explains everything clearly and provides great examples.",
    date: "3 days ago",
  },
  {
    id: 2,
    name: "Jessica Miller",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Advanced JavaScript Concepts",
    rating: 4,
    comment:
      "Great course with in-depth explanations of advanced JavaScript concepts. The only reason I'm giving 4 stars is because some sections could use more practical examples.",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Robert Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "React & Redux Masterclass",
    rating: 5,
    comment:
      "Excellent course! The instructor really knows their stuff and explains complex concepts in an easy-to-understand way. Highly recommended for anyone wanting to learn React and Redux.",
    date: "2 weeks ago",
  },
];

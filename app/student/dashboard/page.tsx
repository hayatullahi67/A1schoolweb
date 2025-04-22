
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Star,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
type Student = {
  fullname: string;
  email: string;
  token: string;
  id: string;
};

type Course = {
  id: string;
  name: string;
  instructor: {
    fullname: string;
    image_link: string;
  };
  image_link:string
  price: string;
  updated_at: string;
  description: string;
  discount: string;
  created_at: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  category: string;
};

type AllCourse = {
  id: string;
  name: string;
  instructor: {
    fullname: string;
    image_link: string;
  };
  image_link:string
  price: string;
  updated_at: string;
  description: string;
  discount: string;
  created_at: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  category: {};
  average_rating:string
};

type CompletedCourse = {
  id: string;
  name: string;
  instructor: {
    fullname: string;
    image_link: string;
  };
  image_link:string
  price: string;
  updated_at: string;
  description: string;
  discount: string;
  created_at: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  category: {};
  average_rating:string
};
export default function StudentDashboard() {
  const [student, setStudent] = useState<Student>({
    fullname: "Loading...",
    email: "",
    id:"",
    token: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [allcourses, setallCourses] = useState<AllCourse[]>([]);
  const [courseId , setCourseid] = useState()
  const [certificates, setCertificates] = useState<{ [courseId: string]: any }>({});
  const studentId = student.id;
  const [completedCourses , setcompletedCourses] = useState<CompletedCourse[]>([])
  const  token = student.token;
  useEffect(() => {
    
    const stored = localStorage.getItem("userData");
    console.log("stored",stored)
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("parsed",parsed)
      setStudent({
        fullname: parsed.fullname || "Student",
        email: parsed.email || "",
        id: parsed.id,
        token: parsed.token
      });
    }
  }, []);

  useEffect(() => {
    // Fetch courses when the student ID is available
    if (studentId) {
      const fetchCourses = async () => {
        try {
          const response = await fetch(`https://api.a1schools.org/users/${studentId}/courses`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,  // Replace with your token
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch courses");
          }

          const data = await response.json();
          console.log("data",data)
          setCourses(data.data); // Assuming the API returns a `courses` array
          const courseIds = data.data.map((course: Course) => course.id);
console.log("All Course IDs:", courseIds); 
setCourseid(courseIds)
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchCourses();
    }
  }, [studentId, token]);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!token || courses.length === 0) return;
  
      const certMap: { [courseId: string]: any } = {};
  
      for (const course of courses) {
        try {
          const response = await fetch(`https://api.a1schools.org/courses/${course.id}/certificate`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            console.warn(`No certificate for course ${course.id}`);
            continue;
          }
  
          const data = await response.json();
          console.log("data cert" , data )
          certMap[course.id] = data;
          setCertificates(certMap);
          console.log("certmap",certMap)
        } catch (error) {
          console.error(`Error fetching certificate for course ${course.id}:`, error);
        }
      }
  
      setCertificates(certMap);
    };
  
    fetchCertificates();
  }, [courses, token]);


  useEffect(() => {
    // Fetch courses when the student ID is available
    
      const fetchallCourses = async () => {
        try {
          const response = await fetch(`https://api.a1schools.org/courses`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,  // Replace with your token
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch courses");
          }

          const data = await response.json();
          console.log("data",data)
          setallCourses(data.data); // Assuming the API returns a `courses` array
          
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchallCourses();
    
  }, [, token]);

  useEffect(() => {
    if (token) {
      const fetchallCourses = async () => {
        try {
          const response = await fetch(`https://api.a1schools.org/courses`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch courses");
          }
  
          const data = await response.json();
          setallCourses(data.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      fetchallCourses();
    }
  }, [token]);
  

  useEffect(() => {
    if (token) {
      const fetchacompletedCourses = async () => {
        try {
          const response = await fetch(`https://api.a1schools.org/users/${studentId}/completed-courses`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch courses");
          }
  
          const data = await response.json();
          console.log("com",data)
          setcompletedCourses(data.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      fetchacompletedCourses();
    }
  }, [token]);

  const enrollCourse = async (courseId : string) => {
    try {
      const response = await fetch(`https://api.a1schools.org/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to enroll course");
      }
  
      const data = await response.json();
      console.log("enrolldata", data);

      const paymentLink = data?.data?.link;
      if (paymentLink) {
        window.location.href = paymentLink; // takes the user to the Flutterwave payment page
      } else {
        console.warn("No payment link found in response");
      }
  
    } catch (error) {
      console.error("Error enrolling course:", error);
    }
  };
  

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `https://api.a1schools.org/auth/logout/${studentId}`,
        {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            
          },
        }
      );
  
      if (response.ok) {
        console.log('Logout successful');
        // Optional: Clear any user data from localStorage/sessionStorage
        // Redirect to login/home page
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message);
      }
    } catch (error) {
      console.error('Network error during logout:', error);
    }
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center gap-2 px-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold">A1 School</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/student/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/student/courses/${studentId}`}>
                    <BookOpen className="h-4 w-4" />
                    <span>My Courses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/calendar">
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/messages">
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                     <button  onClick={handleLogout}>

                     <span  className="text-[red]">Log Out</span>

                     </button>
                      
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
                <span className="text-sm font-medium">{student.fullname}</span>
                <span className="text-xs text-muted-foreground">
                 {student.email}
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {student.fullname}! Here is your learning summary.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* <Button variant="outline">Browse Courses</Button>
              <Button>Continue Learning</Button> */}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Courses Enrolled
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Courses
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedCourses.length}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p> */}
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Hours Spent
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.5</div>
                 <p className="text-xs text-muted-foreground">
                  +12.5 from last month
                </p> 
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Certificates
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{certificates.length || 0}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p> */}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="in-progress">
              <TabsList className="mb-4">
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
              <TabsContent value="in-progress">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {
                   courses.length === 0 ? (
                    <p className="text-muted-foreground text-center mt-8">
                     You have not taken any courses yet.
                    </p>
                  ) : 
                  
                  (courses.map((course) => (
                    <Card key={course.id} className="w-[320px] overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={course.image_link || "/placeholder.svg"}
                          alt={course.name}
                          width={400}
                          height={220}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-lg">
                          {course.name}
                        </CardTitle>
                        <CardDescription>{course.instructor.fullname}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Progress
                          </span>
                          <span className="text-sm font-medium">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {course.completedLessons} / {course.totalLessons}{" "}
                            lessons
                          </span>
                          <Button size="sm">Continue</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )))}
                </div>
              </TabsContent>
              <TabsContent value="completed">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
                  { completedCourses.length === 0 ? 
                  (
                    <>You have not  completed any courses</>
                  ):
                  (completedCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={course.image_link || "/placeholder.svg"}
                          alt={course.name}
                          width={400}
                          height={220}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-lg">
                          {course.name}
                        </CardTitle>
                        <CardDescription>{course.instructor.fullname}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Completed on
                          </span>
                          <span className="text-sm font-medium">
                            {/* {course.completedDate} */}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                            <span className="text-sm font-medium">
                              {course.average_rating}
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            View Certificate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )))}
                </div>
              </TabsContent>
              <TabsContent value="recommended">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  { allcourses.length === 0 ? (
  <p className="text-muted-foreground text-center mt-8">
     No uploaded  course yet.
  </p>
) : 
 (allcourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.image_link }
                          alt={course.name}
                          width={400}
                          height={220}
                          className="h-full w-full object-cover"
                        />
                        
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-lg">
                          {course.name}
                        </CardTitle>
                        <CardDescription>{course.instructor.fullname}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                            <span className="text-sm font-medium">
                              {course.average_rating || 0}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                            </span>
                          </div>
                          <span className="text-sm font-bold">
                            ${course.price}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                          </span>
                          <Button  onClick={() => enrollCourse(course.id)} size="sm">Enroll</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Sample data
const inProgressCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    progress: 65,
    completedLessons: 26,
    totalLessons: 40,
    image: "/images/webdev.jpeg",
  },
  {
    id: 2,
    title: "Data Science and Machine Learning",
    instructor: "Sarah Johnson",
    progress: 32,
    completedLessons: 12,
    totalLessons: 38,
    image: "/placeholder.svg?height=220&width=400",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Michael Brown",
    progress: 78,
    completedLessons: 18,
    totalLessons: 23,
    image: "/placeholder.svg?height=220&width=400",
  },
];

const completedCourses = [
  {
    id: 4,
    title: "JavaScript Fundamentals",
    instructor: "Emily Davis",
    completedDate: "Mar 15, 2023",
    rating: 4.8,
    image: "/placeholder.svg?height=220&width=400",
  },
  {
    id: 5,
    title: "Introduction to Python Programming",
    instructor: "Robert Wilson",
    completedDate: "Jan 22, 2023",
    rating: 4.9,
    image: "/placeholder.svg?height=220&width=400",
  },
];

const recommendedCourses = [
  {
    id: 6,
    title: "Advanced React Patterns",
    instructor: "Jessica Miller",
    rating: 4.9,
    reviews: 1250,
    price: 89.99,
    level: "Advanced",
    duration: "15 hours",
    image: "/placeholder.svg?height=220&width=400",
  },
  {
    id: 7,
    title: "Mobile App Development with Flutter",
    instructor: "David Thompson",
    rating: 4.7,
    reviews: 980,
    price: 79.99,
    level: "Intermediate",
    duration: "20 hours",
    image: "/placeholder.svg?height=220&width=400",
  },
  {
    id: 8,
    title: "Blockchain Development Fundamentals",
    instructor: "Alex Johnson",
    rating: 4.8,
    reviews: 750,
    price: 94.99,
    level: "Beginner",
    duration: "18 hours",
    image: "/placeholder.svg?height=220&width=400",
  },
];

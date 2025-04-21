"use client";



import { useState , useEffect } from "react";
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

type Instructor = {
  fullname: string;
  email: string;
  token: string;
  id: string;
};

type Course = {
  id: string;
  name: string;
  instructor: {
    fullname: string,
    image_link: string
  }
   price: string
    image_link: string
    average_rating: string
    updated_at: string
  progress: number;
  completedLessons: number;
  totalLessons: number;
  category:string
  students?: number;
};

interface Transaction {
  amount: string;
  status: string;
  // Add more fields if needed
}

type Student = {
  id: string;
  fullname: string;
  image_link: string;
  course: string;
  courseUpdatedAt: string;
};

export default function TeacherDashboard() {
const [instructor, setInstructor] = useState<Instructor>({
    fullname: "Loading...",
    email: "",
    id:"",
    token: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setcourseId] = useState <string []> ();
  const [enrollmentIds, setEnrollmentIds] = useState<Record<string, string[]>>({});
  const [studentDetails, setStudentDetails] = useState<{ [courseId: string]: number }>({});
  const [totalStudents, setTotalStudents] = useState<number>(0)
   const [totalEarnings , setTotalEarnings] = useState()
   const [totalRating , setTotalRating] = useState()
   const [students, setStudents] = useState<Student[]>([]);

  const instructorId = instructor.id;
  const  token = instructor.token;
    useEffect(() => {
        
        const stored = localStorage.getItem("userData");
        console.log("stored",stored)
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log("parsed",parsed)
          setInstructor({
            fullname: parsed.fullname || "Student",
            email: parsed.email || "",
            id: parsed.id,
            token: parsed.token
          });
        }
      }, []);


      useEffect(() => {
        if (instructorId) {
          const fetchCourses = async () => {
            try {
              const response = await fetch(
                `https://api.a1schools.org/instructors/${instructorId}/courses`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
      
              if (!response.ok) {
                throw new Error("Failed to fetch courses");
              }
      
              const data = await response.json();
              const coursesList = data.data; // this is likely an array
      
              console.log("Fetched courses:", coursesList);
      
              // const totalRating = coursesList.reduce((sum, course) => {
              //   const rating = Number(course.averageRating) || 0;
              //   return sum + rating;
              // }, 0);
               
              const totalRating = coursesList.reduce((sum: number, course: { averageRating?: number | string }): number => {
                const rating = Number(course.averageRating) || 0;
                return sum + rating;
              }, 0);
              
              
              setTotalRating(totalRating)

              console.log("Total of all average ratings:", totalRating);

              // Example: just grab the first course ID (or do what makes sense for your UI)
              if (Array.isArray(coursesList) && coursesList.length > 0) {
                const courseIds = coursesList.map(course => course.id);
                const courseId = courseIds;
                setcourseId(courseIds)
                console.log("courselist", courseIds)
              }
      
              
              setCourses(coursesList);
            } catch (error) {
              console.error("Error fetching courses:", error);
            }
          };
      
          fetchCourses();
        }
      }, [instructorId, token]);
        
     

      // useEffect(() => {
      //   const fetchEnrollmentsForEachCourse = async () => {
      //     if (instructorId && Array.isArray(courseId) && courseId.length > 0) {
      //       try {
      //         for (const id of courseId) {
      //           const res = await fetch(
      //             `https://api.a1schools.org/instructors/${instructorId}/courses/${id}/enrollments`,
      //             {
      //               method: "GET",
      //               headers: {
      //                 Authorization: `Bearer ${token}`,
      //                 "Content-Type": "application/json",
      //               },
      //             }
      //           );
      
      //           if (!res.ok) {
      //             throw new Error(`Failed to fetch enrollments for course ${id}`);
      //           }
      
      //           const data = await res.json();
      
      //           console.log(`Enrollments for course ${id}:`, data);
      //         }
      //       } catch (err) {
      //         console.error("Error fetching enrollments for courses:", err);
      //       }
      //     }
      //   };
      
      //   fetchEnrollmentsForEachCourse();
      // }, [instructorId, courseId, token]);
      
    
      useEffect(() => {
        const fetchEnrollmentsForEachCourse = async () => {
          if (instructorId && Array.isArray(courseId) && courseId.length > 0) {
            try {
              const enrollmentMap: Record<string, string[]> = {};
      
              for (const id of courseId) {
                const res = await fetch(
                  `https://api.a1schools.org/instructors/${instructorId}/courses/${id}/enrollments`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
      
                if (!res.ok) {
                  throw new Error(`Failed to fetch enrollments for course ${id}`);
                }
      
                const data = await res.json();
                console.log(`Enrollments for course ${id}:`, data);
      
                // Extract the enrollment IDs
                const enrollmentIdsForCourse = data?.data.map((enrollment: any) => enrollment.id) || [];
      
                // Store the enrollment IDs in the map
                enrollmentMap[id] = enrollmentIdsForCourse;
              }
                console.log("enroll" , enrollmentMap)
              // Update the state with the collected enrollment IDs
              setEnrollmentIds(enrollmentMap);
            } catch (err) {
              console.error("Error fetching enrollments for courses:", err);
            }
          }
        };
      
        fetchEnrollmentsForEachCourse();
      }, [instructorId, courseId, token]);
      

      // useEffect(() => {
      //   const fetchEnrollmentDetails = async () => {
      //     if (!instructorId || Object.keys(enrollmentIds).length === 0) return;
    
      //     try {
      //       // Loop through each course in the enrollment map
      //       for (const courseId of Object.keys(enrollmentIds)) {
      //         const enrollmentIdss = enrollmentIds[courseId];
    
      //         // Loop through each enrollment for the course
      //         for (const enrollmentId of enrollmentIdss) {
      //           const response = await fetch(
      //             `https://api.a1schools.org/instructors/${instructorId}/courses/${courseId}/enrollments/${enrollmentId}`
      //           );
      //           const data = await response.json();
      //           console.log(
      //             `📚 Students for enrollment ${enrollmentId} in course ${courseId}:`,
      //             data
      //           );
    
      //           // Map the student data into the state
      //           if (data && data.data && data.data.students) {
      //             // Updating state with students' data
      //             setStudentDetails((prevDetails) => [
      //               ...prevDetails,
      //               ...data.data.students,
      //             ]);
      //             console.log("details",(prevDetails : any) => [
      //               ...prevDetails,
      //               ...data.data.students,
      //             ])
      //           }
      //         }
      //       }
      //     } catch (error) {
      //       console.error("Failed to fetch student enrollment details:", error);
      //     }
      //   };
    
      //   fetchEnrollmentDetails();
      // }, [instructorId, enrollmentIds]);


      // useEffect(() => {
      //   const fetchEnrollmentDetails = async () => {
      //     if (!instructorId || !token || Object.keys(enrollmentIds).length === 0) return;
    
      //     try {
      //       let totalStudentsAcrossCourses = 0; 
      //       // Loop through each course in the enrollment map
      //       for (const courseId of Object.keys(enrollmentIds)) {
      //         const enrollmentIdss = enrollmentIds[courseId];
      //         let totalStudentsForCourse:number = 0;

      //         // Loop through each enrollment for the course
      //         for (const enrollmentId of enrollmentIdss) {
      //           const response = await fetch(
      //             `https://api.a1schools.org/instructors/${instructorId}/courses/${courseId}/enrollments/${enrollmentId}`,
      //             {
      //               method: 'GET',
      //               headers: {
      //                 'Authorization': `Bearer ${token}`, // Add your token here
      //                 'Content-Type': 'application/json',
      //               },
      //             }
      //           );
      //           const data = await response.json();
      //           console.log(
      //             `📚 Students for enrollment ${enrollmentId} in course ${courseId}:`,
      //             data
      //           );
                   
      //           if (data && data.data && data.data.students) {
      //             const studentCount = data.data.students.length;
      //             console.log(`There are ${studentCount} students enrolled in course ${courseId}.`);

      //             totalStudentsForCourse += studentCount;
      //             console.log("count",totalStudentsForCourse) 
      //           }
                
      //           // Map the student data into the state
      //           if (data && data.data && data.data.students) {
      //             // Updating state with students' data
                  

      //             setStudentDetails((prevCount) => ({
      //               ...prevCount,
      //               [courseId]: totalStudentsForCourse,
      //             }));
        
      //             // Add the current course's student count to the total number of students across all courses
      //             totalStudentsAcrossCourses += totalStudentsForCourse;
      //           }
      //           }
      //         }
      //       }
      //     }  catch(error) {
      //       console.error("Failed to fetch student enrollment details:", error);
      //     }
        
    
      //   fetchEnrollmentDetails();
      // }, [instructorId, enrollmentIds, token]);


      // useEffect(() => {
      //   const fetchEnrollmentDetails = async () => {
      //     if (!instructorId || !token || Object.keys(enrollmentIds).length === 0) return;
      
      //     try {
      //       let totalStudentsAcrossCourses = 0;
      
      //       for (const courseId of Object.keys(enrollmentIds)) {
      //         const enrollmentIdss = enrollmentIds[courseId];
      //         let totalStudentsForCourse: number = 0;
      
      //         for (const enrollmentId of enrollmentIdss) {
      //           const response = await fetch(
      //             `https://api.a1schools.org/instructors/${instructorId}/courses/${courseId}/enrollments/${enrollmentId}`,
      //             {
      //               method: 'GET',
      //               headers: {
      //                 'Authorization': `Bearer ${token}`,
      //                 'Content-Type': 'application/json',
      //               },
      //             }
      //           );
      
      //           const data = await response.json();
      
      //           console.log(
      //             `📚 Students for enrollment ${enrollmentId} in course ${courseId}:`,
      //             data
      //           );
      
      //           if (data && data.data && data.data.students) {
      //             const studentCount = data.data.students.length;
      //             console.log(`There are ${studentCount} students enrolled in course ${courseId}.`);
      
      //             totalStudentsForCourse += studentCount;
      //           }
      //         }
      
      //         // After looping through all enrollments for the course
      //         setStudentDetails((prevCount) => ({
      //           ...prevCount,
      //           [courseId]: totalStudentsForCourse,
      //         }));
      
      //         totalStudentsAcrossCourses += totalStudentsForCourse;
      //       }
      //       setTotalStudents(totalStudentsAcrossCourses)
      
      //       console.log("🎉 Total students across all courses:", totalStudentsAcrossCourses);
      
      //     } catch (error) {
      //       console.error("❌ Failed to fetch student enrollment details:", error);
      //     }
      //   };
      
      //   fetchEnrollmentDetails();
      // }, [instructorId, enrollmentIds, token]);
      
     
      useEffect(() => {
        const fetchEnrollmentDetails = async () => {
          if (!instructorId || !token || Object.keys(enrollmentIds).length === 0) return;
      
          try {
            let totalStudentsAcrossCourses = 0;
      
            for (const courseId of Object.keys(enrollmentIds)) {
              const enrollmentList = enrollmentIds[courseId];
              let totalStudentsForCourse = 0;
      
              for (const enrollmentId of enrollmentList) {
                const response = await fetch(
                  `https://api.a1schools.org/instructors/${instructorId}/courses/${courseId}/enrollments/${enrollmentId}`,
                  {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                  }
                );
      
                if (!response.ok) {
                  console.error(`Failed to fetch enrollment ${enrollmentId} for course ${courseId}`);
                  continue;
                }
      
                const data = await response.json();
      
                const students = data?.data?.students ?? [];
                const studentCount = students.length;
      
                console.log(`📚 ${studentCount} students enrolled in course ${courseId} (enrollment ${enrollmentId})`);
      
                totalStudentsForCourse += studentCount;
              }
      
              // Update total for each course
              setStudentDetails((prevCount) => ({
                ...prevCount,
                [courseId]: totalStudentsForCourse,
              }));
      
              totalStudentsAcrossCourses += totalStudentsForCourse;
            }
      
            setTotalStudents(totalStudentsAcrossCourses);
            console.log("🎉 Total students across all courses:", totalStudentsAcrossCourses);
      
          } catch (error) {
            console.error("❌ Failed to fetch student enrollment details:", error);
          }
        };
      
        fetchEnrollmentDetails();
      }, [instructorId, enrollmentIds, token]);
      
      const coursesWithStudentCounts = courses.map(course => ({
        ...course,
        students: studentDetails[course.id] || 0, // Fallback to 0 if not yet fetched
      }));
      

      useEffect(() => {
        const fetchSuccessfulTransactions = async () => {
          if (!instructorId || !token) return;
      
          try {
            const response = await fetch(
              `https://api.a1schools.org/instructors/${instructorId}/transactions`,
              {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
      
            const data = await response.json();
            console.log("💰 Transactions data:", data);
      
            if (data && data.data && Array.isArray(data.data)) {
              const successfulTransactions = data.data.filter(
                (transaction:any) => transaction.status === "success"
              );
      
              const totalAmount = successfulTransactions.reduce(
                (acc: number, txn: Transaction): number => {
                  const amount = parseFloat(txn.amount);
                  return acc + (isNaN(amount) ? 0 : amount);
                },
                0
              );
                 
              setTotalEarnings(totalAmount)
              console.log("✅ Total Successful Transaction Amount:", totalAmount);
            }
          } catch (error) {
            console.error("❌ Failed to fetch transactions:", error);
          }
        };
      
        fetchSuccessfulTransactions();
      }, [instructorId, token]);
      


      // useEffect(() => {
      //   const fetchAllStudents = async () => {
      //     if (!instructorId || !token || Object.keys(enrollmentIds).length === 0) return;
      
      //     const allStudents: Student[] = [];
      
      //     try {
      //       for (const courseId of Object.keys(enrollmentIds)) {
      //         const enrollmentIdList = enrollmentIds[courseId];
      
      //         for (const enrollmentId of enrollmentIdList) {
      //           const response = await fetch(
      //             `https://api.a1schools.org/instructors/${instructorId}/courses/${courseId}/enrollments/${enrollmentId}`,
      //             {
      //               method: "GET",
      //               headers: {
      //                 Authorization: `Bearer ${token}`,
      //                 "Content-Type": "application/json",
      //               },
      //             }
      //           );
      
      //           const data = await response.json();
      //           const studentss = data.data.students;
      //           const studentNames = studentss.map((student: any) => student.fullname);
      
      //           if (data?.data?.students) {
      //             const courseName = courses.find(c => c.id === courseId)?.name || "Unknown Course";
      
      //             const studentsInCourse = data.data.students.map((s: any) => ({
      //               id: s.id,
      //               fullname: s.fullname,
      //               avatar: s.avatar || "/placeholder.svg",
      //               course: courseName,
      //               date: new Date(s.updated_at).toLocaleDateString(),
      //             }));
      
      //             allStudents.push(...studentsInCourse);
      //           }
      //         }
      //       }
      
      //       setStudents(allStudents);
      //     } catch (error) {
      //       console.error("❌ Error fetching all enrolled students:", error);
      //     }
      //   };
      
      //   fetchAllStudents();
      // }, [instructorId, token, enrollmentIds, courses]);
      

      useEffect(() => {
        const fetchAllStudents = async () => {
          if (!instructorId || !token || Object.keys(enrollmentIds).length === 0) return;
      
          const allStudents: Student[] = [];
      
          try {
            for (const courseId of Object.keys(enrollmentIds)) {
              const enrollmentIdList = enrollmentIds[courseId];
      
              for (const enrollmentId of enrollmentIdList) {
                const response = await fetch(
                  `https://api.a1schools.org/instructors/${instructorId}/courses/${courseId}/enrollments/${enrollmentId}`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
      
                const data = await response.json();
      
                const courseName = data?.data?.course?.name || "Unknown Course";
                const courseUpdatedAt = data?.data?.course?.updated_at || new Date().toISOString();
      
                if (Array.isArray(data?.data?.students)) {
                  const studentsInCourse = data.data.students.map((student: any) => ({
                    id: student.id,
                    fullname: student.fullname,
                    image_link: student.image_link || "/placeholder.svg",
                    course: courseName,
                    courseUpdatedAt: new Date(courseUpdatedAt).toLocaleDateString(),
                  }));
      
                  allStudents.push(...studentsInCourse);
                }
              }
            }
      
            setStudents(allStudents);
          } catch (error) {
            console.error("❌ Error fetching all enrolled students:", error);
          }
        };
      
        fetchAllStudents();
      }, [instructorId, token, enrollmentIds, courses]);
      

      const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount)
      }

      const handleLogout = async () => {
        try {
          const response = await fetch(
            `https://api.a1schools.org/auth/logout/${instructorId}`,
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
                  <Link href="/teacher/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/courses">
                    <BookOpen className="h-4 w-4" />
                    <span>My Courses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/students">
                    <Users className="h-4 w-4" />
                    <span>Students</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/analytics">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/dashboard/transaction">
                    <DollarSign className="h-4 w-4" />
                    <span>Wallet</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/messages">
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/teacher/settings">
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
                <span className="text-sm font-medium">{instructor.fullname}</span>
                <span className="text-xs text-muted-foreground">
                  {instructor.email}
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Instructor Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {instructor.fullname} Here is your teaching summary.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* <Button variant="outline">View Analytics</Button> */}
              <Link href='/teacher/dashboard/createcourse'>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Course
              </Button>
              </Link>
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
                <div className="text-2xl font-bold">{courses.length}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p> */}
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
                <div className="text-2xl font-bold">{totalStudents}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +324 from last month
                </p> */}
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
                <div className="text-2xl font-bold"> {formatCurrency(totalEarnings || 0) }</div>
                {/* <p className="text-xs text-muted-foreground">
                  +$2,100 from last month
                </p> */}
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
                <div className="text-2xl font-bold">{totalRating}</div>
                {/* <p className="text-xs text-muted-foreground">
                  +0.2 from last month
                </p> */}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 ">
            <Tabs defaultValue="courses">
              <TabsList className="mb-4">
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="students">Recent Students</TabsTrigger>
                {/* <TabsTrigger value="reviews">Latest Reviews</TabsTrigger> */}
              </TabsList>
              <TabsContent value="courses">
                <div className="grid gap-6 md:grid-cols-2  lg:grid-cols-3">
                  { coursesWithStudentCounts.length === 0 ? (
  <p className="text-muted-foreground text-center mt-8">
    You have not uploaded any course yet.
  </p>
) : 
                  (coursesWithStudentCounts.map((course) => (
                    <Card key={course.id} className="overflow-hidden w-[330px]">
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
                        <CardDescription>
                           students enrolled {course.students}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Revenue
                          </span>
                          <span className="text-sm font-medium">
                            ${course.price}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Rating
                          </span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">
                              {course.average_rating || 0}
                            </span>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Last updated:  {new Date(course.updated_at).toLocaleDateString()}
                          </span>
                          <Button size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )))}
                </div>
              </TabsContent>
              <TabsContent value="students" >
                <div className="grid gap-6 md:grid-cols-2  lg:grid-cols-3">

                </div>
                <Card >
                  <CardHeader>
                    <CardTitle> Enrolled Students</CardTitle>
                    <CardDescription>
                      Students who enrolled in your courses in the last 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* {students.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={student.avatar || "/placeholder.svg"}
                              alt={student.fullname}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <p className="font-medium">{student.fullname}</p>
                              <p className="text-sm text-muted-foreground">
                                Enrolled in: {student.course}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {student.updated_at}
                          </div>
                        </div>
                      ))} */}

{
students.length === 0 ? (
  <p className="text-muted-foreground text-center mt-8">
 Student are yet to enroll yr course .
  </p>
) : 

(students.map((student) => (
  <div key={student.id} className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Image
        src={student.image_link}
        alt={student.fullname}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div>
        <p className="font-medium">{student.fullname}</p>
        <p className="text-sm text-muted-foreground">
          Enrolled in: {student.course}
        </p>
      </div>
    </div>
    <div className="text-sm text-muted-foreground">{student.courseUpdatedAt}</div>
  </div>
)))}

                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Latest Reviews</CardTitle>
                    <CardDescription>
                      Recent reviews from your students
                    </CardDescription>
                  </CardHeader>
                  <CardContent >
                    <div className="space-y-6 ">
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
              </TabsContent> */}
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

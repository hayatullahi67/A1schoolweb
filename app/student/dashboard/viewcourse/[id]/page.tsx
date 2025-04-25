


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  PanelLeft,
  Settings,
  Star,
  User,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sider";

// Type definitions based on the API response
type Student = {
  fullname: string;
  email: string;
  token: string;
  id: string;
};

type Instructor = {
  fullname: string;
  image_link: string | null;
};

type Category = {
  name: string;
};

type Lesson = {
  title: string;
  description: string;
  duration: string;
  module_id: string;
  video_link: string | null;
  id: string;
};

type Module = {
  title: string;
  description: string;
  course_id: string;
  id: string;
  completed: boolean;
  lessons: Lesson[];
  quiz: any | null;
};

type CourseData = {
  name: string;
  description: string;
  price: string;
  id: string;
  instructor_id: string;
  instructor: Instructor;
  average_rating: number | null;
  category: Category[];
  created_at: string;
  updated_at: string;
  image_link: string | null;
  students: any | null;
  discount: string;
  modules: Module[];
  enrolled: boolean;
};

type ApiResponse = {
  message: string;
  data: CourseData;
};


type ModulesApiResponse = {
  message: string
  data: Module[]
}

type LessonsApiResponse = {
  message: string
  data: Lesson[]
}

type Quiz = {
  id: string;
  title: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string; // or maybe index or something else
  }[];
};

type QuizApiResponse = {
  message: string;
  data: Quiz;
};

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function ViewCourseDetails() {
  const [student, setStudent] = useState<Student>({
    fullname: "Loading...",
    email: "",
    id: "",
    token: "",
  });
  
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [moduleIds, setModuleIds] = useState<string[]>([]);
  const [loadingModules, setLoadingModules] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const params = useParams();
const courseId = params.id;

const [moduleLessons, setModuleLessons] = useState<Record<string, Lesson[]>>({})
const [loadingLessons, setLoadingLessons] = useState(false);
// const [moduleQuizzes, setModuleQuizzes] = useState<Record<string, Quiz>>({});
// const [moduleQuizzes, setModuleQuizzes] = useState<Record<string, Quiz>>({});
// const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
const [moduleQuizzes, setModuleQuizzes] = useState<Record<string, Quiz>>({});
const [quizIds, setQuizIds] = useState<string[]>([]); // Store all quiz IDs
const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
const [selectedModuleIdForQuiz, setSelectedModuleIdForQuiz] = useState<string | null>(null);
const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
const [loadingQuizQuestions, setLoadingQuizQuestions] = useState(false);


const handleLessonSelect = (lesson: Lesson) => {
  setSelectedLesson(lesson);
};


  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setStudent({
        fullname: parsed.fullname || "Student",
        email: parsed.email || "",
        id: parsed.id,
        token: parsed.token
      });
    }
  }, []);

  useEffect(() => {
    const fetchCourseModules = async () => {
      try {
        setLoadingModules(true)
        const response = await fetch(`https://api.a1schools.org/courses/${courseId}/modules`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch course modules")
        }

        const result: ModulesApiResponse = await response.json()

        // Store module IDs in state
        const ids = result.data.map((module) => module.id)
        setModuleIds(ids)

        console.log("Fetched module IDs:", ids)
        console.log("course", courseId)
        // If we don't have course data yet, we can use this data
        // if (!courseData) {
        //   setCourseData((prevData) => {
        //     if (prevData) return prevData

        //     // Create a minimal course data object with just the modules
        //     return {
        //       ...prevData,
        //       modules: result.data,
        //     } as CourseData
        //   }
        // )
        // }
      } catch (error) {
        console.error("Error fetching course modules:", error)
      } finally {
        setLoadingModules(false)
      }
    }

    if (courseId) {
      fetchCourseModules()
    }
  }, [courseId, courseData])


  useEffect(() => {
    const fetchModuleLessons = async (moduleId: string) => {
      // Skip if we already have lessons for this module
      if (moduleLessons[moduleId] && moduleLessons[moduleId].length > 0) {
        return
      }

      try {
        setLoadingLessons(true)
        const response = await fetch(`https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/lessons`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch lessons for module ${moduleId}`)
        }

        const result: LessonsApiResponse = await response.json()

        // Store lessons for this module
        setModuleLessons((prev) => ({
          ...prev,
          [moduleId]: result.data,
        }))
        // setModuleLessons(result)

        console.log(`Fetched ${result.data.length} lessons for module ${moduleId}`)
       
      } catch (error) {
        console.error(`Error fetching lessons for module ${moduleId}:`, error)
      } finally {
        setLoadingLessons(false)
      }
    }

    // Fetch lessons for the active module if we have module IDs
    if (moduleIds.length > 0 && activeModuleIndex >= 0 && activeModuleIndex < moduleIds.length) {
      const activeModuleId = moduleIds[activeModuleIndex]
      fetchModuleLessons(activeModuleId)
    }
  }, [moduleIds, activeModuleIndex, courseId, moduleLessons])
  console.log("module", moduleLessons)

  // const fetchModuleQuiz = async (moduleId: string) => {
  //   if (moduleQuizzes[moduleId]) return;
  
  //   try {
  //     const response = await fetch(`https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/quiz`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch quiz for module ${moduleId}`);
  //     }
  
  //     const result: QuizApiResponse = await response.json();
  
  //     setModuleQuizzes((prev) => ({
  //       ...prev,
  //       [moduleId]: result.data,
  //     }));
  
  //     console.log(`Fetched quiz for module ${moduleId}:`, result.data);
  //   } catch (error) {
  //     console.error(`Error fetching quiz for module ${moduleId}:`, error);
  //   }
  // };
  

  // const handleQuizSelect = async (moduleId: string) => {
  //   setSelectedModuleIdForQuiz(moduleId);
    
  //   // If we already have the quiz data, use it
  //   if (moduleQuizzes[moduleId]) {
  //     setSelectedQuiz(moduleQuizzes[moduleId]);
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(`https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/quiz`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch quiz for module ${moduleId}`);
  //     }
  
  //     const result: QuizApiResponse = await response.json();
      
  //     // Store the quiz in our state
  //     setModuleQuizzes((prev) => ({
  //       ...prev,
  //       [moduleId]: result.data,
  //     }));
      
  //     // Set as selected quiz
  //     setSelectedQuiz(result.data);
  //   } catch (error) {
  //     console.error(`Error fetching quiz for module ${moduleId}:`, error);
  //   }
  // };
  

  // const handleQuizSelect = async (moduleId: string) => {
  //   setSelectedModuleIdForQuiz(moduleId);
    
  //   // If we already have the quiz data, use it
  //   if (moduleQuizzes[moduleId]) {
  //     setSelectedQuiz(moduleQuizzes[moduleId]);
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(`https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/quiz`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch quiz for module ${moduleId}`);
  //     }
  
  //     const result = await response.json();
      
  //     // Ensure the quiz data has the expected structure
  //     const quizData = result.data || {};
  //     if (!quizData.questions) {
  //       quizData.questions = [];
  //     }
      
  //     // Store the quiz in our state
  //     setModuleQuizzes((prev) => ({
  //       ...prev,
  //       [moduleId]: quizData,
  //     }));
      
  //     // Set as selected quiz
  //     setSelectedQuiz(quizData);
  //   } catch (error) {
  //     console.error(`Error fetching quiz for module ${moduleId}:`, error);
  //     // Set an empty quiz structure if there's an error
  //     setSelectedQuiz({
  //       id: moduleId,
  //       title: 'Quiz',
  //       questions: []
  //     });
  //   }
  // };
  // console.log("quiz", moduleQuizzes)


  // Fetch course data when studentId and courseId are available
 
 
 
  // useEffect(() => {
  //   const fetchAllQuizzes = async () => {
  //     try {
  //       // First fetch all modules for the course
  //       const modulesResponse = await fetch(
  //         `https://api.a1schools.org/courses/${courseId}/modules`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  
  //       if (!modulesResponse.ok) {
  //         throw new Error('Failed to fetch course modules');
  //       }
  
  //       const modulesData = await modulesResponse.json();
  //       const modules = modulesData.data || [];
  
  //       // Then fetch quizzes for each module
  //       const quizPromises = modules.map(async (module: Module) => {
  //         try {
  //           const quizResponse = await fetch(
  //             `https://api.a1schools.org/courses/${courseId}/modules/${module.id}/quiz`,
  //             {
  //               method: 'GET',
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //             }
  //           );
  
  //           if (!quizResponse.ok) {
  //             console.error(`No quiz found for module ${module.id}`);
  //             return null;
  //           }
  
  //           const quizData = await quizResponse.json();
  //           return {
  //             moduleId: module.id,
  //             quiz: quizData.data || { id: `quiz-${module.id}`, title: 'Quiz', questions: [] }
  //           };
  //         } catch (error) {
  //           console.error(`Error fetching quiz for module ${module.id}:`, error);
  //           return null;
  //         }
  //       });
  
  //       const quizResults = await Promise.all(quizPromises);
        
  //       // Store quizzes and collect IDs
  //       const newQuizzes: Record<string, Quiz> = {};
  //       const ids: string[] = [];
  
  //       quizResults.forEach(result => {
  //         if (result && result.quiz) {
  //           newQuizzes[result.moduleId] = result.quiz;
  //           if (result.quiz.id) {
  //             ids.push(result.quiz.id);
  //           }
  //         }
  //       });
  
  //       setModuleQuizzes(newQuizzes);
  //       setQuizIds(ids);
  //       console.log("Fetched quizzes:", newQuizzes);
  //       console.log("Quiz IDs:", ids);
  
  //     } catch (error) {
  //       console.error('Error fetching course quizzes:', error);
  //     }
  //   };
  
  //   if (courseId) {
  //     fetchAllQuizzes();
  //   }
  // }, [courseId]);

 



  // useEffect(() => {
  //   const fetchAllQuizzes = async () => {
  //     try {
  //       // 1. First fetch all modules for the course
  //       const modulesResponse = await fetch(
  //         `https://api.a1schools.org/courses/${courseId}/modules`,
  //         {
  //           method: 'GET',
  //           headers: { 'Content-Type': 'application/json' },
  //         }
  //       );
  
  //       if (!modulesResponse.ok) throw new Error('Failed to fetch modules');
  //       const { data: modules = [] } = await modulesResponse.json();
  
  //       // 2. Fetch quizzes for each module
  //       const quizzesData = await Promise.all(
  //         modules.map(async (module: any) => {
  //           try {
  //             const quizResponse = await fetch(
  //               `https://api.a1schools.org/courses/${courseId}/modules/${module.id}/quiz`,
  //               { headers: { 'Content-Type': 'application/json' } }
  //             );
  
  //             if (!quizResponse.ok) return null;
  //             const { data: quiz } = await quizResponse.json();
  //             return { moduleId: module.id, quiz };
  //           } catch (error) {
  //             console.error(`Error fetching quiz for module ${module.id}:`, error);
  //             return null;
  //           }
  //         })
  //       );
  
  //       // 3. Process and store the quizzes
  //       const validQuizzes = quizzesData.filter(Boolean) as Array<{
  //         moduleId: string;
  //         quiz: Quiz;
  //       }>;
  
  //       const newQuizzes: Record<string, Quiz> = {};
  //       const newQuizIds: string[] = [];
  
  //       validQuizzes.forEach(({ moduleId, quiz }) => {
  //         // Ensure quiz has required structure
  //         const processedQuiz = {
  //           id: quiz?.id || `quiz-${moduleId}`,
  //           title: quiz?.title || 'Untitled Quiz',
  //           questions: Array.isArray(quiz?.questions) ? quiz.questions : [],
  //         };
  
  //         newQuizzes[moduleId] = processedQuiz;
  //         newQuizIds.push(processedQuiz.id);
  //       });
  
  //       setModuleQuizzes(newQuizzes);
  //       setQuizIds(newQuizIds);
        
  //       console.log("Fetched quizzes:", newQuizzes);
  //       console.log("Quiz IDs:", newQuizIds);
  
  //     } catch (error) {
  //       console.error('Error fetching quizzes:', error);
  //     }
  //   };
  
  //   if (courseId) fetchAllQuizzes();
  // }, [courseId]);




 // Modified handleQuizSelect function
// const handleQuizSelect = async (moduleId: string) => {
//   setSelectedModuleIdForQuiz(moduleId);
  
//   // Get the quiz for this module
//   const quiz = moduleQuizzes[moduleId];
//   if (!quiz) {
//     console.error('No quiz found for module', moduleId);
//     return;
//   }

//   setLoadingQuizQuestions(true);
//   try {
//     // First check if we already have questions for this quiz
//     if (quiz.questions && quiz.questions.length > 0) {
//       setQuizQuestions(quiz.questions);
//       setSelectedQuiz(quiz);
//       return;
//     }

//     // If no questions in the quiz object, fetch them from the API
//     const response = await fetch(
//       `https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/quiz/${quiz.id}/questions`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     if (!response.ok) {
//       // If the specific questions endpoint fails, fall back to the quiz data we already have
//       if (quiz.questions) {
//         setQuizQuestions(quiz.questions);
//       } else {
//         setQuizQuestions([]);
//       }
//       return;
//     }

//     const result = await response.json();
//     const questions = result.data || [];

//     // Update the quiz in state with the fetched questions
//     setModuleQuizzes(prev => ({
//       ...prev,
//       [moduleId]: {
//         ...quiz,
//         questions: questions
//       }
//     }));

//     setQuizQuestions(questions);
//     setSelectedQuiz({
//       ...quiz,
//       questions: questions
//     });
//   } catch (error) {
//     console.error('Error fetching quiz questions:', error);
//     // Fall back to any existing questions or empty array
//     setQuizQuestions(quiz.questions || []);
//   } finally {
//     setLoadingQuizQuestions(false);
//   }
// };

const handleQuizSelect = async (moduleId: string) => {
  setSelectedModuleIdForQuiz(moduleId);
  setLoadingQuizQuestions(true);

  try {
    // 1. Get the quiz ID for this module
    const quiz = moduleQuizzes[moduleId];
    if (!quiz?.id) {
      throw new Error('Quiz ID not found for this module');
    }

    // 2. Make request to questions endpoint
    const response = await fetch(
      `https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/quiz/${quiz.id}/questions`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${student.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const questions = result.data || [];

    // 3. Update state with questions
    setQuizQuestions(questions);
    setSelectedQuiz({
      ...quiz,
      questions: questions
    });

  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    setQuizQuestions([]);
  } finally {
    setLoadingQuizQuestions(false);
  }
};






  useEffect(() => {
    const fetchCourseData = async () => {
      if (!student.id || !courseId) return;
      
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.a1schools.org/courses/${courseId}?user_id=${student.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add authorization header if needed
              // 'Authorization': `Bearer ${student.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }

        const result: ApiResponse = await response.json();
        setCourseData(result.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [student.id, courseId, student.token]);

  
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `https://api.a1schools.org/auth/logout/${student.id}`,
        {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        console.log('Logout successful');
        // Clear user data from localStorage
        localStorage.removeItem("userData");
        // Redirect to login page
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message);
      }
    } catch (error) {
      console.error('Network error during logout:', error);
    }
  };

  // Calculate discounted price if discount exists
  const discountedPrice = courseData?.discount && courseData.discount !== "0" 
    ? (parseFloat(courseData.price) - (parseFloat(courseData.price) * parseFloat(courseData.discount) / 100)).toFixed(2)
    : null;

  if (loading) {
    return (
      <SidebarProvider>
        <Sidebar>
          {/* Sidebar content */}
          <SidebarHeader className="flex items-center gap-2 px-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold">A1 School</span>
          </SidebarHeader>
          {/* Rest of sidebar... */}
        </Sidebar>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </SidebarProvider>
    );
  }

  if (!courseData) {
    return (
      <SidebarProvider>
        <Sidebar>
          {/* Sidebar content */}
          <SidebarHeader className="flex items-center gap-2 px-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold">A1 School</span>
          </SidebarHeader>
          {/* Rest of sidebar... */}
        </Sidebar>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold text-red-600">Course Not Found</h2>
            <p className="mt-2">Unable to load course details. Please try again later.</p>
            <Link href='/student/dashboard'></Link>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
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
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/student/dashboard/profile">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button onClick={handleLogout}>
                  <span className="text-[red]">Log Out</span>
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

      <>
        <SidebarTrigger className="h-10 w-10 mt-[30px] ml-[30px] lg:hidden border border-gray-300 rounded-md flex items-center justify-center">
          <PanelLeft className="h-4 w-4" />
        </SidebarTrigger>
        <div className="w-[80%] mx-auto border-[2px] px-4 py-8">
          {/* Course Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Course Image */}
            <div className="md:col-span-1">
              {courseData.image_link ? (
                <img 
                  src={courseData.image_link} 
                  alt={courseData.name} 
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            
            {/* Course Info */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{courseData.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {courseData.instructor.image_link ? (
                    <img 
                      src={courseData.instructor.image_link} 
                      alt={courseData.instructor.fullname} 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-100 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-blue-500 font-medium">
                        {courseData.instructor.fullname.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="font-medium">Instructor: {courseData.instructor.fullname}</span>
                </div>
              </div>
              
              <p className="text-[gray] mb-6">{courseData.description}</p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {courseData.category.map((cat, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                {discountedPrice ? (
                  <>
                    <span className="text-2xl font-bold">${discountedPrice}</span>
                    <span className="text-lg text-gray-500 line-through">${courseData.price}</span>
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                      {courseData.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">${courseData.price}</span>
                )}
                
                
                  <div className="flex items-center  ">
                    <div className="text-[blue]  mr-1">★</div>
                    <span>{courseData.average_rating || 0} rating</span>
                  </div>
              
              </div>
              
              {courseData.enrolled ? (
                <button 
                  className="bg-[green] text-white px-6 py-3 rounded-lg font-medium"
                  disabled
                >
                  Enrolled
                </button>
              ) : (
                <button 
                  className="bg-[blue] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
          
          {/* Course Content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <h2 className="text-2xl font-bold p-6 border-b">Course Content</h2>
            
            {courseData.modules && courseData.modules.length > 0 ? (
              <div>
                {/* Module Navigation */}
                <div className="border-b">
                  <div className="flex overflow-x-auto">
                    {courseData.modules.map((module, index) => (
                      <button
                        key={module.id}
                        className={`px-6 py-4 text-left whitespace-nowrap font-medium ${
                          activeModuleIndex === index 
                            ? 'text-blue-600 border-b-2 border-blue-600' 
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                        onClick={() => setActiveModuleIndex(index)}
                      >
                        Module {index + 1}: {module.title}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Active Module Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">
                      {courseData.modules[activeModuleIndex].title}
                    </h3>
                    <p className="text-gray-600">
                      {courseData.modules[activeModuleIndex].description}
                    </p>
                  </div>
                  
                  {/* Lessons */}
                  <div>
                    <h4 className="font-bold text-lg mb-4">Lessons</h4>
                    
                    {courseData.modules[activeModuleIndex].lessons && courseData.modules[activeModuleIndex].lessons.length > 0 ? (
                      <div className="space-y-4">
                        {courseData.modules[activeModuleIndex].lessons.map((lesson, index) => (
                          <div 
                            key={lesson.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium">
                                  {index + 1}. {lesson.title}
                                </h5>
                                <p className="text-gray-600 text-sm mt-1">
                                  {lesson.description}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-gray-500 mr-4">{lesson.duration}</span>
                                
                                <button 
                                     className="bg-[blue] text-white px-4 py-2 rounded-lg text-sm"
                                     onClick={() => handleLessonSelect(lesson)}
                                   >
                                     {lesson.video_link ? 'Watch' : 'Start'}
                                   </button>
                                
                              </div>
                            </div>
                          </div>
                        ))}


{selectedLesson && (
  <div className="mt-8 border  border-gray-200 rounded-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h4 className="text-xl font-bold">{selectedLesson.title}</h4>
      <button 
        onClick={() => setSelectedLesson(null)}
        className="text-gray-500 hover:text-gray-700"
      >
        Close
      </button>
    </div>
    
    <p className="text-gray-600 mb-4">{selectedLesson.description}</p>
    
    {selectedLesson.video_link ? (
      <div className="w-[400px]   ">
        <video 
          controls 
          className="w-[400px]  rounded-lg"
          src={selectedLesson.video_link}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    ) : (
      <div className="bg-gray-100 p-8 text-center rounded-lg">
        <p className="text-gray-600">No video available for this lesson</p>
      </div>
    )}
    
    <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
      <span>Duration: {selectedLesson.duration}</span>
      {/* {selectedLesson.completed && (
        <span className="text-green-600">✓ Completed</span>
      )} */}
    </div>
  </div>
)}
                      </div>
                    ) : (
                      <p className="text-gray-500">No lessons available for this module.</p>
                    )}
                  </div>
                  
                  {/* Quiz Section */}
                 
                    <div className="mt-8">
                      <h4 className="font-bold text-lg mb-4">Module Quiz</h4>
                      <div className="border border-[gray] rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">
                              Module Quiz
                            </h5>
                            <p className="text-gray-600 text-sm mt-1">
                              Test your knowledge of this module
                            </p>
                          </div>
                          
                            {/* <button className="bg-[blue] text-white px-4 py-2 rounded-lg text-sm">
                              Start Quiz
                            </button> */}

                            <button 
                                    className="bg-[blue] text-white px-4 py-2 rounded-lg text-sm"
                                    onClick={() => handleQuizSelect(courseData.modules[activeModuleIndex].id)}
                                  >
                                    Start Quiz
                                  </button>
                       
                        </div>
                      </div>
                      {selectedQuiz && selectedModuleIdForQuiz === courseData.modules[activeModuleIndex].id && (
    <div className="mt-8 border border-[gray] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold">{selectedQuiz.title}</h4>
        <button 
          onClick={() => {
            setSelectedQuiz(null);
            setSelectedModuleIdForQuiz(null);
            setQuizQuestions([]);
          }}
          className="text-[gray] hover:text-[gray]"
        >
          Close Quiz
        </button>
      </div>

      {selectedQuiz && selectedModuleIdForQuiz === courseData.modules[activeModuleIndex].id && (
  <div className="mt-8 border border-[gray] rounded-lg p-6">
    <div className="flex justify-between items-center mb-6">
      <h4 className="text-xl font-bold">{selectedQuiz.title}</h4>
      <button 
        onClick={() => {
          setSelectedQuiz(null);
          setSelectedModuleIdForQuiz(null);
          setQuizQuestions([]);
        }}
        className="text-gray-500 hover:text-gray-700"
      >
        Close Quiz
      </button>
    </div>

    {loadingQuizQuestions ? (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : quizQuestions.length > 0 ? (
      <div className="space-y-6">
        {quizQuestions.map((question, qIndex) => (
          <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="mb-4">
              <h5 className="font-medium text-lg">
                {qIndex + 1}. {question.question}
              </h5>
            </div>
            
            <div className="space-y-3">
              {question.options.map((option, oIndex) => (
                <div key={`${question.id}-${oIndex}`} className="flex items-center">
                  <input
                    type="radio"
                    id={`${question.id}-${oIndex}`}
                    name={`question-${question.id}`}
                    value={option}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label 
                    htmlFor={`${question.id}-${oIndex}`}
                    className="ml-3 text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No questions available for this quiz.</p>
    )}

    {quizQuestions.length > 0 && (
      <div className="mt-6 flex justify-end">
        <button className="bg-[green] text-white px-6 py-2 rounded-lg font-medium">
          Submit Quiz
        </button>
      </div>
    )}
  </div>
)}
    </div>
  )}

                    </div>
                  
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No modules available for this course yet.
              </div>
            )}
          </div>
        </div>
      </>
    </SidebarProvider>
  );
}
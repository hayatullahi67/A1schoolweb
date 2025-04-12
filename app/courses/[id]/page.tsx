import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Globe,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CoursePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the course data based on the ID
  const course = {
    id: Number.parseInt(params.id),
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    rating: 4.8,
    students: 12500,
    reviews: 2450,
    price: 89.99,
    image: "/placeholder.svg?height=400&width=800",
    category: "Web Development",
    level: "Beginner",
    lastUpdated: "April 2023",
    language: "English",
    description:
      "Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and more. By the end of this course, you'll be able to build complete web applications and have the skills to start a career as a web developer.",
    whatYouWillLearn: [
      "Build 25+ projects including a full-stack web application",
      "Learn HTML5, CSS3, JavaScript, React, Node.js, and Express",
      "Master both front-end and back-end development",
      "Understand how to connect to databases and build APIs",
      "Deploy your applications to production",
      "Learn professional developer best practices",
    ],
    requirements: [
      "No programming experience needed - I'll teach you everything you need to know",
      "A computer with access to the internet",
      "No paid software required",
      "I'll walk you through, step-by-step how to get all the software installed",
    ],
    sections: [
      {
        id: 1,
        title: "Introduction to Web Development",
        lessons: [
          {
            id: 1,
            title: "Welcome to the Course",
            duration: "5:20",
            preview: true,
          },
          {
            id: 2,
            title: "How the Internet Works",
            duration: "12:45",
            preview: true,
          },
          {
            id: 3,
            title: "Setting Up Your Development Environment",
            duration: "18:30",
            preview: false,
          },
          {
            id: 4,
            title: "Web Development Overview",
            duration: "15:15",
            preview: false,
          },
        ],
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        lessons: [
          {
            id: 5,
            title: "Introduction to HTML",
            duration: "10:15",
            preview: true,
          },
          {
            id: 6,
            title: "HTML Document Structure",
            duration: "14:20",
            preview: false,
          },
          {
            id: 7,
            title: "HTML Elements and Attributes",
            duration: "20:10",
            preview: false,
          },
          {
            id: 8,
            title: "HTML Forms and Input Elements",
            duration: "25:30",
            preview: false,
          },
          {
            id: 9,
            title: "HTML5 Semantic Elements",
            duration: "18:45",
            preview: false,
          },
        ],
      },
      {
        id: 3,
        title: "CSS Styling",
        lessons: [
          {
            id: 10,
            title: "Introduction to CSS",
            duration: "12:30",
            preview: false,
          },
          { id: 11, title: "CSS Selectors", duration: "15:45", preview: false },
          { id: 12, title: "CSS Box Model", duration: "18:20", preview: false },
          { id: 13, title: "CSS Flexbox", duration: "22:15", preview: false },
          { id: 14, title: "CSS Grid", duration: "24:30", preview: false },
          {
            id: 15,
            title: "Responsive Design with CSS",
            duration: "28:10",
            preview: false,
          },
        ],
      },
      {
        id: 4,
        title: "JavaScript Basics",
        lessons: [
          {
            id: 16,
            title: "Introduction to JavaScript",
            duration: "15:20",
            preview: false,
          },
          {
            id: 17,
            title: "JavaScript Variables and Data Types",
            duration: "18:45",
            preview: false,
          },
          {
            id: 18,
            title: "JavaScript Functions",
            duration: "22:10",
            preview: false,
          },
          {
            id: 19,
            title: "JavaScript Arrays and Objects",
            duration: "25:30",
            preview: false,
          },
          {
            id: 20,
            title: "DOM Manipulation with JavaScript",
            duration: "30:15",
            preview: false,
          },
        ],
      },
    ],
  };

  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );
  const totalDuration = course.sections.reduce((acc, section) => {
    return (
      acc +
      section.lessons.reduce((lessonAcc, lesson) => {
        const [minutes, seconds] = lesson.duration.split(":").map(Number);
        return lessonAcc + minutes + seconds / 60;
      }, 0)
    );
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="hidden font-bold sm:inline-block">EduLearn</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/courses"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-muted py-8">
        <div className="container">
          <Link
            href="/courses"
            className="mb-4 flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h1 className="mb-2 text-3xl font-bold">{course.title}</h1>
              <p className="mb-4 text-xl text-muted-foreground">
                Learn web development from scratch and build real-world projects
              </p>
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <Star className="mr-1 h-5 w-5 fill-primary text-primary" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="ml-1 text-muted-foreground">
                    ({course.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-5 w-5 text-muted-foreground" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-5 w-5 text-muted-foreground" />
                  <span>{Math.floor(totalDuration)} hours</span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-1 h-5 w-5 text-muted-foreground" />
                  <span>{course.language}</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold">${course.price}</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto">
                  Enroll Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Add to Wishlist
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg md:col-span-1">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/20 hover:text-white"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Preview Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="space-y-8">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold">
                      About This Course
                    </h2>
                    <p className="text-muted-foreground">
                      {course.description}
                    </p>
                  </div>
                  <div>
                    <h2 className="mb-4 text-2xl font-bold">
                      What You&apos;ll Learn
                    </h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-4 text-2xl font-bold">Requirements</h2>
                    <ul className="space-y-2">
                      {course.requirements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-6 md:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-bold">
                      This course includes:
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>
                          {Math.floor(totalDuration)} hours on-demand video
                        </span>
                      </li>
                      <li className="flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>{totalLessons} lessons</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </li>
                      <li className="flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>Access on mobile and TV</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-bold">
                      Share this course
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </Button>
                      <Button variant="outline" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </Button>
                      <Button variant="outline" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </Button>
                      <Button variant="outline" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="curriculum">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Course Content</h2>
                <div className="text-sm text-muted-foreground">
                  {course.sections.length} sections • {totalLessons} lectures •{" "}
                  {Math.floor(totalDuration)} hours total
                </div>
              </div>
              <Accordion type="multiple" className="w-full">
                {course.sections.map((section) => (
                  <AccordionItem
                    key={section.id}
                    value={`section-${section.id}`}
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-1 items-center justify-between pr-4">
                        <span>{section.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {section.lessons.length} lectures
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between rounded-md p-3 hover:bg-muted"
                          >
                            <div className="flex items-center">
                              <PlayCircle className="mr-3 h-5 w-5 text-muted-foreground" />
                              <span>{lesson.title}</span>
                              {lesson.preview && (
                                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                  Preview
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
          <TabsContent value="instructor">
            <div className="space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  width={120}
                  height={120}
                  alt="John Smith"
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold">John Smith</h2>
                  <p className="text-muted-foreground">
                    Web Developer & Instructor
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">4.8 Instructor Rating</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">25,000+ Students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">15 Courses</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold">About the Instructor</h3>
                <p className="text-muted-foreground">
                  John Smith is a full-stack web developer with over 10 years of
                  experience in the industry. He has worked with companies like
                  Google, Facebook, and Amazon, and has a passion for teaching
                  and sharing his knowledge with others. John has taught over
                  25,000 students worldwide and is known for his clear
                  explanations and practical approach to teaching web
                  development.
                </p>
                <p className="mt-4 text-muted-foreground">
                  When he&apos;s not coding or teaching, John enjoys hiking,
                  photography, and spending time with his family. He believes
                  that anyone can learn to code with the right guidance and is
                  committed to helping his students achieve their goals.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold">{course.rating}</div>
                      <div className="flex justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(course.rating)
                                ? "fill-primary text-primary"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Course Rating • {course.reviews} Reviews
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="mr-2 w-12 text-sm">5 stars</span>
                        <Progress value={85} className="h-2 flex-1" />
                        <span className="ml-2 w-8 text-right text-sm">85%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 w-12 text-sm">4 stars</span>
                        <Progress value={10} className="h-2 flex-1" />
                        <span className="ml-2 w-8 text-right text-sm">10%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 w-12 text-sm">3 stars</span>
                        <Progress value={3} className="h-2 flex-1" />
                        <span className="ml-2 w-8 text-right text-sm">3%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 w-12 text-sm">2 stars</span>
                        <Progress value={1} className="h-2 flex-1" />
                        <span className="ml-2 w-8 text-right text-sm">1%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 w-12 text-sm">1 star</span>
                        <Progress value={1} className="h-2 flex-1" />
                        <span className="ml-2 w-8 text-right text-sm">1%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="space-y-2 border-b pb-6 last:border-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Image
                              src={`/placeholder.svg?height=40&width=40`}
                              width={40}
                              height={40}
                              alt={`Reviewer ${review}`}
                              className="rounded-full"
                            />
                            <div>
                              <h4 className="font-medium">
                                Student Name {review}
                              </h4>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < 5
                                        ? "fill-primary text-primary"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                                <span className="ml-2 text-xs text-muted-foreground">
                                  3 months ago
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          This course is amazing! I&apos;ve tried several web
                          development courses before, but this one is by far the
                          best. The instructor explains everything clearly and
                          provides practical examples that make it easy to
                          understand complex concepts. I&apos;ve already built
                          several projects following along with the course, and
                          I feel much more confident in my skills now.
                        </p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EduLearn. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

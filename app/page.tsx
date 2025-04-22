/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import girl from "@/public/images/girl.jpeg"
import uxdesigner from "@/public/images/uxdesigner.jpeg"
import david from "@/public/images/david.jpeg"

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "@/components/course-card";
import TestimonialCard from "@/components/testimonial-card";
import ParticlesBackground from "@/components/particles-background";
import Header from "@/components/header";
import Footer from "@/components/footer";

export type Course = {
  name: string;
  description: string;
  price: string;
  id: string;
  instructor_id: string;
  instructor: {
    fullname: string;
    image_link: string | null;
  };
  average_rating: number | null;
  category: {
    name: string;
  }[];
  created_at: string;
  updated_at: string;
  image_link: string | null;
  students: number | null;
  discount: string;
};



export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCategories, setVisibleCategories] = useState<typeof categories>(
    []
  );
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 6;


  const [allCourses, setAllCourses] = useState<Course[]>([]);
const [firstFourCourses, setFirstFourCourses] = useState<Course[]>([]);
const [mostRecentCourse, setMostRecentCourse] = useState<Course[]>([]);


// useEffect(() => {
//   const fetchCourses = async () => {
//     try {
//       const response = await fetch("https://api.a1schools.org/courses");
//       const data = await response.json();
//       // console.log("data" , data)
//    const res = data.data
//       if (Array.isArray(res)) {
//         // Sort by created date (assuming there's a date field)
//         // const sortedCourses = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

//         const sortedCourses = [...data].sort(
//           (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//         );

//         setAllCourses(data); 
//         console.log("data" , data)
//         setFirstFourCourses(data.slice(0, 4));
//         setMostRecentCourse(sortedCourses[0]); // Most recent based on createdAt
//       } else {
//         console.error("Unexpected response structure", data);
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   fetchCourses();
// }, []);

  // Filter categories based on active filter
 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://api.a1schools.org/courses");
        const data = await response.json();
        const res = data.data;
  
        if (Array.isArray(res)) {
          const sortedCourses = [...res].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
             console.log("res", res.slice(0, 4))
          setAllCourses(res); 
          setFirstFourCourses(res.slice(0, 4));
          setMostRecentCourse(sortedCourses.slice(0,4));
          console.log("resoted", sortedCourses)
        } else {
          console.error("Unexpected response structure", data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    fetchCourses();
  }, []);
  
 
  useEffect(() => {
    if (activeCategory === "all") {
      setVisibleCategories(
        categories.slice(startIndex, startIndex + itemsToShow)
      );
    } else {
      const filtered = categories.filter((cat) => cat.group === activeCategory);
      setVisibleCategories(filtered.slice(0, itemsToShow));
    }
  }, [activeCategory, startIndex]);

  const nextSlide = () => {
    if (startIndex + itemsToShow < categories.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(Math.max(0, categories.length - itemsToShow));
    }
  };

  // Auto-scroll categories
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [startIndex]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Animated Background */}
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 md:py-24 lg:py-32">
          <ParticlesBackground />
          <div className="container relative px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    variants={fadeInUp}
                  >
                    Learn Without Limits
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    variants={fadeInUp}
                  >
                    Start, switch, or advance your career with thousands of
                    courses from expert instructors.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  variants={fadeInUp}
                >
                  <Link href="/register">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Explore Courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full min-[400px]:w-auto"
                    >
                      Join for Free
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 rounded-xl bg-primary/10 blur-xl"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                  <Image
                    src="/images/hero.png"
                    width={550}
                    height={550}
                    alt="Hero Image"
                    className="relative rounded-lg object-cover "
                    priority
                  />
                  <motion.div
                    className="absolute -right-8 -top-8 rounded-lg bg-white p-4 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">4.8</span>
                      <span className="text-sm text-muted-foreground">
                        (10K+ reviews)
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-8 -left-8 rounded-lg bg-white p-4 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-bold">500K+</span>
                      <span className="text-sm text-muted-foreground">
                        students
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Categories with Carousel */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Browse Top Categories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our most popular course categories
                </p>
              </motion.div>

              <div className="mt-4 flex w-full max-w-md flex-wrap items-center justify-center gap-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("all")}
                >
                  All
                </Button>
                <Button
                  variant={
                    activeCategory === "development" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveCategory("development")}
                >
                  Development
                </Button>
                <Button
                  variant={
                    activeCategory === "business" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveCategory("business")}
                >
                  Business
                </Button>
                <Button
                  variant={
                    activeCategory === "creative" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveCategory("creative")}
                >
                  Creative
                </Button>
              </div>
            </div>

            <div className="relative mt-8">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="w-full overflow-hidden px-4">
                  <div className="flex gap-4 transition-all duration-500 ease-in-out">
                    {visibleCategories.map((category, index) => (
                      <div
                        key={`${category.name}-${index}`}
                        className="w-full min-w-[150px] flex-1 sm:min-w-[180px]"
                      >
                        <Link href={`/category/${category.slug}`}>
                          <Card className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md hover:scale-105">
                            <CardContent className="flex flex-col items-center justify-center p-6">
                              <category.icon className="h-10 w-10 mb-2 text-primary" />
                              <h3 className="text-center font-medium text-gray-900 dark:text-white">
                                {category.name}
                              </h3>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {category.courses}+ courses
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Featured Courses
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our most popular and highly-rated courses
                </p>
              </div>
              <div className="relative mx-auto w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-10" placeholder="Search for courses..." />
              </div>
            </motion.div>

            <Tabs defaultValue="all" className="mt-8">
              <TabsList className="mx-auto mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                {/* <TabsTrigger value="popular">Most Popular</TabsTrigger> */}
                <TabsTrigger value="new">New Courses</TabsTrigger>
                {/* <TabsTrigger value="trending">Trending</TabsTrigger> */}
              </TabsList>

              <TabsContent value="all" className="space-y-8">
                <Link href="/register">
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {firstFourCourses.map((course) => (
                    <motion.div key={course.id} variants={fadeInUp}>
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
                </motion.div>
                </Link>
               
              </TabsContent>
{/* 
              <TabsContent value="popular" className="space-y-8">
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {featuredCourses.slice(0, 4).map((course) => (
                    <motion.div key={course.id} variants={fadeInUp}>
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent> */}

              <TabsContent value="new">
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {mostRecentCourse.map((course) => (
                    <motion.div key={course.id} variants={fadeInUp}>
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              {/* <TabsContent value="trending">
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {featuredCourses.slice(1, 5).map((course) => (
                    <motion.div key={course.id} variants={fadeInUp}>
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent> */}
            </Tabs>

            <div className="flex justify-center mt-10">
              <Link href="/register">
                <Button size="lg" variant="outline">
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 sm:grid-cols-2 md:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-6 transition-all hover:shadow-md hover:border-primary/50"
                variants={fadeInUp}
              >
                <Users className="h-12 w-12 text-primary" />
                <motion.h3
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  10K+
                </motion.h3>
                <p className="text-center text-muted-foreground">
                  Active Students
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-6 transition-all hover:shadow-md hover:border-primary/50"
                variants={fadeInUp}
              >
                <BookOpen className="h-12 w-12 text-primary" />
                <motion.h3
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  500+
                </motion.h3>
                <p className="text-center text-muted-foreground">
                  Quality Courses
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-6 transition-all hover:shadow-md hover:border-primary/50"
                variants={fadeInUp}
              >
                <CheckCircle className="h-12 w-12 text-primary" />
                <motion.h3
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  100%
                </motion.h3>
                <p className="text-center text-muted-foreground">
                  Completion Rate
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-6 transition-all hover:shadow-md hover:border-primary/50"
                variants={fadeInUp}
              >
                <Star className="h-12 w-12 text-primary" />
                <motion.h3
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  4.8/5
                </motion.h3>
                <p className="text-center text-muted-foreground">
                  Student Satisfaction
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What Our Students Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our students about their learning experience
                </p>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {testimonials.map((testimonial) => (
                <motion.div key={testimonial.id} variants={fadeInUp}>
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Learning?
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of students and start your learning journey
                  today.
                </p>
              </div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full min-[400px]:w-auto"
                  >
                    Sign Up Now
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto border-primary-foreground"
                  >
                    Browse Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Sample data
const categories = [
  {
    name: "Web Development",
    slug: "web-development",
    icon: BookOpen,
    courses: 120,
    group: "development",
  },
  {
    name: "Data Science",
    slug: "data-science",
    icon: BookOpen,
    courses: 85,
    group: "development",
  },
  {
    name: "Business",
    slug: "business",
    icon: BookOpen,
    courses: 90,
    group: "business",
  },
  {
    name: "Design",
    slug: "design",
    icon: BookOpen,
    courses: 75,
    group: "creative",
  },
  {
    name: "Marketing",
    slug: "marketing",
    icon: BookOpen,
    courses: 65,
    group: "business",
  },
  {
    name: "Photography",
    slug: "photography",
    icon: BookOpen,
    courses: 40,
    group: "creative",
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    icon: BookOpen,
    courses: 55,
    group: "development",
  },
  {
    name: "IT & Software",
    slug: "it-software",
    icon: BookOpen,
    courses: 110,
    group: "development",
  },
  {
    name: "Personal Development",
    slug: "personal-development",
    icon: BookOpen,
    courses: 70,
    group: "business",
  },
  {
    name: "Music",
    slug: "music",
    icon: BookOpen,
    courses: 30,
    group: "creative",
  },
  {
    name: "Health & Fitness",
    slug: "health-fitness",
    icon: BookOpen,
    courses: 45,
    group: "business",
  },
  {
    name: "Finance",
    slug: "finance",
    icon: BookOpen,
    courses: 60,
    group: "business",
  },
];

const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    rating: 4.8,
    students: 12500,
    price: 89.99,
    image: "/images/webdev.jpeg",
    category: "Web Development",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Data Science and Machine Learning",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 8300,
    price: 94.99,
    image: "/images/datascince.png",
    category: "Data Science",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Michael Brown",
    rating: 4.7,
    students: 6200,
    price: 79.99,
    image: "/images/uiux.jpg",
    category: "Design",
    level: "All Levels",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    instructor: "Emily Davis",
    rating: 4.6,
    students: 5100,
    price: 69.99,
    image: "/images/digital.jpeg",
    category: "Marketing",
    level: "Beginner",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Web Developer",
    content:
      "The courses on this platform completely transformed my career. I went from knowing nothing about coding to landing a full-time developer job in just 6 months!",
    avatar: david,
    rating: 5,
  },
  {
    id: 2,
    name: "Jessica Miller",
    role: "UX Designer",
    content:
      "The design courses here are exceptional. The instructors are industry professionals who provide real-world insights and practical knowledge.",
    avatar: girl,
    rating: 5,
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Marketing Specialist",
    content:
      "I've taken several marketing courses, and they've all been incredibly valuable. The content is up-to-date and relevant to today's digital landscape.",
    avatar: uxdesigner,
    rating: 4,
  },
];

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "@/components/course-card";
import type { CourseType } from "@/lib/types";

interface CoursesSectionProps {
  featuredCourses: CourseType[];
}

export default function CoursesSection({
  featuredCourses,
}: CoursesSectionProps) {
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
    <section className="w-full bg-muted/50 py-12 md:py-24">
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
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="new">New Courses</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* {featuredCourses.map((course) => (
                <motion.div key={course.id} variants={fadeInUp}>
                  <CourseCard course={course} />
                </motion.div>
              ))} */}
            </motion.div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-8">
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* {featuredCourses.slice(0, 4).map((course) => (
                <motion.div key={course.id} variants={fadeInUp}>
                  <CourseCard course={course} />
                </motion.div>
              ))} */}
            </motion.div>
          </TabsContent>

          <TabsContent value="new">
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* {featuredCourses.slice(2, 6).map((course) => (
                <motion.div key={course.id} variants={fadeInUp}>
                  <CourseCard course={course} />
                </motion.div>
              ))} */}
            </motion.div>
          </TabsContent>

          <TabsContent value="trending">
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* {featuredCourses.slice(1, 5).map((course) => (
                <motion.div key={course.id} variants={fadeInUp}>
                  <CourseCard course={course} />
                </motion.div>
              ))} */}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 flex justify-center">
          <Link href="/courses">
            <Button size="lg" variant="outline">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

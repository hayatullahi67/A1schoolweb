import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Globe, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CourseType } from "@/lib/course-types";
import { calculateTotalDuration } from "@/lib/course-utils";

export function CourseHeader({ course }: { course: CourseType }) {
  const totalDuration = calculateTotalDuration(course);

  return (
    <div className="bg-muted py-8">
      <div className="container px-6">
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
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
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
                className="border-white text-white hover:bg-white/20 hover:text-white"
              >
                <PlayCircleIcon className="mr-2 h-5 w-5" />
                Preview Course
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import PlayCircle icon separately to avoid circular dependency
import { PlayCircleIcon } from "lucide-react";

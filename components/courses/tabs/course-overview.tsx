import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle, Clock, Globe, Users } from "lucide-react";
import type { CourseType } from "@/lib/course-types";
import { calculateTotalDuration, countTotalLessons } from "@/lib/course-utils";
import { SocialShareButtons } from "../social-share-buttons";

export function CourseOverview({ course }: { course: CourseType }) {
  const totalLessons = countTotalLessons(course);
  const totalDuration = calculateTotalDuration(course);

  return (
    <div className="grid gap-8 md:grid-cols-3 p-6">
      <div className="md:col-span-2">
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-2xl font-bold">About This Course</h2>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">What You will Learn</h2>
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
            <h3 className="mb-4 text-lg font-bold">This course includes:</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{Math.floor(totalDuration)} hours on-demand video</span>
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
            <h3 className="mb-4 text-lg font-bold">Share this course</h3>
            <SocialShareButtons />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

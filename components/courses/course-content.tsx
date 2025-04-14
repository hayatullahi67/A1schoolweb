import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseOverview } from "./tabs/course-overview";
import { CourseCurriculum } from "./tabs/course-curriculum";
import { CourseInstructor } from "./tabs/course-instructor";
import { CourseReviews } from "./tabs/course-reviews";
import type { CourseType } from "@/lib/course-types";

export function CourseContent({ course }: { course: CourseType }) {
  return (
    <div className="container py-8 px-6">
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <CourseOverview course={course} />
        </TabsContent>
        <TabsContent value="curriculum">
          <CourseCurriculum course={course} />
        </TabsContent>
        <TabsContent value="instructor">
          <CourseInstructor />
        </TabsContent>
        <TabsContent value="reviews">
          <CourseReviews course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

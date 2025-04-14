import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayCircle } from "lucide-react";
import type { CourseType } from "@/lib/course-types";
import { calculateTotalDuration, countTotalLessons } from "@/lib/course-utils";

export function CourseCurriculum({ course }: { course: CourseType }) {
  const totalLessons = countTotalLessons(course);
  const totalDuration = calculateTotalDuration(course);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Content</h2>
        <div className="text-sm text-muted-foreground">
          {course.sections.length} sections • {totalLessons} lectures •{" "}
          {Math.floor(totalDuration)} hours total
        </div>
      </div>
      <Accordion type="multiple" className="w-full">
        {course.sections.map((section) => (
          <AccordionItem key={section.id} value={`section-${section.id}`}>
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
  );
}

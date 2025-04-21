import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import type { CourseType } from "@/lib/course-types";

export function CourseReviews({ course }: { course: CourseType }) {
  return (
    <div className="space-y-8 p-6">
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
                      <h4 className="font-medium">Student Name {review}</h4>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < 5 ? "fill-primary text-primary" : "text-muted"
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
                  This course is amazing! I have tried several web
                  development courses before, but this one is by far the best.
                  The instructor explains everything clearly and provides
                  practical examples that make it easy to understand complex
                  concepts. I have already built several projects following
                  along with the course, and I feel much more confident in my
                  skills now.
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
  );
}

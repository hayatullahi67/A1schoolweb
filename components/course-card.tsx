"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";

import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Course } from "@/app/page";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (

      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            
        <Card className="h-full overflow-hidden transition-all hover:shadow-md">
          <div className="aspect-video w-full overflow-hidden">
            {/* <Image
              src={course.image_link || "/placeholder.svg"}
              alt={course.name}
              width={400}
              height={220}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            /> */}
            
            <Image src={course.image_link || "/placeholder.svg"}
              alt={course.name}
              width={400}
              height={220}
              className="h-full w-full object-cover transition-transform hover:scale-105" />
          </div>
          
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                {course.category[0]?.name ?? "Uncategorized"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {/* {course.level} */}
                </span>
              </div>
              <h3 className="font-semibold line-clamp-2">{course.name}</h3>
              <p className="text-sm text-muted-foreground">
                By {course.instructor.fullname}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="ml-1 text-sm font-medium">
                    {course.average_rating}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="ml-1 text-sm text-muted-foreground">
                    {/* {course.students.toLocaleString()} */}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex w-full items-center justify-between">
              <span className="text-lg font-bold">
                ${course.price}
              </span>
              {/* <Badge className="transition-colors hover:bg-primary/90">
                Enroll Now
              </Badge> */}
            </div>
          </CardFooter>
          
        </Card>
      </motion.div>
   
  );
}

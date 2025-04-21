import Image from "next/image";
import { BookOpen, Star, Users } from "lucide-react";

export function CourseInstructor() {
  return (
    <div className="space-y-8 p-6">
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
          <p className="text-muted-foreground">Web Developer & Instructor</p>
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
          experience in the industry. He has worked with companies like Google,
          Facebook, and Amazon, and has a passion for teaching and sharing his
          knowledge with others. John has taught over 25,000 students worldwide
          and is known for his clear explanations and practical approach to
          teaching web development.
        </p>
        <p className="mt-4 text-muted-foreground">
          When he is not coding or teaching, John enjoys hiking,
          photography, and spending time with his family. He believes that
          anyone can learn to code with the right guidance and is committed to
          helping his students achieve their goals.
        </p>
      </div>
    </div>
  );
}

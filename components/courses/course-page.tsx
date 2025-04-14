import { CourseHeader } from "./course-header";
import { CourseContent } from "./course-content";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getCourseData } from "@/lib/course-data";

export default function CoursePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the course data based on the ID
  const course = getCourseData(params.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CourseHeader course={course} />
      <CourseContent course={course} />
      <Footer />
    </div>
  );
}

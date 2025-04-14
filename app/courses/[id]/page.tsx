import CoursePage from "@/components/courses/course-page";

export default function Page({ params }: { params: { id: string } }) {
  return <CoursePage params={params} />;
}

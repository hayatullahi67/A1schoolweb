import type { CourseType } from "./course-types"

export function calculateTotalDuration(course: CourseType): number {
  return course.sections.reduce((acc, section) => {
    return (
      acc +
      section.lessons.reduce((lessonAcc, lesson) => {
        const [minutes, seconds] = lesson.duration.split(":").map(Number)
        return lessonAcc + minutes + seconds / 60
      }, 0)
    )
  }, 0)
}

export function countTotalLessons(course: CourseType): number {
  return course.sections.reduce((acc, section) => acc + section.lessons.length, 0)
}

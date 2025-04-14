import type { LucideIcon } from "lucide-react"

export interface CategoryType {
  name: string
  slug: string
  icon: LucideIcon
  courses: number
  group: string
}

export interface CourseType {
  id: number
  title: string
  instructor: string
  rating: number
  students: number
  price: number
  image: string
  category: string
  level: string
}

export interface TestimonialType {
  id: number
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

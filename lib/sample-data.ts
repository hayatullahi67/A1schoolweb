import { BookOpen } from "lucide-react"
import type { CategoryType, CourseType, TestimonialType } from "./types"

export const categories: CategoryType[] = [
  {
    name: "Web Development",
    slug: "web-development",
    icon: BookOpen,
    courses: 120,
    group: "development",
  },
  {
    name: "Data Science",
    slug: "data-science",
    icon: BookOpen,
    courses: 85,
    group: "development",
  },
  {
    name: "Business",
    slug: "business",
    icon: BookOpen,
    courses: 90,
    group: "business",
  },
  {
    name: "Design",
    slug: "design",
    icon: BookOpen,
    courses: 75,
    group: "creative",
  },
  {
    name: "Marketing",
    slug: "marketing",
    icon: BookOpen,
    courses: 65,
    group: "business",
  },
  {
    name: "Photography",
    slug: "photography",
    icon: BookOpen,
    courses: 40,
    group: "creative",
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    icon: BookOpen,
    courses: 55,
    group: "development",
  },
  {
    name: "IT & Software",
    slug: "it-software",
    icon: BookOpen,
    courses: 110,
    group: "development",
  },
  {
    name: "Personal Development",
    slug: "personal-development",
    icon: BookOpen,
    courses: 70,
    group: "business",
  },
  {
    name: "Music",
    slug: "music",
    icon: BookOpen,
    courses: 30,
    group: "creative",
  },
  {
    name: "Health & Fitness",
    slug: "health-fitness",
    icon: BookOpen,
    courses: 45,
    group: "business",
  },
  {
    name: "Finance",
    slug: "finance",
    icon: BookOpen,
    courses: 60,
    group: "business",
  },
]

export const featuredCourses: CourseType[] = [
 
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    rating: 4.8,
    students: 12500,
    price: 89.99,
    image: "/images/webdev.jpeg",
    category: "Web Development",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Data Science and Machine Learning",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 8300,
    price: 94.99,
    image: "/images/datascince.png",
    category: "Data Science",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Michael Brown",
    rating: 4.7,
    students: 6200,
    price: 79.99,
    image: "/images/uiux.jpg",
    category: "Design",
    level: "All Levels",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    instructor: "Emily Davis",
    rating: 4.6,
    students: 5100,
    price: 69.99,
    image: "/images/digital.jpeg",
    category: "Marketing",
    level: "Beginner",
  },
];

export const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Web Developer",
    content:
      "The courses on this platform completely transformed my career. I went from knowing nothing about coding to landing a full-time developer job in just 6 months!",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Jessica Miller",
    role: "UX Designer",
    content:
      "The design courses here are exceptional. The instructors are industry professionals who provide real-world insights and practical knowledge.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Marketing Specialist",
    content:
      "I've taken several marketing courses, and they've all been incredibly valuable. The content is up-to-date and relevant to today's digital landscape.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
  },
]

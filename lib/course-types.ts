export type LessonType = {
    id: number
    title: string
    duration: string
    preview: boolean
  }
  
  export type SectionType = {
    id: number
    title: string
    lessons: LessonType[]
  }
  
  export type CourseType = {
    id: number
    title: string
    instructor: string
    rating: number
    students: number
    reviews: number
    price: number
    image: string
    category: string
    level: string
    lastUpdated: string
    language: string
    description: string
    whatYouWillLearn: string[]
    requirements: string[]
    sections: SectionType[]
  }
  
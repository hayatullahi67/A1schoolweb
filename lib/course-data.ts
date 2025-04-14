import type { CourseType } from "./course-types"

export function getCourseData(id: string): CourseType {
  // In a real app, you would fetch this data from an API or database
  return {
    id: Number.parseInt(id),
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    rating: 4.8,
    students: 12500,
    reviews: 2450,
    price: 89.99,
    image: "/placeholder.svg?height=400&width=800",
    category: "Web Development",
    level: "Beginner",
    lastUpdated: "April 2023",
    language: "English",
    description:
      "Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and more. By the end of this course, you'll be able to build complete web applications and have the skills to start a career as a web developer.",
    whatYouWillLearn: [
      "Build 25+ projects including a full-stack web application",
      "Learn HTML5, CSS3, JavaScript, React, Node.js, and Express",
      "Master both front-end and back-end development",
      "Understand how to connect to databases and build APIs",
      "Deploy your applications to production",
      "Learn professional developer best practices",
    ],
    requirements: [
      "No programming experience needed - I'll teach you everything you need to know",
      "A computer with access to the internet",
      "No paid software required",
      "I'll walk you through, step-by-step how to get all the software installed",
    ],
    sections: [
      {
        id: 1,
        title: "Introduction to Web Development",
        lessons: [
          {
            id: 1,
            title: "Welcome to the Course",
            duration: "5:20",
            preview: true,
          },
          {
            id: 2,
            title: "How the Internet Works",
            duration: "12:45",
            preview: true,
          },
          {
            id: 3,
            title: "Setting Up Your Development Environment",
            duration: "18:30",
            preview: false,
          },
          {
            id: 4,
            title: "Web Development Overview",
            duration: "15:15",
            preview: false,
          },
        ],
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        lessons: [
          {
            id: 5,
            title: "Introduction to HTML",
            duration: "10:15",
            preview: true,
          },
          {
            id: 6,
            title: "HTML Document Structure",
            duration: "14:20",
            preview: false,
          },
          {
            id: 7,
            title: "HTML Elements and Attributes",
            duration: "20:10",
            preview: false,
          },
          {
            id: 8,
            title: "HTML Forms and Input Elements",
            duration: "25:30",
            preview: false,
          },
          {
            id: 9,
            title: "HTML5 Semantic Elements",
            duration: "18:45",
            preview: false,
          },
        ],
      },
      {
        id: 3,
        title: "CSS Styling",
        lessons: [
          {
            id: 10,
            title: "Introduction to CSS",
            duration: "12:30",
            preview: false,
          },
          { id: 11, title: "CSS Selectors", duration: "15:45", preview: false },
          { id: 12, title: "CSS Box Model", duration: "18:20", preview: false },
          { id: 13, title: "CSS Flexbox", duration: "22:15", preview: false },
          { id: 14, title: "CSS Grid", duration: "24:30", preview: false },
          {
            id: 15,
            title: "Responsive Design with CSS",
            duration: "28:10",
            preview: false,
          },
        ],
      },
      {
        id: 4,
        title: "JavaScript Basics",
        lessons: [
          {
            id: 16,
            title: "Introduction to JavaScript",
            duration: "15:20",
            preview: false,
          },
          {
            id: 17,
            title: "JavaScript Variables and Data Types",
            duration: "18:45",
            preview: false,
          },
          {
            id: 18,
            title: "JavaScript Functions",
            duration: "22:10",
            preview: false,
          },
          {
            id: 19,
            title: "JavaScript Arrays and Objects",
            duration: "25:30",
            preview: false,
          },
          {
            id: 20,
            title: "DOM Manipulation with JavaScript",
            duration: "30:15",
            preview: false,
          },
        ],
      },
    ],
  }
}

import type { Course, Instructor, Lesson, Section, Enrollment } from "@shared/schema";

export const mockCourses: (Course & { instructor: Instructor })[] = [
  {
    id: "course-1",
    title: "Complete Web Development Bootcamp",
    description: "Master full-stack web development with the most comprehensive course available.",
    shortDescription: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course.",
    category: "Programming",
    level: "Beginner",
    price: 89,
    originalPrice: 199,
    rating: 4.8,
    reviewCount: 2341,
    studentCount: 15432,
    duration: "52 hours",
    totalLessons: 64,
    instructorId: "inst-1",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    previewVideo: "https://example.com/preview1.mp4",
    isPublished: true,
    createdAt: new Date(),
    instructor: {
      id: "inst-1",
      name: "Dr. Angela Yu",
      title: "Lead Instructor at App Brewery",
      bio: "Dr. Angela Yu is a developer with a passion for teaching.",
      rating: 4.8,
      totalReviews: 45123,
      totalStudents: 189456,
      totalCourses: 12,
    },
  },
  {
    id: "course-2",
    title: "UI/UX Design Masterclass",
    description: "Master user interface and user experience design with Figma, Adobe XD, and design principles.",
    shortDescription: "Master user interface and user experience design with Figma, Adobe XD, and design principles.",
    category: "Design",
    level: "Intermediate",
    price: 69,
    originalPrice: 149,
    rating: 4.9,
    reviewCount: 1842,
    studentCount: 8934,
    duration: "38 hours",
    totalLessons: 45,
    instructorId: "inst-2",
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
    previewVideo: "https://example.com/preview2.mp4",
    isPublished: true,
    createdAt: new Date(),
    instructor: {
      id: "inst-2",
      name: "Sarah Johnson",
      title: "Senior UX Designer",
      bio: "Sarah is a seasoned UX designer with over 8 years of experience.",
      rating: 4.9,
      totalReviews: 12450,
      totalStudents: 67890,
      totalCourses: 8,
    },
  },
];

export const mockProgress = {
  enrolledCourses: 5,
  completedCourses: 2,
  certificates: 2,
  hoursLearned: 147,
};

export const mockCurrentCourses: (Course & { instructor: Instructor; progress: number })[] = [
  {
    ...mockCourses[0],
    progress: 35,
  },
  {
    ...mockCourses[1],
    progress: 68,
  },
];

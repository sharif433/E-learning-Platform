import { type User, type InsertUser, type Course, type InsertCourse, type Instructor, type InsertInstructor, type Lesson, type InsertLesson, type Section, type InsertSection, type Enrollment, type InsertEnrollment, type Review, type InsertReview } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Course methods
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Instructor methods
  getInstructor(id: string): Promise<Instructor | undefined>;
  getInstructors(): Promise<Instructor[]>;
  createInstructor(instructor: InsertInstructor): Promise<Instructor>;

  // Lesson methods
  getLessonsByCourse(courseId: string): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // Section methods
  getSectionsByCourse(courseId: string): Promise<Section[]>;
  createSection(section: InsertSection): Promise<Section>;

  // Enrollment methods
  getEnrollmentsByUser(userId: string): Promise<Enrollment[]>;
  getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(userId: string, courseId: string, progress: number): Promise<Enrollment>;

  // Review methods
  getReviewsByCourse(courseId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private courses: Map<string, Course> = new Map();
  private instructors: Map<string, Instructor> = new Map();
  private lessons: Map<string, Lesson> = new Map();
  private sections: Map<string, Section> = new Map();
  private enrollments: Map<string, Enrollment> = new Map();
  private reviews: Map<string, Review> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Create sample instructors
    const instructor1: Instructor = {
      id: "inst-1",
      name: "Dr. Angela Yu",
      title: "Lead Instructor at App Brewery",
      bio: "Dr. Angela Yu is a developer with a passion for teaching. She is the lead instructor at the London App Brewery, London's leading Programming Bootcamp.",
      rating: 4.8,
      totalReviews: 45123,
      totalStudents: 189456,
      totalCourses: 12,
    };

    const instructor2: Instructor = {
      id: "inst-2",
      name: "Sarah Johnson",
      title: "Senior UX Designer",
      bio: "Sarah is a seasoned UX designer with over 8 years of experience in creating user-centered designs.",
      rating: 4.9,
      totalReviews: 12450,
      totalStudents: 67890,
      totalCourses: 8,
    };

    const instructor3: Instructor = {
      id: "inst-3",
      name: "Michael Chen",
      title: "Data Science Director",
      bio: "Michael is a data science expert with 10+ years at leading tech companies. He specializes in machine learning and AI applications.",
      rating: 4.7,
      totalReviews: 18500,
      totalStudents: 95000,
      totalCourses: 15,
    };

    const instructor4: Instructor = {
      id: "inst-4",
      name: "Emily Rodriguez",
      title: "Digital Marketing Strategist",
      bio: "Emily has helped hundreds of businesses grow their online presence through strategic digital marketing campaigns.",
      rating: 4.8,
      totalReviews: 22000,
      totalStudents: 85000,
      totalCourses: 10,
    };

    const instructor5: Instructor = {
      id: "inst-5",
      name: "David Kim",
      title: "Business Strategy Consultant",
      bio: "Former McKinsey consultant with expertise in business strategy, operations, and entrepreneurship.",
      rating: 4.9,
      totalReviews: 8500,
      totalStudents: 42000,
      totalCourses: 6,
    };

    const instructor6: Instructor = {
      id: "inst-6",
      name: "Lisa Thompson",
      title: "Mobile App Developer",
      bio: "Lisa has developed over 50 mobile apps with millions of downloads. She specializes in React Native and Flutter.",
      rating: 4.6,
      totalReviews: 15200,
      totalStudents: 78000,
      totalCourses: 12,
    };

    this.instructors.set(instructor1.id, instructor1);
    this.instructors.set(instructor2.id, instructor2);
    this.instructors.set(instructor3.id, instructor3);
    this.instructors.set(instructor4.id, instructor4);
    this.instructors.set(instructor5.id, instructor5);
    this.instructors.set(instructor6.id, instructor6);

    // Create sample courses
    const course1: Course = {
      id: "course-1",
      title: "Complete Web Development Bootcamp",
      description: "Master full-stack web development with the most comprehensive course available. Learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB and deploy real projects.",
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
      instructorId: instructor1.id,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      previewVideo: "https://example.com/preview1.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course2: Course = {
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
      instructorId: instructor2.id,
      thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
      previewVideo: "https://example.com/preview2.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course3: Course = {
      id: "course-3",
      title: "Machine Learning with Python",
      description: "Learn machine learning from scratch using Python, scikit-learn, and TensorFlow. Build real-world ML models and understand the algorithms behind them.",
      shortDescription: "Complete machine learning course covering algorithms, data preprocessing, and model deployment.",
      category: "Data Science",
      level: "Intermediate",
      price: 119,
      originalPrice: 299,
      rating: 4.7,
      reviewCount: 3456,
      studentCount: 23000,
      duration: "45 hours",
      totalLessons: 78,
      instructorId: instructor3.id,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      previewVideo: "https://example.com/preview3.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course4: Course = {
      id: "course-4",
      title: "Digital Marketing Complete Course",
      description: "Master digital marketing with hands-on training in SEO, social media, email marketing, and Google Ads. Grow your business or start a marketing career.",
      shortDescription: "Complete digital marketing training covering SEO, social media, email marketing, and paid advertising.",
      category: "Marketing",
      level: "Beginner",
      price: 79,
      originalPrice: 179,
      rating: 4.8,
      reviewCount: 5234,
      studentCount: 34500,
      duration: "32 hours",
      totalLessons: 56,
      instructorId: instructor4.id,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      previewVideo: "https://example.com/preview4.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course5: Course = {
      id: "course-5",
      title: "Business Strategy and Entrepreneurship",
      description: "Learn how to develop winning business strategies, validate ideas, and build successful startups. Perfect for entrepreneurs and business professionals.",
      shortDescription: "Master business strategy, startup fundamentals, and entrepreneurial skills.",
      category: "Business",
      level: "Intermediate",
      price: 149,
      originalPrice: 299,
      rating: 4.9,
      reviewCount: 1823,
      studentCount: 12400,
      duration: "28 hours",
      totalLessons: 42,
      instructorId: instructor5.id,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      previewVideo: "https://example.com/preview5.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course6: Course = {
      id: "course-6",
      title: "React Native Mobile App Development",
      description: "Build cross-platform mobile apps with React Native. Learn to create iOS and Android apps using JavaScript and React principles.",
      shortDescription: "Create mobile apps for iOS and Android using React Native and JavaScript.",
      category: "Programming",
      level: "Intermediate",
      price: 99,
      originalPrice: 249,
      rating: 4.6,
      reviewCount: 2890,
      studentCount: 18700,
      duration: "40 hours",
      totalLessons: 65,
      instructorId: instructor6.id,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      previewVideo: "https://example.com/preview6.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course7: Course = {
      id: "course-7",
      title: "Data Analysis with Excel & Power BI",
      description: "Master data analysis using Excel and Power BI. Learn to create dashboards, analyze data, and make data-driven decisions.",
      shortDescription: "Complete data analysis course using Excel and Power BI for business intelligence.",
      category: "Data Science",
      level: "Beginner",
      price: 59,
      originalPrice: 139,
      rating: 4.5,
      reviewCount: 4567,
      studentCount: 28900,
      duration: "25 hours",
      totalLessons: 48,
      instructorId: instructor3.id,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      previewVideo: "https://example.com/preview7.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course8: Course = {
      id: "course-8",
      title: "Advanced Graphic Design with Adobe Creative Suite",
      description: "Master Photoshop, Illustrator, and InDesign. Create stunning graphics, logos, and layouts for print and digital media.",
      shortDescription: "Professional graphic design course covering Photoshop, Illustrator, and InDesign.",
      category: "Design",
      level: "Advanced",
      price: 129,
      originalPrice: 279,
      rating: 4.8,
      reviewCount: 2103,
      studentCount: 15600,
      duration: "48 hours",
      totalLessons: 72,
      instructorId: instructor2.id,
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      previewVideo: "https://example.com/preview8.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course9: Course = {
      id: "course-9",
      title: "Social Media Marketing Mastery",
      description: "Grow your brand on Instagram, Facebook, TikTok, and LinkedIn. Learn content creation, influencer marketing, and social media advertising.",
      shortDescription: "Complete social media marketing course for all major platforms.",
      category: "Marketing",
      level: "Beginner",
      price: 69,
      originalPrice: 159,
      rating: 4.7,
      reviewCount: 3721,
      studentCount: 25800,
      duration: "30 hours",
      totalLessons: 52,
      instructorId: instructor4.id,
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
      previewVideo: "https://example.com/preview9.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course10: Course = {
      id: "course-10",
      title: "Python Programming for Beginners",
      description: "Learn Python from zero to hero. Perfect for beginners who want to start programming. Covers basics, data structures, and real projects.",
      shortDescription: "Complete Python programming course for absolute beginners with hands-on projects.",
      category: "Programming",
      level: "Beginner",
      price: 49,
      originalPrice: 129,
      rating: 4.9,
      reviewCount: 6789,
      studentCount: 45600,
      duration: "35 hours",
      totalLessons: 68,
      instructorId: instructor1.id,
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
      previewVideo: "https://example.com/preview10.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course11: Course = {
      id: "course-11",
      title: "Financial Planning and Investment",
      description: "Learn personal finance, budgeting, investing in stocks, bonds, and real estate. Build wealth and secure your financial future.",
      shortDescription: "Complete guide to personal finance, investing, and wealth building strategies.",
      category: "Business",
      level: "Beginner",
      price: 89,
      originalPrice: 199,
      rating: 4.6,
      reviewCount: 2456,
      studentCount: 19300,
      duration: "22 hours",
      totalLessons: 38,
      instructorId: instructor5.id,
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e",
      previewVideo: "https://example.com/preview11.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    const course12: Course = {
      id: "course-12",
      title: "Flutter Mobile App Development",
      description: "Build beautiful mobile apps for iOS and Android using Flutter and Dart. Learn widgets, state management, and app deployment.",
      shortDescription: "Create cross-platform mobile apps with Flutter and Dart programming language.",
      category: "Programming",
      level: "Intermediate",
      price: 109,
      originalPrice: 259,
      rating: 4.7,
      reviewCount: 1987,
      studentCount: 14200,
      duration: "42 hours",
      totalLessons: 71,
      instructorId: instructor6.id,
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      previewVideo: "https://example.com/preview12.mp4",
      isPublished: true,
      createdAt: new Date(),
    };

    this.courses.set(course1.id, course1);
    this.courses.set(course2.id, course2);
    this.courses.set(course3.id, course3);
    this.courses.set(course4.id, course4);
    this.courses.set(course5.id, course5);
    this.courses.set(course6.id, course6);
    this.courses.set(course7.id, course7);
    this.courses.set(course8.id, course8);
    this.courses.set(course9.id, course9);
    this.courses.set(course10.id, course10);
    this.courses.set(course11.id, course11);
    this.courses.set(course12.id, course12);

    // Create sample sections and lessons for course1
    const section1: Section = {
      id: "section-1",
      courseId: course1.id,
      title: "Introduction to Web Development",
      order: 1,
      totalLessons: 8,
      totalDuration: "2h 15m",
    };

    this.sections.set(section1.id, section1);

    const lesson1: Lesson = {
      id: "lesson-1",
      courseId: course1.id,
      sectionId: section1.id,
      title: "What is Web Development?",
      description: "Learn the fundamentals of web development and what you'll be building in this course.",
      videoUrl: "https://example.com/lesson1.mp4",
      duration: "12:34",
      order: 1,
      isPreview: true,
    };

    const lesson2: Lesson = {
      id: "lesson-2",
      courseId: course1.id,
      sectionId: section1.id,
      title: "Setting Up Your Development Environment",
      description: "Install and configure all the tools you'll need for web development.",
      videoUrl: "https://example.com/lesson2.mp4",
      duration: "18:45",
      order: 2,
      isPreview: false,
    };

    this.lessons.set(lesson1.id, lesson1);
    this.lessons.set(lesson2.id, lesson2);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.category === category);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { ...insertCourse, id, createdAt: new Date() };
    this.courses.set(id, course);
    return course;
  }

  async getInstructor(id: string): Promise<Instructor | undefined> {
    return this.instructors.get(id);
  }

  async getInstructors(): Promise<Instructor[]> {
    return Array.from(this.instructors.values());
  }

  async createInstructor(insertInstructor: InsertInstructor): Promise<Instructor> {
    const id = randomUUID();
    const instructor: Instructor = { ...insertInstructor, id };
    this.instructors.set(id, instructor);
    return instructor;
  }

  async getLessonsByCourse(courseId: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = randomUUID();
    const lesson: Lesson = { ...insertLesson, id };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async getSectionsByCourse(courseId: string): Promise<Section[]> {
    return Array.from(this.sections.values())
      .filter(section => section.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const id = randomUUID();
    const section: Section = { ...insertSection, id };
    this.sections.set(id, section);
    return section;
  }

  async getEnrollmentsByUser(userId: string): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(enrollment => enrollment.userId === userId);
  }

  async getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined> {
    return Array.from(this.enrollments.values()).find(
      enrollment => enrollment.userId === userId && enrollment.courseId === courseId
    );
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = randomUUID();
    const enrollment: Enrollment = { ...insertEnrollment, id, enrolledAt: new Date() };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async updateEnrollmentProgress(userId: string, courseId: string, progress: number): Promise<Enrollment> {
    const enrollment = await this.getEnrollment(userId, courseId);
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }
    enrollment.progress = progress;
    this.enrollments.set(enrollment.id, enrollment);
    return enrollment;
  }

  async getReviewsByCourse(courseId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.courseId === courseId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { ...insertReview, id, createdAt: new Date() };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();

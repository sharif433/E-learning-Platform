import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Courses endpoints
  app.get("/api/courses", async (req, res) => {
    try {
      const { category } = req.query;
      let courses;
      
      if (category && typeof category === 'string') {
        courses = await storage.getCoursesByCategory(category);
      } else {
        courses = await storage.getCourses();
      }
      
      // Fetch instructor data for each course
      const coursesWithInstructors = await Promise.all(
        courses.map(async (course) => {
          const instructor = await storage.getInstructor(course.instructorId);
          return {
            ...course,
            instructor,
          };
        })
      );
      
      res.json(coursesWithInstructors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      const instructor = await storage.getInstructor(course.instructorId);
      const sections = await storage.getSectionsByCourse(course.id);
      const reviews = await storage.getReviewsByCourse(course.id);
      
      res.json({
        ...course,
        instructor,
        sections,
        reviews,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Lessons endpoints
  app.get("/api/courses/:courseId/lessons", async (req, res) => {
    try {
      const lessons = await storage.getLessonsByCourse(req.params.courseId);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await storage.getLesson(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  });

  // Instructors endpoints
  app.get("/api/instructors", async (req, res) => {
    try {
      const instructors = await storage.getInstructors();
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch instructors" });
    }
  });

  app.get("/api/instructors/:id", async (req, res) => {
    try {
      const instructor = await storage.getInstructor(req.params.id);
      if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
      }
      res.json(instructor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch instructor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

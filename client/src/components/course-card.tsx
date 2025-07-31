import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, User } from "lucide-react";
import { Link } from "wouter";
import type { Course, Instructor } from "@shared/schema";

interface CourseCardProps {
  course: Course & { instructor?: Instructor };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/course/${course.id}`}>
      <Card className="course-card overflow-hidden cursor-pointer">
        <div className="aspect-video overflow-hidden">
          <img
            src={course.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="bg-blue-100 text-primary">
              {course.category}
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{course.rating}</span>
              <span className="ml-1">({course.reviewCount})</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.shortDescription}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <User className="h-4 w-4 mr-2" />
              <span>{course.instructor?.name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{course.duration}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">${course.price}</span>
              {course.originalPrice && (
                <span className="text-gray-500 line-through ml-2">${course.originalPrice}</span>
              )}
            </div>
            <Button className="bg-primary hover:bg-blue-700">
              Enroll Now
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

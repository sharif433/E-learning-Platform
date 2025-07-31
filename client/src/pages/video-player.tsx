import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Play, ChevronLeft } from "lucide-react";
import { VideoPlayerComponent } from "@/components/video-player-component";
import type { Lesson, Course } from "@shared/schema";

export default function VideoPlayer() {
  const [, params] = useRoute("/video/:courseId/:lessonId");
  const { courseId, lessonId } = params || {};

  const { data: course } = useQuery<Course>({
    queryKey: ["/api/courses", courseId],
    enabled: !!courseId,
  });

  const { data: lessons = [] } = useQuery<Lesson[]>({
    queryKey: ["/api/courses", courseId, "lessons"],
    enabled: !!courseId,
  });

  const { data: currentLesson } = useQuery<Lesson>({
    queryKey: ["/api/lessons", lessonId],
    enabled: !!lessonId,
  });

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);
  const progressPercentage = Math.round(((currentLessonIndex + 1) / lessons.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player Area */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <Link href={`/course/${courseId}`}>
                <Button variant="ghost" className="mb-4">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Course
                </Button>
              </Link>
            </div>
            <VideoPlayerComponent lesson={currentLesson} />
          </div>

          {/* Course Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-fit max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Course Content</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{lessons.length} lectures</span>
                  <span>{course?.duration}</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-900 font-medium">
                      {currentLessonIndex + 1}/{lessons.length} ({progressPercentage}%)
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>

              {/* Lesson List */}
              <div className="divide-y divide-gray-200">
                {lessons.map((lesson, index) => {
                  const isCompleted = index < currentLessonIndex;
                  const isCurrent = lesson.id === lessonId;
                  
                  return (
                    <Link key={lesson.id} href={`/video/${courseId}/${lesson.id}`}>
                      <div
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          isCurrent ? "border-l-4 border-primary bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                            isCompleted 
                              ? "bg-green-500" 
                              : isCurrent 
                                ? "bg-primary" 
                                : "bg-gray-200"
                          }`}>
                            {isCompleted ? (
                              <Check className="text-white h-3 w-3" />
                            ) : (
                              <Play className={`h-3 w-3 ${isCurrent ? "text-white" : "text-gray-500"}`} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium truncate ${
                              isCurrent ? "text-primary" : "text-gray-900"
                            }`}>
                              {lesson.title}
                            </h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                              {isCurrent && (
                                <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                                  Current
                                </span>
                              )}
                              {isCompleted && (
                                <span className="text-xs text-green-600">Completed</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

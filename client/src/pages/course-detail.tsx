import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Star, Users, Clock, Globe, Play, ChevronDown, ChevronRight, FileText, Bookmark, Share, Download } from "lucide-react";
import { Link } from "wouter";
import type { Course, Instructor, Section, Review } from "@shared/schema";

type CourseDetail = Course & {
  instructor?: Instructor;
  sections?: Section[];
  reviews?: Review[];
};

export default function CourseDetail() {
  const [, params] = useRoute("/course/:id");
  const courseId = params?.id;

  const { data: course, isLoading } = useQuery<CourseDetail>({
    queryKey: ["/api/courses", courseId],
    enabled: !!courseId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Link href="/">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <Card className="overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 p-8">
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Courses
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href={`/?category=${course.category}`} className="hover:text-gray-900 transition-colors">
                  {course.category}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-gray-900">{course.title}</span>
              </nav>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="font-semibold text-gray-900">{course.rating}</span>
                  <span className="text-gray-500 ml-1">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{course.studentCount} students</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration} of video</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>English</span>
                </div>
              </div>
              
              {course.instructor && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">{course.instructor.name}</p>
                    <p className="text-sm text-gray-500">{course.instructor.title}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-8 flex flex-col">
              <div className="relative mb-6">
                <img
                  src={course.thumbnail || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"}
                  alt="Course Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Link href={`/video/${courseId}/lesson-1`}>
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg hover:bg-opacity-40 transition-all">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Play className="text-primary h-6 w-6 ml-1" />
                    </div>
                  </button>
                </Link>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                  {course.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through ml-2">${course.originalPrice}</span>
                      <Badge variant="destructive" className="ml-2">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-red-600 font-medium">Sale ends in 2 days!</p>
              </div>
              
              <Button className="w-full bg-primary hover:bg-blue-700 mb-3">
                Enroll Now
              </Button>
              <Button variant="outline" className="w-full mb-6">
                Add to Wishlist
              </Button>
              
              <div className="text-center text-sm text-gray-500">
                <p className="mb-2">30-Day Money-Back Guarantee</p>
                <p>Full Lifetime Access</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Course Content Tabs */}
        <Card>
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum" className="p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Course Curriculum</h3>
                <p className="text-gray-500">7 sections • {course.totalLessons} lectures • {course.duration} total length</p>
              </div>
              
              <div className="space-y-4">
                <Card className="overflow-hidden">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold text-gray-900">Section 1: Introduction to Web Development</span>
                    </div>
                    <span className="text-sm text-gray-500">8 lectures • 2h 15m</span>
                  </button>
                  <div className="border-t border-gray-200">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Play className="h-4 w-4 text-primary" />
                        <span className="text-gray-900">What is Web Development?</span>
                      </div>
                      <span className="text-sm text-gray-500">12:34</span>
                    </div>
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Play className="h-4 w-4 text-primary" />
                        <span className="text-gray-900">Setting Up Your Development Environment</span>
                      </div>
                      <span className="text-sm text-gray-500">18:45</span>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">Course Resources and Downloads</span>
                      </div>
                      <span className="text-sm text-gray-500">Article</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="p-8">
              {course.instructor && (
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor.name}</h3>
                    <p className="text-lg text-gray-600 mb-4">{course.instructor.title}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{course.instructor.rating}</div>
                        <div className="text-sm text-gray-500">Instructor Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{(course.instructor.totalReviews || 0).toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{(course.instructor.totalStudents || 0).toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{course.instructor.totalCourses}</div>
                        <div className="text-sm text-gray-500">Courses</div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{course.instructor.bio}</p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{course.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-gray-500">{course.reviewCount} reviews</div>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500 w-4">{rating}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: rating === 5 ? '75%' : rating === 4 ? '18%' : '5%' }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {rating === 5 ? '75%' : rating === 4 ? '18%' : '5%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-semibold text-gray-900">John Smith</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">2 weeks ago</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            Excellent course! Angela's teaching style is very clear and easy to follow. 
                            The projects are practical and really help solidify the concepts. Highly recommend for beginners.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}

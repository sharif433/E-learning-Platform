import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Book, CheckCircle, Award, Clock, Trophy, Star, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import { mockProgress, mockCurrentCourses } from "@/lib/mock-data";

export default function ProgressPage() {
  const stats = mockProgress;
  const currentCourses = mockCurrentCourses;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Progress</h1>
          <p className="text-gray-600">Track your learning journey and achievements</p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Book className="text-primary h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.enrolledCourses}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Enrolled Courses</h3>
            <p className="text-sm text-gray-500">Currently learning</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.completedCourses}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Completed Courses</h3>
            <p className="text-sm text-gray-500">Finished successfully</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="text-purple-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.certificates}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Certificates</h3>
            <p className="text-sm text-gray-500">Earned credentials</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.hoursLearned}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Hours Learned</h3>
            <p className="text-sm text-gray-500">Total study time</p>
          </Card>
        </div>

        {/* Current Courses */}
        <Card className="overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {currentCourses.map((course) => (
              <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-6">
                  <img
                    src={course.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c"}
                    alt="Course Thumbnail"
                    className="w-20 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{course.instructor.name}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 max-w-xs">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-gray-900 font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Link href={`/video/${course.id}/lesson-1`}>
                        <Button className="bg-primary hover:bg-blue-700">Continue</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Achievements */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Trophy className="text-yellow-600 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Course Completed</h3>
                  <p className="text-sm text-gray-500">Finished "Digital Marketing Complete Course"</p>
                  <p className="text-xs text-gray-400">2 days ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Learning Streak</h3>
                  <p className="text-sm text-gray-500">7 days of continuous learning</p>
                  <p className="text-xs text-gray-400">1 week ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="text-green-600 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">First Certificate</h3>
                  <p className="text-sm text-gray-500">Earned your first course certificate</p>
                  <p className="text-xs text-gray-400">2 weeks ago</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Learning Analytics */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">This Month</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">Hours Studied</span>
                    <span className="font-semibold text-gray-900">24 hours</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Goal: 30 hours</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">Lessons Completed</span>
                    <span className="font-semibold text-gray-900">18 lessons</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Goal: 30 lessons</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">Quiz Score Average</span>
                    <span className="font-semibold text-gray-900">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

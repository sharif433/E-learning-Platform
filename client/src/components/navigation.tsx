import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, GraduationCap, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">EduPlatform</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/"
                className={cn(
                  "pb-4 transition-colors border-b-2",
                  isActive("/") 
                    ? "text-primary font-medium border-primary" 
                    : "text-gray-500 hover:text-gray-900 border-transparent"
                )}
              >
                Courses
              </Link>
              <Link
                href="/progress"
                className={cn(
                  "pb-4 transition-colors border-b-2",
                  isActive("/progress") 
                    ? "text-primary font-medium border-primary" 
                    : "text-gray-500 hover:text-gray-900 border-transparent"
                )}
              >
                My Progress
              </Link>
              <Link
                href="/instructors"
                className={cn(
                  "pb-4 transition-colors border-b-2",
                  isActive("/instructors") 
                    ? "text-primary font-medium border-primary" 
                    : "text-gray-500 hover:text-gray-900 border-transparent"
                )}
              >
                Instructors
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search courses..."
                className="w-64 pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

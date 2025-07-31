import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Volume2, Maximize, Bookmark, Share, Download } from "lucide-react";
import type { Lesson } from "@shared/schema";

interface VideoPlayerProps {
  lesson: Lesson;
  onLessonComplete?: () => void;
}

export function VideoPlayerComponent({ lesson, onLessonComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [currentTime, setCurrentTime] = useState("12:34");
  const [totalTime] = useState(lesson.duration);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="bg-black rounded-lg overflow-hidden relative aspect-video">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="Video Content"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 video-overlay flex items-center justify-center">
          <Button
            onClick={togglePlay}
            size="lg"
            className="w-20 h-20 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full"
          >
            {isPlaying ? (
              <Pause className="text-primary h-8 w-8" />
            ) : (
              <Play className="text-primary h-8 w-8 ml-1" />
            )}
          </Button>
        </div>
        
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center space-x-4 text-white">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <div className="flex-1">
              <Progress value={progress} className="h-1" />
            </div>
            <span className="text-sm">{currentTime} / {totalTime}</span>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{lesson.title}</h2>
        <p className="text-gray-600 mb-4">{lesson.description}</p>
        <div className="flex items-center space-x-6">
          <Button variant="ghost" className="text-primary hover:text-blue-700">
            <Bookmark className="h-4 w-4 mr-2" />
            Bookmark
          </Button>
          <Button variant="ghost" className="text-primary hover:text-blue-700">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" className="text-primary hover:text-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </Card>
    </div>
  );
}

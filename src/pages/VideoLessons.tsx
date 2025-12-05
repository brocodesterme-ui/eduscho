import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { videoLessons, getAllClasses, getSubjectsByClass, getVideosBySubject, VideoLesson } from "@/data/videoLessons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Clock, BookOpen, Filter, X } from "lucide-react";

const VideoLessons = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<string>("10");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const classes = getAllClasses();
  const subjects = getSubjectsByClass(selectedClass);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
    }
  };

  const filteredVideos = selectedSubject === "all" 
    ? videoLessons.filter(v => v.className === selectedClass)
    : getVideosBySubject(selectedSubject, selectedClass);

  const handlePlayVideo = (video: VideoLesson) => {
    setSelectedVideo(video);
    setIsDialogOpen(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "intermediate": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "advanced": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Video Lessons</h1>
                <p className="text-muted-foreground">
                  Learn with curated video tutorials for each NCERT chapter
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>Class {c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Thumbnail */}
                  <div 
                    className="relative aspect-video bg-muted cursor-pointer group"
                    onClick={() => handlePlayVideo(video)}
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-3 rounded-full bg-primary text-primary-foreground">
                        <Play className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base line-clamp-2">{video.title}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {video.subject}
                      </Badge>
                      <Badge variant="outline">Ch. {video.chapter}</Badge>
                      <Badge className={getDifficultyColor(video.difficulty)}>
                        {video.difficulty}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {video.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos available for this selection yet.</p>
            </div>
          )}

          {/* Video Player Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl p-0">
              <DialogHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-lg">{selectedVideo?.title}</DialogTitle>
                </div>
              </DialogHeader>
              {selectedVideo && (
                <div className="p-4 pt-2">
                  <div className="aspect-video w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-muted-foreground">{selectedVideo.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline">Class {selectedVideo.className}</Badge>
                      <Badge variant="outline">{selectedVideo.subject}</Badge>
                      <Badge variant="outline">Chapter {selectedVideo.chapter}</Badge>
                      <Badge className={getDifficultyColor(selectedVideo.difficulty)}>
                        {selectedVideo.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default VideoLessons;

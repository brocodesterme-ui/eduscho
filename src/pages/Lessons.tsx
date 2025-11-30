import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Atom, Globe, BookOpen, Book, FileText, ChevronRight, Upload, Plus, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Chapter {
  id: string;
  subject_id: string;
  title: string;
  chapter_number: number;
  description: string;
  pdf_url: string | null;
}

const iconMap: Record<string, any> = {
  calculator: Calculator,
  atom: Atom,
  globe: Globe,
  "book-open": BookOpen,
  book: Book,
};

const Lessons = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Record<string, Chapter[]>>({});
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    subjectId: "",
    title: "",
    chapterNumber: "",
    description: "",
    file: null as File | null,
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchSubjects();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
    }
  };

  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .order("name");

      if (error) throw error;
      setSubjects(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load subjects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChapters = async (subjectId: string) => {
    if (chapters[subjectId]) return;

    try {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("subject_id", subjectId)
        .order("chapter_number");

      if (error) throw error;
      setChapters((prev) => ({ ...prev, [subjectId]: data || [] }));
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load chapters",
        variant: "destructive",
      });
    }
  };

  const handleSubjectClick = (subjectId: string) => {
    if (selectedSubject === subjectId) {
      setSelectedSubject(null);
    } else {
      setSelectedSubject(subjectId);
      fetchChapters(subjectId);
    }
  };

  const handleChapterClick = (chapter: Chapter) => {
    if (chapter.pdf_url) {
      window.open(chapter.pdf_url, "_blank");
    } else {
      toast({
        title: "Coming Soon",
        description: "This chapter's PDF will be available soon!",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadData({ ...uploadData, file });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a PDF file",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!uploadData.file || !uploadData.subjectId || !uploadData.title || !uploadData.chapterNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Upload PDF to storage
      const fileName = `${Date.now()}_${uploadData.file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("ncert-books")
        .upload(fileName, uploadData.file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("ncert-books")
        .getPublicUrl(fileName);

      // Create chapter entry
      const { error: insertError } = await supabase.from("chapters").insert({
        subject_id: uploadData.subjectId,
        title: uploadData.title,
        chapter_number: parseInt(uploadData.chapterNumber),
        description: uploadData.description,
        pdf_url: urlData.publicUrl,
      });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Chapter uploaded successfully",
      });

      // Refresh chapters
      setChapters((prev) => {
        const newChapters = { ...prev };
        delete newChapters[uploadData.subjectId];
        return newChapters;
      });
      fetchChapters(uploadData.subjectId);

      // Reset form
      setUploadData({
        subjectId: "",
        title: "",
        chapterNumber: "",
        description: "",
        file: null,
      });
      setIsUploadOpen(false);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload chapter",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="p-8">
          <div className="container mx-auto max-w-6xl">
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">NCERT Lessons</h1>
              <p className="text-muted-foreground">
                Access comprehensive study materials for all subjects
              </p>
            </div>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Chapter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New Chapter</DialogTitle>
                  <DialogDescription>
                    Add a new NCERT chapter PDF to the library
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select
                      value={uploadData.subjectId}
                      onValueChange={(value) =>
                        setUploadData({ ...uploadData, subjectId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Chapter Title</Label>
                    <Input
                      placeholder="e.g., Introduction to Algebra"
                      value={uploadData.title}
                      onChange={(e) =>
                        setUploadData({ ...uploadData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Chapter Number</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 1"
                      value={uploadData.chapterNumber}
                      onChange={(e) =>
                        setUploadData({ ...uploadData, chapterNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description (Optional)</Label>
                    <Input
                      placeholder="Brief description"
                      value={uploadData.description}
                      onChange={(e) =>
                        setUploadData({ ...uploadData, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>PDF File</Label>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="flex-1"
                      />
                      {uploadData.file && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setUploadData({ ...uploadData, file: null })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {uploadData.file && (
                      <p className="text-sm text-muted-foreground">{uploadData.file.name}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-full"
                  >
                    {isUploading ? "Uploading..." : "Upload Chapter"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const Icon = iconMap[subject.icon] || BookOpen;
              const isExpanded = selectedSubject === subject.id;

              return (
                <Card
                  key={subject.id}
                  className={`cursor-pointer transition-all ${
                    isExpanded ? "col-span-full" : ""
                  }`}
                >
                  <CardHeader onClick={() => handleSubjectClick(subject.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{subject.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {subject.description}
                          </CardDescription>
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-5 w-5 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent>
                      <div className="space-y-2 pt-4 border-t">
                        {chapters[subject.id]?.length > 0 ? (
                          chapters[subject.id].map((chapter) => (
                            <Button
                              key={chapter.id}
                              variant="ghost"
                              className="w-full justify-start gap-2"
                              onClick={() => handleChapterClick(chapter)}
                            >
                              <FileText className="h-4 w-4" />
                              <span className="text-left">
                                Chapter {chapter.chapter_number}: {chapter.title}
                              </span>
                            </Button>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No chapters yet. Click "Add Chapter" to upload PDFs.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;

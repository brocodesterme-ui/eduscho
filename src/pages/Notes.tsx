import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, Sparkles, ChevronLeft, ChevronRight, BookOpen, Lightbulb, FlaskConical, ListChecks, Quote } from "lucide-react";

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Science", "English", "History"];
const classes = ["6", "7", "8", "9", "10", "11", "12"];

interface ContentBlock {
  type: "heading" | "paragraph" | "bullets" | "formula" | "definition" | "tip" | "example";
  text?: string;
  items?: string[];
  term?: string;
  label?: string;
}

interface NotePage {
  title: string;
  content: ContentBlock[];
}

const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "heading":
      return (
        <h3 className="text-lg font-bold text-primary mt-5 mb-2 flex items-center gap-2">
          <BookOpen className="h-4 w-4 shrink-0" />
          {block.text}
        </h3>
      );
    case "paragraph":
      return <p className="text-foreground/90 leading-relaxed mb-3">{block.text}</p>;
    case "bullets":
      return (
        <ul className="space-y-1.5 mb-3 ml-1">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-foreground/90">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "formula":
      return (
        <div className="my-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
            <FlaskConical className="h-3.5 w-3.5" /> FORMULA
          </div>
          <p className="font-mono text-sm text-foreground">{block.text}</p>
        </div>
      );
    case "definition":
      return (
        <div className="my-3 rounded-lg border border-accent/30 bg-accent/5 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-foreground mb-1">
            <Quote className="h-3.5 w-3.5" /> {block.term}
          </div>
          <p className="text-foreground/90 text-sm">{block.text}</p>
        </div>
      );
    case "tip":
      return (
        <div className="my-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-yellow-600 dark:text-yellow-400 mb-1">
            <Lightbulb className="h-3.5 w-3.5" /> {block.label || "Tip"}
          </div>
          <p className="text-foreground/90 text-sm">{block.text}</p>
        </div>
      );
    case "example":
      return (
        <div className="my-3 rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-green-600 dark:text-green-400 mb-1">
            <ListChecks className="h-3.5 w-3.5" /> Example
          </div>
          <p className="text-foreground/90 text-sm whitespace-pre-wrap">{block.text}</p>
        </div>
      );
    default:
      return <p className="text-foreground/90 mb-2">{block.text}</p>;
  }
};

const Notes = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [topic, setTopic] = useState("");
  const [pages, setPages] = useState<NotePage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const generateNotes = async () => {
    if (!selectedSubject || !selectedClass || !topic) {
      toast({ title: "Missing Information", description: "Please select subject, class, and enter a topic", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setPages([]);
    setCurrentPage(0);

    try {
      const response = await supabase.functions.invoke("generate-notes", {
        body: { subject: selectedSubject, className: selectedClass, topic },
      });

      if (response.error) throw new Error(response.error.message || "Failed to generate notes");

      const data = response.data;
      if (data.pages && data.pages.length > 0) {
        setPages(data.pages);
        toast({ title: "Notes Generated!", description: `Created ${data.pages.length} pages for ${topic}` });
      } else {
        throw new Error("No notes were generated");
      }
    } catch (error: any) {
      console.error("Error generating notes:", error);
      toast({ title: "Error", description: error.message || "Failed to generate notes", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const page = pages[currentPage];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1 flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            AI Study Notes
          </h1>
          <p className="text-muted-foreground">Generate detailed study notes for any NCERT topic</p>
        </div>

        {/* Form */}
        <Card className="mb-8 glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Generate Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger><SelectValue placeholder="Class" /></SelectTrigger>
                <SelectContent>
                  {classes.map((c) => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input placeholder="Enter topic..." value={topic} onChange={(e) => setTopic(e.target.value)} className="lg:col-span-1" />
              <Button onClick={generateNotes} disabled={isLoading} className="w-full">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate</>}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Generating your notes...</p>
          </div>
        )}

        {/* Notes display */}
        {pages.length > 0 && page && (
          <div className="space-y-4">
            {/* Page header */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{selectedSubject}</Badge>
                <Badge variant="outline">Class {selectedClass}</Badge>
                <Badge>{topic}</Badge>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                Page {currentPage + 1} of {pages.length}
              </span>
            </div>

            {/* Page content - notebook style */}
            <Card className="relative overflow-hidden border-2 min-h-[500px]">
              {/* Notebook left border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/60" />
              <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/10" />

              <CardContent className="p-6 pl-12">
                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">
                  {page.title}
                </h2>
                <div>
                  {page.content?.map((block, i) => (
                    <ContentBlockRenderer key={i} block={block} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
              </Button>

              <div className="flex gap-1">
                {pages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === currentPage ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
                disabled={currentPage === pages.length - 1}
              >
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {pages.length === 0 && !isLoading && (
          <Card className="max-w-lg mx-auto">
            <CardContent className="py-16 text-center">
              <BookOpen className="h-14 w-14 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Notes Yet</h3>
              <p className="text-muted-foreground text-sm">
                Select a class, subject, and topic to generate structured study notes
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Notes;

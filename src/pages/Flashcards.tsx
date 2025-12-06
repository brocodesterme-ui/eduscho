import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RotateCcw, ChevronLeft, ChevronRight, Sparkles, BookOpen } from "lucide-react";

interface Flashcard {
  front: string;
  back: string;
}

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Science", "English", "History"];
const classes = ["6", "7", "8", "9", "10", "11", "12"];

const Flashcards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateFlashcards = async () => {
    if (!selectedSubject || !selectedClass || !topic) {
      toast({
        title: "Missing Information",
        description: "Please select subject, class, and enter a topic",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-flashcards", {
        body: {
          subject: selectedSubject,
          className: selectedClass,
          topic: topic,
          count: 10,
        },
      });

      if (error) throw error;

      if (data?.flashcards) {
        setFlashcards(data.flashcards);
        setCurrentIndex(0);
        setIsFlipped(false);
        toast({
          title: "Flashcards Generated!",
          description: `Created ${data.flashcards.length} flashcards for ${topic}`,
        });
      }
    } catch (error: any) {
      console.error("Error generating flashcards:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate flashcards",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            AI Flashcard Generator
          </h1>
          <p className="text-muted-foreground">
            Generate study flashcards for any NCERT topic using AI
          </p>
        </div>

        {/* Generator Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generate New Flashcards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>
                      Class {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Enter topic (e.g., Photosynthesis)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />

              <Button onClick={generateFlashcards} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Flashcard Display */}
        {flashcards.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary">
                Card {currentIndex + 1} of {flashcards.length}
              </Badge>
              <Badge variant="outline">{selectedSubject} - Class {selectedClass}</Badge>
            </div>

            <div
              className="relative h-80 cursor-pointer perspective-1000"
              onClick={flipCard}
            >
              <div
                className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <Card
                  className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-primary/5"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wide">Question</p>
                    <p className="text-xl font-medium text-foreground">{flashcards[currentIndex]?.front}</p>
                    <p className="text-sm text-muted-foreground mt-6">Click to flip</p>
                  </div>
                </Card>

                {/* Back */}
                <Card
                  className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-green-500/10 to-green-500/5"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wide">Answer</p>
                    <p className="text-xl font-medium text-foreground">{flashcards[currentIndex]?.back}</p>
                    <p className="text-sm text-muted-foreground mt-6">Click to flip back</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" onClick={prevCard}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" onClick={() => setIsFlipped(false)}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button variant="outline" onClick={nextCard}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {flashcards.length === 0 && !isLoading && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Flashcards Yet</h3>
              <p className="text-muted-foreground">
                Select a class, subject, and topic above to generate AI-powered flashcards
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Flashcards;

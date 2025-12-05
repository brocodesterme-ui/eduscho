import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { olympiadExams, OlympiadExam } from "@/data/olympiadData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Atom, Microscope, Pi, Trophy, Calendar, BookOpen, MessageSquare, Zap, Target } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Calculator,
  Atom,
  Microscope,
  Pi,
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  green: "bg-green-500/10 text-green-500 border-green-500/20",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

const OlympiadPrep = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedExam, setSelectedExam] = useState<OlympiadExam | null>(null);

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

  const handleStartQuiz = (exam: OlympiadExam) => {
    navigate("/quiz", {
      state: {
        teacherType: `${exam.id}-olympiad`,
        teacherName: exam.name,
        subject: exam.fullName,
      },
    });
  };

  const handleStartChallenge = (exam: OlympiadExam) => {
    navigate("/challenge", {
      state: {
        teacherType: `${exam.id}-olympiad`,
        teacherName: exam.name,
        subject: exam.fullName,
      },
    });
  };

  const handleStartChat = (exam: OlympiadExam) => {
    navigate("/chat", {
      state: {
        teacherType: `${exam.id}-olympiad`,
        teacherName: `${exam.name} Tutor`,
        systemPrompt: `You are an expert tutor for ${exam.fullName} (${exam.name}). Help students prepare for the olympiad by explaining concepts, solving problems, and providing study strategies. Focus on topics like: ${exam.topics.map(t => t.title).join(", ")}.`,
      },
    });
  };

  const Icon = ({ name }: { name: string }) => {
    const IconComponent = iconMap[name] || Calculator;
    return <IconComponent className="h-6 w-6" />;
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
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Olympiad Preparation</h1>
                <p className="text-muted-foreground">
                  Prepare for IMO, NSO, IOS, IOM and more
                </p>
              </div>
            </div>
          </div>

          {/* Olympiad Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {olympiadExams.map((exam) => (
              <Card 
                key={exam.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${selectedExam?.id === exam.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedExam(exam)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${colorMap[exam.color]}`}>
                      <Icon name={exam.icon} />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {exam.name}
                        <Badge variant="outline">{exam.organizer}</Badge>
                      </CardTitle>
                      <CardDescription>{exam.fullName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{exam.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">
                      <Calendar className="h-3 w-3 mr-1" />
                      {exam.examPattern.duration}
                    </Badge>
                    <Badge variant="secondary">
                      {exam.examPattern.totalQuestions} Questions
                    </Badge>
                    <Badge variant="secondary">
                      Classes {exam.eligibleClasses[0]}-{exam.eligibleClasses[exam.eligibleClasses.length - 1]}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={(e) => { e.stopPropagation(); handleStartChat(exam); }}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleStartQuiz(exam); }}>
                      <Target className="h-4 w-4 mr-1" />
                      Quiz
                    </Button>
                    <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); handleStartChallenge(exam); }}>
                      <Zap className="h-4 w-4 mr-1" />
                      Challenge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Exam Details */}
          {selectedExam && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedExam.fullName} - Topics & Syllabus</CardTitle>
                <CardDescription>Comprehensive preparation guide</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="topics">
                  <TabsList className="mb-4">
                    <TabsTrigger value="topics">Topics</TabsTrigger>
                    <TabsTrigger value="pattern">Exam Pattern</TabsTrigger>
                    <TabsTrigger value="dates">Important Dates</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="topics">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedExam.topics.map((topic) => (
                        <div key={topic.id} className="p-4 rounded-lg border bg-card">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{topic.title}</h4>
                            <Badge 
                              variant={topic.difficulty === "easy" ? "secondary" : topic.difficulty === "medium" ? "outline" : "destructive"}
                            >
                              {topic.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="pattern">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 rounded-lg border bg-card text-center">
                          <p className="text-2xl font-bold text-primary">{selectedExam.examPattern.duration}</p>
                          <p className="text-sm text-muted-foreground">Duration</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card text-center">
                          <p className="text-2xl font-bold text-primary">{selectedExam.examPattern.totalQuestions}</p>
                          <p className="text-sm text-muted-foreground">Questions</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card text-center">
                          <p className="text-2xl font-bold text-primary">{selectedExam.examPattern.marksPerQuestion}</p>
                          <p className="text-sm text-muted-foreground">Marks/Question</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card text-center">
                          <p className="text-2xl font-bold text-primary">{selectedExam.examPattern.negativeMarking ? "Yes" : "No"}</p>
                          <p className="text-sm text-muted-foreground">Negative Marking</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Sections:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedExam.examPattern.sections.map((section, idx) => (
                            <Badge key={idx} variant="outline">{section}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="dates">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg border bg-card">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">Registration</h4>
                        </div>
                        <p className="text-muted-foreground">{selectedExam.importantDates.registration}</p>
                      </div>
                      <div className="p-4 rounded-lg border bg-card">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">Level 1 Exam</h4>
                        </div>
                        <p className="text-muted-foreground">{selectedExam.importantDates.level1}</p>
                      </div>
                      <div className="p-4 rounded-lg border bg-card">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">Level 2 Exam</h4>
                        </div>
                        <p className="text-muted-foreground">{selectedExam.importantDates.level2}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources">
                    <div className="space-y-2">
                      {selectedExam.resources.map((resource, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>{resource}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OlympiadPrep;

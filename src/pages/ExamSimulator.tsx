import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2, Clock, AlertTriangle, CheckCircle2, XCircle, Eye,
  ChevronLeft, ChevronRight, Flag, BarChart3, Trophy, Zap, Shield,
  BookOpen, Target, Timer, Brain
} from "lucide-react";

const examTypes = ["CBSE Board", "ICSE Board", "JEE Mains", "JEE Advanced", "NEET", "Olympiad"];
const subjects = ["Mathematics", "Physics", "Chemistry", "Biology"];
const classes = ["9", "10", "11", "12"];
const questionCounts = ["10", "15", "20", "30"];

interface ExamQuestion {
  question_number: number;
  question_text: string;
  options: Record<string, string>;
  correct_answer: string;
  user_answer?: string;
  explanation: string;
  topic: string;
  difficulty: string;
  marks: number;
  negative_marks: number;
  flagged?: boolean;
}

type ExamPhase = "setup" | "exam" | "results";

const ExamSimulator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Setup
  const [examType, setExamType] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [numQuestions, setNumQuestions] = useState("15");
  const [isGenerating, setIsGenerating] = useState(false);

  // Exam state
  const [phase, setPhase] = useState<ExamPhase>("setup");
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Results
  const [results, setResults] = useState<{
    correct: number; wrong: number; skipped: number;
    marks: number; total: number; timeTaken: number;
    topicWise: Record<string, { correct: number; total: number }>;
  } | null>(null);

  // Tab switch detection (proctoring)
  useEffect(() => {
    if (phase !== "exam") return;
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitches(prev => {
          const next = prev + 1;
          if (next >= 3) {
            toast({ title: "⚠️ Warning!", description: `You've switched tabs ${next} times. Your exam may be flagged.`, variant: "destructive" });
          }
          return next;
        });
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [phase, toast]);

  // Timer
  useEffect(() => {
    if (phase !== "exam" || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const startExam = async () => {
    if (!examType || !subject || !classLevel) {
      toast({ title: "Missing info", description: "Select exam type, subject, and class", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    try {
      const res = await supabase.functions.invoke("generate-exam", {
        body: { examType, subject, classLevel, numQuestions: parseInt(numQuestions) },
      });
      if (res.error) throw new Error(res.error.message);
      const data = res.data;
      setQuestions(data.questions.map((q: ExamQuestion) => ({ ...q, flagged: false })));
      setTimeLeft(data.timeLimit);
      setTotalTime(data.timeLimit);
      setCurrentQ(0);
      setTabSwitches(0);
      setPhase("exam");
      toast({ title: "Exam Started!", description: `${data.questions.length} questions • ${formatTime(data.timeLimit)}` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const selectAnswer = (answer: string) => {
    setQuestions(prev => prev.map((q, i) =>
      i === currentQ ? { ...q, user_answer: q.user_answer === answer ? undefined : answer } : q
    ));
  };

  const toggleFlag = () => {
    setQuestions(prev => prev.map((q, i) =>
      i === currentQ ? { ...q, flagged: !q.flagged } : q
    ));
  };

  const submitExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correct = 0, wrong = 0, skipped = 0, marksObtained = 0;
    const topicWise: Record<string, { correct: number; total: number }> = {};

    questions.forEach(q => {
      if (!topicWise[q.topic]) topicWise[q.topic] = { correct: 0, total: 0 };
      topicWise[q.topic].total++;

      if (!q.user_answer) {
        skipped++;
      } else if (q.user_answer === q.correct_answer) {
        correct++;
        marksObtained += q.marks;
        topicWise[q.topic].correct++;
      } else {
        wrong++;
        marksObtained -= q.negative_marks;
      }
    });

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    setResults({
      correct, wrong, skipped,
      marks: Math.max(0, marksObtained),
      total: totalMarks,
      timeTaken: totalTime - timeLeft,
      topicWise,
    });
    setPhase("results");
  }, [questions, totalTime, timeLeft]);

  const q = questions[currentQ];
  const answered = questions.filter(q => q.user_answer).length;
  const flagged = questions.filter(q => q.flagged).length;
  const timePercent = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const isTimeLow = timeLeft < 300;

  // ─── SETUP PHASE ───
  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="h-4 w-4" /> Only on EduScho
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">AI Exam Simulator</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Experience real exam pressure with AI-generated papers, timed tests, tab-switch proctoring, negative marking, and instant detailed analytics
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { icon: Timer, title: "Real Time Pressure", desc: "Exam-accurate time limits per question" },
              { icon: Shield, title: "Tab Proctoring", desc: "Monitors tab switches like real exams" },
              { icon: Target, title: "Negative Marking", desc: "JEE/NEET style marking scheme" },
              { icon: Brain, title: "AI Analytics", desc: "Topic-wise strength & weakness analysis" },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="glass-card border-primary/10">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="rounded-xl bg-primary/10 p-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Configure Your Exam
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Exam Type</label>
                  <Select value={examType} onValueChange={setExamType}>
                    <SelectTrigger><SelectValue placeholder="Select exam" /></SelectTrigger>
                    <SelectContent>
                      {examTypes.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Subject</label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                    <SelectContent>
                      {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Class</label>
                  <Select value={classLevel} onValueChange={setClassLevel}>
                    <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                    <SelectContent>
                      {classes.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Questions</label>
                  <Select value={numQuestions} onValueChange={setNumQuestions}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {questionCounts.map(n => <SelectItem key={n} value={n}>{n} Questions</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={startExam} disabled={isGenerating} className="w-full" size="lg">
                {isGenerating ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating Exam Paper...</> : <><Zap className="mr-2 h-5 w-5" />Start Exam</>}
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // ─── EXAM PHASE ───
  if (phase === "exam" && q) {
    return (
      <div className="min-h-screen bg-background">
        {/* Tab switch warning */}
        {showWarning && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground py-3 px-4 text-center font-medium animate-in slide-in-from-top">
            <AlertTriangle className="inline h-5 w-5 mr-2" />
            Tab switch detected! ({tabSwitches}/3 warnings)
          </div>
        )}

        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 py-2">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-semibold">{examType}</Badge>
              <Badge variant="secondary">{subject}</Badge>
            </div>
            <div className={`flex items-center gap-2 font-mono text-lg font-bold ${isTimeLow ? "text-destructive animate-pulse" : "text-foreground"}`}>
              <Clock className="h-5 w-5" />
              {formatTime(timeLeft)}
            </div>
            <div className="flex items-center gap-2">
              {tabSwitches > 0 && (
                <Badge variant="destructive" className="gap-1">
                  <Eye className="h-3 w-3" /> {tabSwitches}
                </Badge>
              )}
              <Button variant="destructive" size="sm" onClick={() => {
                if (confirm("Are you sure you want to submit? You cannot change answers after submission.")) submitExam();
              }}>
                Submit Exam
              </Button>
            </div>
          </div>
          <Progress value={timePercent} className="h-1 mt-2" />
        </div>

        <main className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_240px] gap-6">
            {/* Question */}
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">Q{q.question_number}</span>
                    <Badge variant={q.difficulty === "hard" ? "destructive" : q.difficulty === "medium" ? "default" : "secondary"}>
                      {q.difficulty}
                    </Badge>
                    <Badge variant="outline">{q.topic}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-green-500">+{q.marks}</span>
                    {q.negative_marks > 0 && <span className="text-destructive">-{q.negative_marks}</span>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-foreground leading-relaxed">{q.question_text}</p>

                <div className="space-y-3">
                  {Object.entries(q.options).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => selectAnswer(key)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        q.user_answer === key
                          ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/40 hover:bg-muted/50"
                      }`}
                    >
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-bold ${
                        q.user_answer === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {key}
                      </span>
                      <span className="text-foreground">{value}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentQ(p => Math.max(0, p - 1))} disabled={currentQ === 0}>
                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                  </Button>
                  <Button variant={q.flagged ? "default" : "outline"} onClick={toggleFlag} className="gap-2">
                    <Flag className="h-4 w-4" /> {q.flagged ? "Flagged" : "Flag"}
                  </Button>
                  {currentQ < questions.length - 1 ? (
                    <Button onClick={() => setCurrentQ(p => p + 1)}>
                      Next <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="destructive" onClick={() => {
                      if (confirm("Submit exam?")) submitExam();
                    }}>
                      Submit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Question palette */}
            <Card className="h-fit sticky top-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Question Palette</CardTitle>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>{answered}/{questions.length} answered</span>
                  {flagged > 0 && <span className="text-primary">{flagged} flagged</span>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQ(i)}
                      className={`relative h-10 w-10 rounded-lg text-sm font-medium transition-all ${
                        i === currentQ
                          ? "ring-2 ring-primary bg-primary text-primary-foreground"
                          : item.user_answer
                          ? "bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {i + 1}
                      {item.flagged && (
                        <Flag className="absolute -top-1 -right-1 h-3 w-3 text-primary fill-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // ─── RESULTS PHASE ───
  if (phase === "results" && results) {
    const percentage = results.total > 0 ? Math.round((results.marks / results.total) * 100) : 0;
    const grade = percentage >= 90 ? "A+" : percentage >= 75 ? "A" : percentage >= 60 ? "B" : percentage >= 45 ? "C" : "D";

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Score card */}
          <Card className="mb-6 overflow-hidden">
            <div className={`p-8 text-center ${percentage >= 60 ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10" : "bg-gradient-to-br from-orange-500/10 to-red-500/10"}`}>
              <Trophy className={`h-12 w-12 mx-auto mb-3 ${percentage >= 60 ? "text-green-500" : "text-orange-500"}`} />
              <h1 className="text-4xl font-bold text-foreground mb-1">
                {results.marks}/{results.total} <span className="text-2xl text-muted-foreground">({percentage}%)</span>
              </h1>
              <Badge className="text-lg px-4 py-1">Grade: {grade}</Badge>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <span className="flex items-center gap-1 text-green-500"><CheckCircle2 className="h-4 w-4" /> {results.correct} Correct</span>
                <span className="flex items-center gap-1 text-destructive"><XCircle className="h-4 w-4" /> {results.wrong} Wrong</span>
                <span className="text-muted-foreground">{results.skipped} Skipped</span>
                <span className="text-muted-foreground"><Clock className="h-4 w-4 inline mr-1" />{formatTime(results.timeTaken)}</span>
              </div>
              {tabSwitches > 0 && (
                <Badge variant="destructive" className="mt-3">
                  <Eye className="h-3 w-3 mr-1" /> {tabSwitches} tab switch(es) detected
                </Badge>
              )}
            </div>
          </Card>

          {/* Topic analysis */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-5 w-5 text-primary" /> Topic-wise Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(results.topicWise).map(([topic, data]) => {
                const pct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={topic}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{topic}</span>
                      <span className="text-muted-foreground">{data.correct}/{data.total} ({pct}%)</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Answer review */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Answer Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((q, i) => {
                const isCorrect = q.user_answer === q.correct_answer;
                const isSkipped = !q.user_answer;
                return (
                  <div key={i} className={`p-4 rounded-xl border-2 ${isSkipped ? "border-muted" : isCorrect ? "border-green-500/30 bg-green-500/5" : "border-destructive/30 bg-destructive/5"}`}>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="font-bold text-primary">Q{q.question_number}.</span>
                      <p className="text-foreground flex-1">{q.question_text}</p>
                      {isSkipped ? (
                        <Badge variant="secondary">Skipped</Badge>
                      ) : isCorrect ? (
                        <Badge className="bg-green-500/20 text-green-600 border-green-500/30">✓ Correct</Badge>
                      ) : (
                        <Badge variant="destructive">✗ Wrong</Badge>
                      )}
                    </div>
                    <div className="ml-6 space-y-1 text-sm">
                      {!isSkipped && !isCorrect && (
                        <p className="text-destructive">Your answer: {q.user_answer} — {q.options[q.user_answer!]}</p>
                      )}
                      <p className="text-green-600 dark:text-green-400">Correct: {q.correct_answer} — {q.options[q.correct_answer]}</p>
                      <p className="text-muted-foreground mt-2 italic">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="flex gap-3 justify-center">
            <Button onClick={() => { setPhase("setup"); setResults(null); setQuestions([]); }}>
              Take Another Exam
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return null;
};

export default ExamSimulator;

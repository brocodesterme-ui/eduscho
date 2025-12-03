import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Timer, Zap, Trophy, AlertTriangle } from "lucide-react";

interface QuizQuestion {
  question_number: number;
  question_text: string;
  question_type: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

const CHALLENGE_TIME_PER_QUESTION = 30; // seconds per question
const CHALLENGE_QUESTIONS = 10;

const Challenge = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { teacherType, teacherName, teacherAvatar, subject } = location.state || {};

  const [user, setUser] = useState<any>(null);
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ answer: string; isCorrect: boolean }[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_TIME_PER_QUESTION);
  const [totalTime, setTotalTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (phase === "quiz" && questions.length > 0) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, currentQuestionIndex]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!teacherType) {
      navigate("/olympiad");
    }
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(CHALLENGE_TIME_PER_QUESTION);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        setTotalTime((t) => t + 1);
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeout = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Auto-submit wrong answer on timeout
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      handleAnswer("");
    }
  }, [currentQuestionIndex, questions]);

  const startChallenge = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: {
          teacherType,
          subject: subject || teacherName,
          difficulty: "hard",
          numberOfQuestions: CHALLENGE_QUESTIONS,
        },
      });

      if (error) throw error;
      if (!data?.questions || data.questions.length === 0) {
        throw new Error("No questions generated");
      }

      const { data: sessionData, error: sessionError } = await supabase
        .from("quiz_sessions")
        .insert({
          user_id: user.id,
          teacher_type: teacherType,
          subject: `${subject || teacherName} Challenge`,
          difficulty: "hard",
          total_questions: CHALLENGE_QUESTIONS,
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      const questionsToInsert = data.questions.map((q: QuizQuestion, index: number) => ({
        session_id: sessionData.id,
        question_number: index + 1,
        question_text: q.question_text,
        question_type: q.question_type,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
      }));

      await supabase.from("quiz_questions").insert(questionsToInsert);

      setQuestions(data.questions);
      setSessionId(sessionData.id);
      setPhase("quiz");
      setTotalTime(0);
    } catch (error: any) {
      console.error("Challenge start error:", error);
      toast({
        title: "Failed to start challenge",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    await supabase
      .from("quiz_questions")
      .update({
        user_answer: answer || "TIMEOUT",
        is_correct: isCorrect,
        time_spent_seconds: CHALLENGE_TIME_PER_QUESTION - timeLeft,
        answered_at: new Date().toISOString(),
      })
      .eq("session_id", sessionId)
      .eq("question_number", currentQuestionIndex + 1);

    const newAnswers = [...answers, { answer, isCorrect }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Challenge complete
      const correctCount = newAnswers.filter(a => a.isCorrect).length;
      
      await supabase
        .from("quiz_sessions")
        .update({
          correct_answers: correctCount,
          time_taken_seconds: totalTime,
          completed_at: new Date().toISOString(),
        })
        .eq("id", sessionId);

      setPhase("results");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const correctCount = answers.filter(a => a.isCorrect).length;
  const accuracy = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;

  if (!user || !teacherType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Intro Phase */}
        {phase === "intro" && (
          <div className="max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => navigate("/olympiad")} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Olympiad
            </Button>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Zap className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl">Challenge Mode</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center gap-4">
                  <img
                    src={teacherAvatar}
                    alt={teacherName}
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <p className="text-muted-foreground">
                  Test your skills with {teacherName} in this timed challenge!
                </p>

                <div className="grid grid-cols-3 gap-4 text-center py-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{CHALLENGE_QUESTIONS}</p>
                    <p className="text-sm text-muted-foreground">Questions</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{CHALLENGE_TIME_PER_QUESTION}s</p>
                    <p className="text-sm text-muted-foreground">Per Question</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">Hard</p>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-center text-amber-600 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="text-sm">No going back! Answer quickly or lose points.</p>
                </div>

                <Button onClick={startChallenge} disabled={isLoading} size="lg" className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Preparing Challenge...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Start Challenge
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quiz Phase */}
        {phase === "quiz" && currentQuestion && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Progress and Timer */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {currentQuestionIndex + 1}/{questions.length}
                </Badge>
                <Badge variant="secondary">
                  {correctCount} correct
                </Badge>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                timeLeft <= 10 ? "bg-destructive/10 text-destructive" : "bg-muted"
              }`}>
                <Timer className={`h-5 w-5 ${timeLeft <= 10 ? "animate-pulse" : ""}`} />
                <span className="font-mono text-xl font-bold">{timeLeft}s</span>
              </div>
            </div>

            <Progress value={(timeLeft / CHALLENGE_TIME_PER_QUESTION) * 100} className="h-2" />

            {/* Question Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl leading-relaxed">
                  {currentQuestion.question_text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-4 px-6 text-left justify-start whitespace-normal"
                      onClick={() => handleAnswer(option.charAt(0))}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Phase */}
        {phase === "results" && (
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Trophy className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl">Challenge Complete!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center py-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-3xl font-bold text-primary">{correctCount}</p>
                    <p className="text-sm text-muted-foreground">Correct</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-3xl font-bold">{accuracy.toFixed(0)}%</p>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-3xl font-bold">{totalTime}s</p>
                    <p className="text-sm text-muted-foreground">Time</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {accuracy >= 80 && <Badge className="bg-green-500">Excellent!</Badge>}
                  {accuracy >= 60 && accuracy < 80 && <Badge className="bg-yellow-500">Good Job!</Badge>}
                  {accuracy < 60 && <Badge variant="secondary">Keep Practicing!</Badge>}
                </div>

                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => navigate("/leaderboard")}>
                    <Trophy className="mr-2 h-4 w-4" />
                    Leaderboard
                  </Button>
                  <Button onClick={() => {
                    setPhase("intro");
                    setQuestions([]);
                    setCurrentQuestionIndex(0);
                    setAnswers([]);
                    setSessionId(null);
                  }}>
                    <Zap className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenge;

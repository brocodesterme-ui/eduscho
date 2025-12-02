import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import QuizSetup from "@/components/quiz/QuizSetup";
import QuizCard from "@/components/quiz/QuizCard";
import QuizResults from "@/components/quiz/QuizResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

interface QuizQuestion {
  question_number: number;
  question_text: string;
  question_type: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

type QuizPhase = "setup" | "quiz" | "results";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { teacherType, teacherName, teacherAvatar, subject } = location.state || {};

  const [user, setUser] = useState<any>(null);
  const [phase, setPhase] = useState<QuizPhase>("setup");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ answer: string; timeSpent: number; isCorrect: boolean }[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [showQuestionResult, setShowQuestionResult] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

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

  const handleStartQuiz = async (settings: { difficulty: string; numberOfQuestions: number }) => {
    setIsLoading(true);
    try {
      // Generate questions using AI
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: {
          teacherType,
          subject: subject || teacherName,
          difficulty: settings.difficulty,
          numberOfQuestions: settings.numberOfQuestions,
        },
      });

      if (error) throw error;
      if (!data?.questions || data.questions.length === 0) {
        throw new Error("No questions generated");
      }

      // Create quiz session in database
      const { data: sessionData, error: sessionError } = await supabase
        .from("quiz_sessions")
        .insert({
          user_id: user.id,
          teacher_type: teacherType,
          subject: subject || teacherName,
          difficulty: settings.difficulty,
          total_questions: settings.numberOfQuestions,
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      // Store questions in database
      const questionsToInsert = data.questions.map((q: QuizQuestion, index: number) => ({
        session_id: sessionData.id,
        question_number: index + 1,
        question_text: q.question_text,
        question_type: q.question_type,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
      }));

      const { error: questionsError } = await supabase
        .from("quiz_questions")
        .insert(questionsToInsert);

      if (questionsError) throw questionsError;

      setQuestions(data.questions);
      setSessionId(sessionData.id);
      setQuizStartTime(Date.now());
      setPhase("quiz");
    } catch (error: any) {
      console.error("Quiz start error:", error);
      toast({
        title: "Failed to start quiz",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (answer: string, timeSpent: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    // Update question in database
    await supabase
      .from("quiz_questions")
      .update({
        user_answer: answer,
        is_correct: isCorrect,
        time_spent_seconds: timeSpent,
        answered_at: new Date().toISOString(),
      })
      .eq("session_id", sessionId)
      .eq("question_number", currentQuestionIndex + 1);

    const newAnswer = { answer, timeSpent, isCorrect };
    setAnswers([...answers, newAnswer]);
    setShowQuestionResult(true);
  };

  const handleNextQuestion = async () => {
    setShowQuestionResult(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete
      const totalCorrect = answers.filter((a) => a.isCorrect).length + 
        (answers[currentQuestionIndex]?.isCorrect ? 0 : (questions[currentQuestionIndex].correct_answer === answers[answers.length - 1]?.answer ? 1 : 0));
      const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);

      // Update session with final results
      await supabase
        .from("quiz_sessions")
        .update({
          correct_answers: answers.filter(a => a.isCorrect).length,
          time_taken_seconds: totalTime,
          completed_at: new Date().toISOString(),
        })
        .eq("id", sessionId);

      setPhase("results");
    }
  };

  const handleRetry = () => {
    setPhase("setup");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSessionId(null);
    setShowQuestionResult(false);
  };

  const speakText = async (text: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text },
      });

      if (!error && data?.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.play().catch(console.error);
      }
    } catch (error) {
      console.error("TTS error:", error);
    }
  };

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
        {/* Back button */}
        {phase === "setup" && (
          <Button variant="ghost" onClick={() => navigate("/olympiad")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Olympiad
          </Button>
        )}

        {/* Setup phase */}
        {phase === "setup" && (
          <QuizSetup
            teacherName={teacherName}
            teacherAvatar={teacherAvatar}
            subject={subject || teacherName}
            onStart={handleStartQuiz}
            isLoading={isLoading}
          />
        )}

        {/* Quiz phase */}
        {phase === "quiz" && questions.length > 0 && (
          <div className="space-y-6">
            <QuizCard
              question={questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
              onSpeak={speakText}
              showResult={showQuestionResult}
              userAnswer={answers[currentQuestionIndex]?.answer}
            />
            
            {showQuestionResult && (
              <div className="flex justify-center">
                <Button onClick={handleNextQuestion} size="lg">
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Results phase */}
        {phase === "results" && (
          <QuizResults
            correctAnswers={answers.filter((a) => a.isCorrect).length}
            totalQuestions={questions.length}
            timeTaken={Math.floor((Date.now() - quizStartTime) / 1000)}
            teacherName={teacherName}
            onRetry={handleRetry}
            onHome={() => navigate("/olympiad")}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trophy,
  Target,
  Clock,
  Flame,
  TrendingUp,
  Award,
  Brain,
  Zap,
} from "lucide-react";
import { olympiadTeachers } from "@/data/olympiadTeachers";

interface QuizStats {
  id: string;
  teacher_type: string;
  total_quizzes: number;
  total_questions: number;
  correct_answers: number;
  total_time_seconds: number;
  best_score_percentage: number;
  current_streak: number;
  longest_streak: number;
  last_quiz_at: string;
}

interface RecentQuiz {
  id: string;
  teacher_type: string;
  subject: string;
  difficulty: string;
  total_questions: number;
  correct_answers: number;
  time_taken_seconds: number;
  completed_at: string;
}

const ProgressPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<QuizStats[]>([]);
  const [recentQuizzes, setRecentQuizzes] = useState<RecentQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    fetchProgress(user.id);
  };

  const fetchProgress = async (userId: string) => {
    try {
      // Fetch stats
      const { data: statsData, error: statsError } = await supabase
        .from("user_quiz_stats")
        .select("*")
        .eq("user_id", userId);

      if (statsError) throw statsError;
      setStats(statsData || []);

      // Fetch recent quizzes
      const { data: quizzesData, error: quizzesError } = await supabase
        .from("quiz_sessions")
        .select("*")
        .eq("user_id", userId)
        .not("completed_at", "is", null)
        .order("completed_at", { ascending: false })
        .limit(10);

      if (quizzesError) throw quizzesError;
      setRecentQuizzes(quizzesData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load progress",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTeacherInfo = (teacherType: string) => {
    return olympiadTeachers.find((t) => t.teacherType === teacherType) || {
      name: teacherType,
      subject: teacherType,
      avatar: "",
    };
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate overall stats
  const totalQuizzes = stats.reduce((sum, s) => sum + s.total_quizzes, 0);
  const totalQuestions = stats.reduce((sum, s) => sum + s.total_questions, 0);
  const totalCorrect = stats.reduce((sum, s) => sum + s.correct_answers, 0);
  const totalTime = stats.reduce((sum, s) => sum + s.total_time_seconds, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const longestStreak = Math.max(...stats.map((s) => s.longest_streak), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Progress</h1>
          <p className="text-muted-foreground">
            Track your olympiad preparation journey
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalQuizzes}</p>
                  <p className="text-xs text-muted-foreground">Quizzes Taken</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Target className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallAccuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{longestStreak}</p>
                  <p className="text-xs text-muted-foreground">Best Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatTime(totalTime)}</p>
                  <p className="text-xs text-muted-foreground">Time Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.length > 0 ? (
                <div className="space-y-4">
                  {stats.map((stat) => {
                    const teacher = getTeacherInfo(stat.teacher_type);
                    const accuracy = stat.total_questions > 0
                      ? Math.round((stat.correct_answers / stat.total_questions) * 100)
                      : 0;
                    
                    return (
                      <div key={stat.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{teacher.subject}</span>
                          <span className="text-sm text-muted-foreground">
                            {accuracy}% ({stat.total_quizzes} quizzes)
                          </span>
                        </div>
                        <Progress value={accuracy} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No quizzes taken yet. Start practicing!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {totalQuizzes >= 1 && (
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <Zap className="h-6 w-6 mx-auto mb-1 text-yellow-500" />
                    <p className="text-sm font-medium">First Quiz</p>
                  </div>
                )}
                {totalQuizzes >= 10 && (
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <Brain className="h-6 w-6 mx-auto mb-1 text-purple-500" />
                    <p className="text-sm font-medium">Quiz Enthusiast</p>
                  </div>
                )}
                {overallAccuracy >= 80 && (
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <Target className="h-6 w-6 mx-auto mb-1 text-green-500" />
                    <p className="text-sm font-medium">High Scorer</p>
                  </div>
                )}
                {longestStreak >= 5 && (
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <Flame className="h-6 w-6 mx-auto mb-1 text-orange-500" />
                    <p className="text-sm font-medium">On Fire!</p>
                  </div>
                )}
                {stats.length >= 3 && (
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <Trophy className="h-6 w-6 mx-auto mb-1 text-blue-500" />
                    <p className="text-sm font-medium">Multi-Subject</p>
                  </div>
                )}
                {totalTime >= 3600 && (
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-1 text-cyan-500" />
                    <p className="text-sm font-medium">Dedicated Learner</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Quizzes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
            <CardDescription>Your latest quiz attempts</CardDescription>
          </CardHeader>
          <CardContent>
            {recentQuizzes.length > 0 ? (
              <div className="space-y-3">
                {recentQuizzes.map((quiz) => {
                  const teacher = getTeacherInfo(quiz.teacher_type);
                  const score = Math.round((quiz.correct_answers / quiz.total_questions) * 100);
                  
                  return (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-left">
                          <p className="font-medium">{teacher.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            {quiz.total_questions} questions • {formatDate(quiz.completed_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={score >= 70 ? "default" : "secondary"}
                          className={score >= 70 ? "bg-green-500" : ""}
                        >
                          {score}%
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {quiz.difficulty}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No quizzes completed yet. Start a quiz to see your history!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;

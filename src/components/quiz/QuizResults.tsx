import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Clock, TrendingUp, RotateCcw, Home } from "lucide-react";

interface QuizResultsProps {
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  teacherName: string;
  onRetry: () => void;
  onHome: () => void;
}

const QuizResults = ({
  correctAnswers,
  totalQuestions,
  timeTaken,
  teacherName,
  onRetry,
  onHome,
}: QuizResultsProps) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: "A+", color: "text-green-500", message: "Outstanding!" };
    if (percentage >= 80) return { grade: "A", color: "text-green-500", message: "Excellent!" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-500", message: "Good job!" };
    if (percentage >= 60) return { grade: "C", color: "text-yellow-500", message: "Keep practicing!" };
    if (percentage >= 50) return { grade: "D", color: "text-orange-500", message: "Needs improvement" };
    return { grade: "F", color: "text-red-500", message: "Keep trying!" };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const { grade, color, message } = getGrade();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-primary/10">
            <Trophy className="h-12 w-12 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
        <CardDescription className="text-lg">{teacherName} Quiz Results</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Score display */}
        <div className="text-center">
          <div className={`text-6xl font-bold ${color}`}>{grade}</div>
          <p className="text-xl text-muted-foreground mt-2">{message}</p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Score</span>
            <span>{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{correctAnswers}/{totalQuestions}</div>
            <p className="text-xs text-muted-foreground">Correct Answers</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{formatTime(timeTaken)}</div>
            <p className="text-xs text-muted-foreground">Time Taken</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{Math.round(timeTaken / totalQuestions)}s</div>
            <p className="text-xs text-muted-foreground">Avg per Question</p>
          </div>
        </div>

        {/* Badges earned */}
        <div className="flex flex-wrap justify-center gap-2">
          {percentage >= 70 && (
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
              🎯 High Scorer
            </Badge>
          )}
          {timeTaken < totalQuestions * 30 && (
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
              ⚡ Speed Demon
            </Badge>
          )}
          {percentage === 100 && (
            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              🏆 Perfect Score
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={onHome} className="flex-1">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button onClick={onRetry} className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResults;

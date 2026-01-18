import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, Clock, Star, Zap, Trophy, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface MathGameProps {
  onComplete: (score: number, level: number, timeSeconds: number) => void;
}

const MathGame = ({ onComplete }: MathGameProps) => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [problem, setProblem] = useState({ num1: 0, num2: 0, operator: "+", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [streak, setStreak] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);

  const generateProblem = useCallback(() => {
    const operators = level === 1 ? ["+", "-"] : level === 2 ? ["+", "-", "×"] : ["+", "-", "×", "÷"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let num1: number, num2: number, answer: number;
    const maxNum = Math.min(10 + level * 5, 50);

    switch (operator) {
      case "+":
        num1 = Math.floor(Math.random() * maxNum) + 1;
        num2 = Math.floor(Math.random() * maxNum) + 1;
        answer = num1 + num2;
        break;
      case "-":
        num1 = Math.floor(Math.random() * maxNum) + 10;
        num2 = Math.floor(Math.random() * Math.min(num1, maxNum)) + 1;
        answer = num1 - num2;
        break;
      case "×":
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      case "÷":
        num2 = Math.floor(Math.random() * 10) + 2;
        answer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * answer;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
    }

    setProblem({ num1, num2, operator, answer });
  }, [level]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setStreak(0);
    setTotalProblems(0);
    setUserAnswer("");
    generateProblem();
  };

  const checkAnswer = () => {
    if (!userAnswer) return;
    
    setTotalProblems(prev => prev + 1);
    
    if (parseInt(userAnswer) === problem.answer) {
      const points = 10 + streak * 2 + level * 5;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      
      if (streak > 0 && streak % 5 === 4) {
        setLevel(prev => Math.min(prev + 1, 5));
        toast.success(`Level Up! Now at Level ${level + 1}`, {
          icon: "🎉"
        });
      }
    } else {
      setStreak(0);
    }
    
    setUserAnswer("");
    generateProblem();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState("finished");
          onComplete(score, level, 60);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, score, level, onComplete]);

  if (gameState === "ready") {
    return (
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4">
            <Calculator className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">Math Speed Challenge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Solve as many math problems as you can in 60 seconds! 
            Build streaks for bonus points and level up for harder challenges.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-muted">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-sm font-medium">60 Seconds</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <Zap className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-sm font-medium">Streak Bonus</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <Star className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <p className="text-sm font-medium">5 Levels</p>
            </div>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2 w-full">
            <Play className="h-5 w-5" />
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === "finished") {
    const accuracy = totalProblems > 0 ? Math.round((score / (totalProblems * 10)) * 100) : 0;
    
    return (
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white mb-4">
            <Trophy className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">Time's Up!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-6xl font-bold text-primary">{score}</div>
          <p className="text-muted-foreground">points earned</p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold">{totalProblems}</p>
              <p className="text-xs text-muted-foreground">Problems</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold">Lv.{level}</p>
              <p className="text-xs text-muted-foreground">Max Level</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>
          
          <Button onClick={startGame} size="lg" className="gap-2 w-full">
            <RotateCcw className="h-5 w-5" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="gap-1">
            <Star className="h-3 w-3" />
            Level {level}
          </Badge>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              Streak: {streak}
            </Badge>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Clock className={`h-5 w-5 ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-primary"}`} />
              {timeLeft}s
            </div>
          </div>
        </div>
        <Progress value={(timeLeft / 60) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Score</p>
          <p className="text-4xl font-bold text-primary">{score}</p>
        </div>

        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
          <p className="text-5xl font-bold mb-4">
            {problem.num1} {problem.operator} {problem.num2} = ?
          </p>
        </div>

        <div className="flex gap-3">
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Your answer"
            className="text-2xl text-center font-bold h-14"
            autoFocus
          />
          <Button onClick={checkAnswer} size="lg" className="h-14 px-8">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MathGame;
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Brain, Clock, Target } from "lucide-react";

interface QuizSetupProps {
  teacherName: string;
  teacherAvatar?: string;
  subject: string;
  onStart: (settings: { difficulty: string; numberOfQuestions: number }) => void;
  isLoading: boolean;
}

const QuizSetup = ({
  teacherName,
  teacherAvatar,
  subject,
  onStart,
  isLoading,
}: QuizSetupProps) => {
  const [difficulty, setDifficulty] = useState("medium");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const difficultyInfo = {
    easy: { label: "Easy", desc: "Basic concepts, suitable for beginners", time: "~2 min/question" },
    medium: { label: "Medium", desc: "Regional olympiad level", time: "~3 min/question" },
    hard: { label: "Hard", desc: "National/International olympiad level", time: "~5 min/question" },
  };

  const handleStart = () => {
    onStart({ difficulty, numberOfQuestions });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        {teacherAvatar && (
          <div className="flex justify-center mb-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarImage src={teacherAvatar} alt={teacherName} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {teacherName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        <CardTitle className="text-2xl">{subject} Quiz</CardTitle>
        <CardDescription>With {teacherName}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Difficulty selection */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Difficulty Level
          </Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(difficultyInfo).map(([key, info]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex flex-col">
                    <span>{info.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {difficultyInfo[difficulty as keyof typeof difficultyInfo].desc}
          </p>
        </div>

        {/* Number of questions */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Number of Questions: {numberOfQuestions}
          </Label>
          <Slider
            value={[numberOfQuestions]}
            onValueChange={(value) => setNumberOfQuestions(value[0])}
            min={3}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>3 questions</span>
            <span>10 questions</span>
          </div>
        </div>

        {/* Estimated time */}
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">Estimated Time:</span>
            <span className="text-muted-foreground">
              {numberOfQuestions * (difficulty === "easy" ? 2 : difficulty === "medium" ? 3 : 5)} - {numberOfQuestions * (difficulty === "easy" ? 3 : difficulty === "medium" ? 5 : 8)} minutes
            </span>
          </div>
        </div>

        {/* Features list */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>✓ AI-generated olympiad-style questions</p>
          <p>✓ Voice input support (say A, B, C, or D)</p>
          <p>✓ Detailed explanations after each question</p>
          <p>✓ Progress tracking and statistics</p>
        </div>

        {/* Start button */}
        <Button onClick={handleStart} disabled={isLoading} className="w-full" size="lg">
          {isLoading ? "Generating Questions..." : "Start Quiz"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizSetup;

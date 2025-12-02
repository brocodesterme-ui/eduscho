import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, Volume2, CheckCircle, XCircle, Clock } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface QuizQuestion {
  question_number: number;
  question_text: string;
  question_type: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (answer: string, timeSpent: number) => void;
  onSpeak?: (text: string) => void;
  showResult: boolean;
  userAnswer?: string;
}

const QuizCard = ({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  onSpeak,
  showResult,
  userAnswer,
}: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(userAnswer || null);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const { isListening, transcript, isSupported, toggleListening } = useSpeechRecognition({
    onResult: (text) => {
      // Match voice input to answer options
      const lowerText = text.toLowerCase().trim();
      const optionLetters = ["a", "b", "c", "d"];
      
      for (const letter of optionLetters) {
        if (lowerText.includes(letter) || lowerText.startsWith(`option ${letter}`)) {
          setSelectedAnswer(letter.toUpperCase());
          break;
        }
      }
    },
  });

  useEffect(() => {
    if (!showResult) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showResult, startTime]);

  const handleSelectAnswer = (letter: string) => {
    if (showResult) return;
    setSelectedAnswer(letter);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      onAnswer(selectedAnswer, timeSpent);
    }
  };

  const isCorrect = selectedAnswer === question.correct_answer;
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">
            Question {questionIndex + 1} of {totalQuestions}
          </Badge>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-mono">{formatTime(elapsedTime)}</span>
            </div>
            {onSpeak && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSpeak(question.question_text)}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-lg leading-relaxed">{question.question_text}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Voice input indicator */}
        {isSupported && !showResult && (
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant={isListening ? "destructive" : "outline"}
              size="sm"
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
              {isListening ? "Stop" : "Voice Answer"}
            </Button>
            {isListening && (
              <span className="text-sm text-muted-foreground animate-pulse">
                Listening... Say A, B, C, or D
              </span>
            )}
            {transcript && (
              <span className="text-sm text-muted-foreground">
                Heard: "{transcript}"
              </span>
            )}
          </div>
        )}

        {/* Answer options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = selectedAnswer === letter;
            const isCorrectOption = letter === question.correct_answer;
            
            let buttonVariant: "outline" | "default" | "destructive" | "secondary" = "outline";
            let extraClasses = "";
            
            if (showResult) {
              if (isCorrectOption) {
                buttonVariant = "default";
                extraClasses = "bg-green-500 hover:bg-green-600 border-green-500";
              } else if (isSelected && !isCorrectOption) {
                buttonVariant = "destructive";
              }
            } else if (isSelected) {
              buttonVariant = "secondary";
              extraClasses = "border-primary border-2";
            }

            return (
              <Button
                key={letter}
                variant={buttonVariant}
                className={`w-full justify-start text-left h-auto py-3 px-4 ${extraClasses}`}
                onClick={() => handleSelectAnswer(letter)}
                disabled={showResult}
              >
                <span className="font-semibold mr-3">{letter}.</span>
                <span className="flex-1">{option.replace(/^[A-D]\)\s*/, "")}</span>
                {showResult && isCorrectOption && (
                  <CheckCircle className="h-5 w-5 ml-2 text-white" />
                )}
                {showResult && isSelected && !isCorrectOption && (
                  <XCircle className="h-5 w-5 ml-2" />
                )}
              </Button>
            );
          })}
        </div>

        {/* Explanation (shown after answering) */}
        {showResult && (
          <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-500">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-500">Incorrect</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        {/* Submit button */}
        {!showResult && (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full"
          >
            Submit Answer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;

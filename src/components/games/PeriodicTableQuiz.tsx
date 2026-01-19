import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Atom, CheckCircle, XCircle, RotateCcw, Trophy, Lightbulb } from "lucide-react";

interface PeriodicTableQuizProps {
  onComplete: (score: number, level: number, timeSeconds: number) => void;
}

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
}

const elements: Element[] = [
  { symbol: "H", name: "Hydrogen", atomicNumber: 1, category: "Non-metal" },
  { symbol: "He", name: "Helium", atomicNumber: 2, category: "Noble Gas" },
  { symbol: "Li", name: "Lithium", atomicNumber: 3, category: "Alkali Metal" },
  { symbol: "Be", name: "Beryllium", atomicNumber: 4, category: "Alkaline Earth" },
  { symbol: "B", name: "Boron", atomicNumber: 5, category: "Metalloid" },
  { symbol: "C", name: "Carbon", atomicNumber: 6, category: "Non-metal" },
  { symbol: "N", name: "Nitrogen", atomicNumber: 7, category: "Non-metal" },
  { symbol: "O", name: "Oxygen", atomicNumber: 8, category: "Non-metal" },
  { symbol: "F", name: "Fluorine", atomicNumber: 9, category: "Halogen" },
  { symbol: "Ne", name: "Neon", atomicNumber: 10, category: "Noble Gas" },
  { symbol: "Na", name: "Sodium", atomicNumber: 11, category: "Alkali Metal" },
  { symbol: "Mg", name: "Magnesium", atomicNumber: 12, category: "Alkaline Earth" },
  { symbol: "Al", name: "Aluminium", atomicNumber: 13, category: "Post-transition" },
  { symbol: "Si", name: "Silicon", atomicNumber: 14, category: "Metalloid" },
  { symbol: "P", name: "Phosphorus", atomicNumber: 15, category: "Non-metal" },
  { symbol: "S", name: "Sulfur", atomicNumber: 16, category: "Non-metal" },
  { symbol: "Cl", name: "Chlorine", atomicNumber: 17, category: "Halogen" },
  { symbol: "Ar", name: "Argon", atomicNumber: 18, category: "Noble Gas" },
  { symbol: "K", name: "Potassium", atomicNumber: 19, category: "Alkali Metal" },
  { symbol: "Ca", name: "Calcium", atomicNumber: 20, category: "Alkaline Earth" },
  { symbol: "Fe", name: "Iron", atomicNumber: 26, category: "Transition Metal" },
  { symbol: "Cu", name: "Copper", atomicNumber: 29, category: "Transition Metal" },
  { symbol: "Zn", name: "Zinc", atomicNumber: 30, category: "Transition Metal" },
  { symbol: "Ag", name: "Silver", atomicNumber: 47, category: "Transition Metal" },
  { symbol: "Au", name: "Gold", atomicNumber: 79, category: "Transition Metal" },
];

type QuestionType = "symbol" | "name" | "atomicNumber";

const PeriodicTableQuiz = ({ onComplete }: PeriodicTableQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Array<{
    element: Element;
    questionType: QuestionType;
    options: string[];
    correctAnswer: string;
  }>>([]);
  const [startTime, setStartTime] = useState<number>(0);

  const totalQuestions = 10;

  const generateQuestions = () => {
    const shuffledElements = [...elements].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
    const questionTypes: QuestionType[] = ["symbol", "name", "atomicNumber"];
    
    return shuffledElements.map(element => {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      let correctAnswer: string;
      let options: string[];
      
      if (type === "symbol") {
        correctAnswer = element.name;
        const wrongAnswers = elements
          .filter(e => e.symbol !== element.symbol)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(e => e.name);
        options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
      } else if (type === "name") {
        correctAnswer = element.symbol;
        const wrongAnswers = elements
          .filter(e => e.name !== element.name)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(e => e.symbol);
        options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
      } else {
        correctAnswer = element.name;
        const wrongAnswers = elements
          .filter(e => e.atomicNumber !== element.atomicNumber)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(e => e.name);
        options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
      }
      
      return { element, questionType: type, options, correctAnswer };
    });
  };

  const startGame = () => {
    setQuestions(generateQuestions());
    setCurrentQuestion(0);
    setScore(0);
    setIsPlaying(true);
    setIsComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setStartTime(Date.now());
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endGame();
      }
    }, 1500);
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsComplete(true);
    const timeSeconds = Math.round((Date.now() - startTime) / 1000);
    onComplete(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 10 : 0), 1, timeSeconds);
  };

  const getQuestionText = () => {
    const q = questions[currentQuestion];
    if (!q) return "";
    
    if (q.questionType === "symbol") {
      return `What is the name of element with symbol "${q.element.symbol}"?`;
    } else if (q.questionType === "name") {
      return `What is the symbol for "${q.element.name}"?`;
    } else {
      return `Which element has atomic number ${q.element.atomicNumber}?`;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Non-metal": "bg-green-500/20 text-green-500",
      "Noble Gas": "bg-purple-500/20 text-purple-500",
      "Alkali Metal": "bg-red-500/20 text-red-500",
      "Alkaline Earth": "bg-orange-500/20 text-orange-500",
      "Metalloid": "bg-teal-500/20 text-teal-500",
      "Halogen": "bg-cyan-500/20 text-cyan-500",
      "Transition Metal": "bg-blue-500/20 text-blue-500",
      "Post-transition": "bg-indigo-500/20 text-indigo-500",
    };
    return colors[category] || "bg-gray-500/20 text-gray-500";
  };

  if (isComplete) {
    const percentage = (score / (totalQuestions * 10)) * 100;
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-fit mb-4">
            <Atom className="h-12 w-12 text-primary animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
              {score}/{totalQuestions * 10}
            </div>
            <p className="text-muted-foreground">
              {percentage >= 80 ? "🎉 Excellent! You're a chemistry pro!" :
               percentage >= 60 ? "👍 Good job! Keep learning!" :
               "📚 Keep practicing to improve!"}
            </p>
          </div>
          
          <div className="flex items-center gap-2 p-4 rounded-xl bg-muted/50">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <p className="text-sm text-muted-foreground">
              Tip: Try to remember elements by their position in the periodic table!
            </p>
          </div>
          
          <Button onClick={startGame} className="w-full gap-2" size="lg">
            <RotateCcw className="h-4 w-4" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-5 w-5 text-primary" />
            Periodic Table Quiz
          </CardTitle>
          {isPlaying && (
            <Badge variant="secondary" className="text-lg px-4 py-1">
              <Trophy className="h-4 w-4 mr-2" />
              {score}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isPlaying && !isComplete ? (
          <div className="text-center py-8">
            <Atom className="h-16 w-16 mx-auto text-primary/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Test Your Chemistry Knowledge</h3>
            <p className="text-muted-foreground mb-6">
              Answer {totalQuestions} questions about elements in the periodic table!
            </p>
            <Button onClick={startGame} size="lg" className="gap-2">
              <Atom className="h-4 w-4" />
              Start Quiz
            </Button>
          </div>
        ) : isPlaying && questions.length > 0 && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span>Question {currentQuestion + 1}/{totalQuestions}</span>
              <Badge className={getCategoryColor(questions[currentQuestion].element.category)}>
                {questions[currentQuestion].element.category}
              </Badge>
            </div>
            <Progress value={((currentQuestion + 1) / totalQuestions) * 100} className="h-2" />
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-primary/20 text-center">
              <h3 className="text-xl font-semibold">{getQuestionText()}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrect = option === questions[currentQuestion].correctAnswer;
                const isSelected = option === selectedAnswer;
                
                let buttonClass = "h-16 text-lg border-2 transition-all ";
                if (showResult) {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-500/20 text-green-600";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "border-red-500 bg-red-500/20 text-red-600";
                  } else {
                    buttonClass += "opacity-50";
                  }
                } else {
                  buttonClass += "hover:border-primary hover:bg-primary/10";
                }
                
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                  >
                    {showResult && isCorrect && <CheckCircle className="h-5 w-5 mr-2" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 mr-2" />}
                    {option}
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PeriodicTableQuiz;
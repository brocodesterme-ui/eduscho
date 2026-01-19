import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Keyboard, Timer, Zap, RotateCcw, CheckCircle, XCircle } from "lucide-react";

interface TypingGameProps {
  onComplete: (score: number, level: number, timeSeconds: number) => void;
}

const educationalSentences = [
  // Science
  "The mitochondria is the powerhouse of the cell.",
  "Photosynthesis converts sunlight into energy.",
  "Newton discovered the law of gravity.",
  "Water boils at one hundred degrees celsius.",
  "The Earth revolves around the Sun.",
  "DNA carries genetic information.",
  // Math
  "The sum of angles in a triangle is 180 degrees.",
  "Pi is approximately equal to 3.14159.",
  "A square has four equal sides.",
  "Zero is neither positive nor negative.",
  // History
  "India gained independence in 1947.",
  "The Mughal Empire was founded by Babur.",
  // Geography
  "Mount Everest is the tallest mountain.",
  "The Ganges is a sacred river in India.",
  "The Amazon is the largest rainforest.",
];

const TypingGame = ({ onComplete }: TypingGameProps) => {
  const [currentSentence, setCurrentSentence] = useState("");
  const [userInput, setUserInput] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    shuffleSentence();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const shuffleSentence = () => {
    const randomIndex = Math.floor(Math.random() * educationalSentences.length);
    setCurrentSentence(educationalSentences[randomIndex]);
  };

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(60);
    setCorrectChars(0);
    setTotalChars(0);
    setSentenceIndex(0);
    setUserInput("");
    setIsComplete(false);
    shuffleSentence();
    inputRef.current?.focus();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) return;
    
    const value = e.target.value;
    setUserInput(value);

    // Check if sentence is complete
    if (value === currentSentence) {
      setCorrectChars(prev => prev + currentSentence.length);
      setTotalChars(prev => prev + currentSentence.length);
      setSentenceIndex(prev => prev + 1);
      setUserInput("");
      shuffleSentence();
      
      // Calculate WPM (words per minute)
      const elapsedMinutes = (60 - timeLeft) / 60 || 1/60;
      const words = (correctChars + currentSentence.length) / 5;
      setWpm(Math.round(words / elapsedMinutes));
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsComplete(true);
    
    const elapsedMinutes = 1; // 60 seconds
    const words = correctChars / 5;
    const finalWpm = Math.round(words / elapsedMinutes);
    const finalAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    setWpm(finalWpm);
    setAccuracy(finalAccuracy);
    
    // Score based on WPM and sentences completed
    const score = sentenceIndex * 100 + finalWpm * 2;
    onComplete(score, sentenceIndex + 1, 60);
  };

  const renderSentence = () => {
    return currentSentence.split("").map((char, index) => {
      let color = "text-muted-foreground";
      if (index < userInput.length) {
        color = userInput[index] === char ? "text-green-500" : "text-red-500 bg-red-500/20";
      }
      return (
        <span key={index} className={`${color} transition-colors text-lg`}>
          {char}
        </span>
      );
    });
  };

  if (isComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-4">
            <Keyboard className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Typing Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <Zap className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-3xl font-bold text-blue-500">{wpm}</div>
              <div className="text-sm text-muted-foreground">WPM</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <div className="text-3xl font-bold text-purple-500">{sentenceIndex}</div>
              <div className="text-sm text-muted-foreground">Sentences</div>
            </div>
          </div>
          
          <Button onClick={startGame} className="w-full gap-2" size="lg">
            <RotateCcw className="h-4 w-4" />
            Try Again
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
            <Keyboard className="h-5 w-5 text-primary" />
            Typing Speed Test
          </CardTitle>
          {isPlaying && (
            <Badge variant="secondary" className="text-lg px-4 py-1">
              <Timer className="h-4 w-4 mr-2" />
              {timeLeft}s
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isPlaying && !isComplete ? (
          <div className="text-center py-8">
            <Keyboard className="h-16 w-16 mx-auto text-primary/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Test Your Typing Speed</h3>
            <p className="text-muted-foreground mb-6">
              Type educational sentences as fast and accurately as you can in 60 seconds!
            </p>
            <Button onClick={startGame} size="lg" className="gap-2">
              <Zap className="h-4 w-4" />
              Start Typing
            </Button>
          </div>
        ) : isPlaying && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span>Sentences: {sentenceIndex}</span>
              <span>WPM: {wpm}</span>
            </div>
            <Progress value={(sentenceIndex / 10) * 100} className="h-2" />
            
            <div className="p-6 rounded-xl bg-muted/50 font-mono leading-relaxed border-2 border-dashed border-border">
              {renderSentence()}
            </div>
            
            <Input
              ref={inputRef}
              value={userInput}
              onChange={handleInput}
              placeholder="Start typing..."
              className="text-lg h-14"
              autoFocus
            />
            
            <p className="text-sm text-muted-foreground text-center">
              Type the sentence above exactly as shown
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TypingGame;
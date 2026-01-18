import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Puzzle, Clock, Star, Trophy, Play, RotateCcw, Lightbulb, SkipForward } from "lucide-react";
import { toast } from "sonner";

interface WordPuzzleProps {
  onComplete: (score: number, level: number, timeSeconds: number) => void;
}

const WORD_CATEGORIES = {
  science: [
    { word: "PHOTOSYNTHESIS", hint: "Process by which plants make food using sunlight" },
    { word: "MOLECULE", hint: "Smallest unit of a chemical compound" },
    { word: "GRAVITY", hint: "Force that pulls objects toward Earth" },
    { word: "ECOSYSTEM", hint: "Community of living organisms and their environment" },
    { word: "CHROMOSOME", hint: "Thread-like structure containing genetic information" },
    { word: "NEUTRON", hint: "Subatomic particle with no charge" },
    { word: "CATALYST", hint: "Substance that speeds up a chemical reaction" },
    { word: "VELOCITY", hint: "Speed in a particular direction" },
  ],
  math: [
    { word: "ALGORITHM", hint: "Step-by-step procedure for calculations" },
    { word: "FRACTION", hint: "Part of a whole number" },
    { word: "GEOMETRY", hint: "Branch of mathematics dealing with shapes" },
    { word: "EQUATION", hint: "Mathematical statement showing two things are equal" },
    { word: "PROBABILITY", hint: "Likelihood of an event occurring" },
    { word: "DENOMINATOR", hint: "Bottom number of a fraction" },
    { word: "POLYGON", hint: "Shape with three or more straight sides" },
    { word: "QUADRATIC", hint: "Equation involving squared terms" },
  ],
  geography: [
    { word: "CONTINENT", hint: "Large landmass on Earth" },
    { word: "PENINSULA", hint: "Land surrounded by water on three sides" },
    { word: "LATITUDE", hint: "Distance north or south of the equator" },
    { word: "VOLCANO", hint: "Mountain that can erupt with lava" },
    { word: "MONSOON", hint: "Seasonal wind bringing heavy rainfall" },
    { word: "TROPICS", hint: "Region near the equator" },
    { word: "GLACIER", hint: "Large mass of slowly moving ice" },
    { word: "DELTA", hint: "Triangular area where a river meets the sea" },
  ],
};

const WordPuzzle = ({ onComplete }: WordPuzzleProps) => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready");
  const [currentWord, setCurrentWord] = useState({ word: "", hint: "", scrambled: "" });
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [time, setTime] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [category, setCategory] = useState<keyof typeof WORD_CATEGORIES>("science");

  const scrambleWord = (word: string): string => {
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    // Make sure it's actually scrambled
    if (letters.join("") === word) {
      return scrambleWord(word);
    }
    return letters.join("");
  };

  const getNextWord = () => {
    const categories = Object.keys(WORD_CATEGORIES) as (keyof typeof WORD_CATEGORIES)[];
    const catIndex = Math.floor(wordsCompleted / 3) % categories.length;
    const cat = categories[catIndex];
    setCategory(cat);
    
    const words = WORD_CATEGORIES[cat];
    const wordIndex = Math.floor(Math.random() * words.length);
    const selected = words[wordIndex];
    
    setCurrentWord({
      word: selected.word,
      hint: selected.hint,
      scrambled: scrambleWord(selected.word)
    });
    setShowHint(false);
    setUserGuess("");
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setLevel(1);
    setWordsCompleted(0);
    setTime(0);
    setHintsUsed(0);
    setStreak(0);
    getNextWord();
  };

  const checkGuess = () => {
    if (!userGuess.trim()) return;
    
    if (userGuess.toUpperCase() === currentWord.word) {
      const points = (showHint ? 5 : 15) + streak * 3;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setWordsCompleted(prev => prev + 1);
      
      toast.success(`Correct! +${points} points`, { icon: "🎉" });
      
      if ((wordsCompleted + 1) % 5 === 0 && level < 3) {
        setLevel(prev => prev + 1);
        toast.success(`Level Up! Now at Level ${level + 1}`);
      }
      
      if (wordsCompleted + 1 >= 15) {
        setGameState("finished");
        onComplete(score + points, level, time);
      } else {
        getNextWord();
      }
    } else {
      setStreak(0);
      toast.error("Try again!");
    }
  };

  const useHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  const skipWord = () => {
    setStreak(0);
    getNextWord();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkGuess();
    }
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  if (gameState === "ready") {
    return (
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white mb-4">
            <Puzzle className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">Word Scramble</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Unscramble educational words from Science, Math, and Geography! 
            Complete 15 words to finish the game.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-muted">
              <Puzzle className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-sm font-medium">15 Words</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <Lightbulb className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-sm font-medium">Hints Available</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <Star className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <p className="text-sm font-medium">Streak Bonus</p>
            </div>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500">
            <Play className="h-5 w-5" />
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === "finished") {
    return (
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white mb-4">
            <Trophy className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">Game Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-6xl font-bold text-primary">{score}</div>
          <p className="text-muted-foreground">points earned</p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold">{wordsCompleted}</p>
              <p className="text-xs text-muted-foreground">Words</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold">{hintsUsed}</p>
              <p className="text-xs text-muted-foreground">Hints Used</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold">{time}s</p>
              <p className="text-xs text-muted-foreground">Time</p>
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
          <Badge variant="secondary" className="gap-1 capitalize">
            {category}
          </Badge>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              Streak: {streak}
            </Badge>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Clock className="h-5 w-5 text-primary" />
              {time}s
            </div>
          </div>
        </div>
        <Progress value={(wordsCompleted / 15) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground text-center mt-2">
          Word {wordsCompleted + 1} of 15
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Score</p>
          <p className="text-3xl font-bold text-primary">{score}</p>
        </div>

        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <p className="text-4xl font-bold tracking-widest mb-4">
            {currentWord.scrambled.split("").map((letter, i) => (
              <span 
                key={i} 
                className="inline-block mx-0.5 p-2 bg-card rounded-lg shadow-sm"
              >
                {letter}
              </span>
            ))}
          </p>
          {showHint && (
            <p className="text-sm text-muted-foreground mt-4 italic">
              💡 {currentWord.hint}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer"
            className="text-xl text-center font-bold h-14 uppercase"
            autoFocus
          />
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={useHint} 
            disabled={showHint}
            className="flex-1 gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            Hint
          </Button>
          <Button 
            variant="outline" 
            onClick={skipWord}
            className="flex-1 gap-2"
          >
            <SkipForward className="h-4 w-4" />
            Skip
          </Button>
          <Button onClick={checkGuess} className="flex-1 gap-2">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordPuzzle;
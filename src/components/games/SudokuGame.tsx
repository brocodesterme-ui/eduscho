import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, Star, Trophy, Play, RotateCcw, Eraser, Check } from "lucide-react";
import { toast } from "sonner";

interface SudokuGameProps {
  onComplete: (score: number, level: number, timeSeconds: number) => void;
}

// Simple 4x4 Sudoku puzzles for educational purposes
const PUZZLES = {
  easy: [
    {
      puzzle: [
        [1, 0, 3, 0],
        [0, 4, 0, 2],
        [4, 0, 2, 0],
        [0, 3, 0, 1],
      ],
      solution: [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [4, 1, 2, 3],
        [2, 3, 4, 1],
      ],
    },
    {
      puzzle: [
        [0, 2, 0, 4],
        [4, 0, 2, 0],
        [0, 4, 0, 2],
        [2, 0, 4, 0],
      ],
      solution: [
        [3, 2, 1, 4],
        [4, 1, 2, 3],
        [1, 4, 3, 2],
        [2, 3, 4, 1],
      ],
    },
  ],
  medium: [
    {
      puzzle: [
        [0, 0, 3, 4],
        [0, 4, 0, 0],
        [0, 0, 2, 0],
        [2, 3, 0, 0],
      ],
      solution: [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [4, 1, 2, 3],
        [2, 3, 4, 1],
      ],
    },
  ],
  hard: [
    {
      puzzle: [
        [0, 0, 0, 4],
        [0, 4, 0, 0],
        [0, 0, 2, 0],
        [2, 0, 0, 0],
      ],
      solution: [
        [3, 2, 1, 4],
        [1, 4, 3, 2],
        [4, 3, 2, 1],
        [2, 1, 4, 3],
      ],
    },
  ],
};

const SudokuGame = ({ onComplete }: SudokuGameProps) => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready");
  const [board, setBoard] = useState<number[][]>([]);
  const [originalBoard, setOriginalBoard] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [puzzlesCompleted, setPuzzlesCompleted] = useState(0);
  const [time, setTime] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");

  const loadPuzzle = () => {
    const diff = level === 1 ? "easy" : level === 2 ? "medium" : "hard";
    setDifficulty(diff);
    const puzzleSet = PUZZLES[diff];
    const randomPuzzle = puzzleSet[Math.floor(Math.random() * puzzleSet.length)];
    
    setBoard(randomPuzzle.puzzle.map(row => [...row]));
    setOriginalBoard(randomPuzzle.puzzle.map(row => [...row]));
    setSolution(randomPuzzle.solution);
    setSelectedCell(null);
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setLevel(1);
    setPuzzlesCompleted(0);
    setTime(0);
    setMistakes(0);
    loadPuzzle();
  };

  const handleCellClick = (row: number, col: number) => {
    if (originalBoard[row][col] !== 0) return;
    setSelectedCell([row, col]);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    
    if (originalBoard[row][col] !== 0) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = num;
    setBoard(newBoard);

    // Check if correct
    if (num !== solution[row][col] && num !== 0) {
      setMistakes(prev => prev + 1);
      toast.error("Not quite right!", { duration: 1000 });
    }

    // Check if puzzle is complete
    const isComplete = newBoard.every((r, ri) => 
      r.every((c, ci) => c === solution[ri][ci])
    );

    if (isComplete) {
      const puzzleScore = Math.max(100 - mistakes * 10, 20) * level;
      setScore(prev => prev + puzzleScore);
      setPuzzlesCompleted(prev => prev + 1);
      
      toast.success(`Puzzle Complete! +${puzzleScore} points`, { icon: "🎉" });

      if (puzzlesCompleted + 1 >= 3) {
        if (level < 3) {
          setLevel(prev => prev + 1);
          setMistakes(0);
          setTimeout(() => loadPuzzle(), 1000);
        } else {
          setGameState("finished");
          onComplete(score + puzzleScore, level, time);
        }
      } else {
        setMistakes(0);
        setTimeout(() => loadPuzzle(), 1000);
      }
    }
  };

  const clearCell = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    if (originalBoard[row][col] !== 0) return;
    
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 0;
    setBoard(newBoard);
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
          <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white mb-4">
            <Target className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">Sudoku</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Fill the 4x4 grid so each row, column, and 2x2 box contains numbers 1-4. 
            Start easy and work your way up!
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-muted">
              <Target className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <p className="text-sm font-medium">4x4 Grid</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <Star className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-sm font-medium">3 Levels</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <Check className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-sm font-medium">Logic Skills</p>
            </div>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2 w-full bg-gradient-to-r from-orange-500 to-red-500">
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
          <CardTitle className="text-2xl">Master Solver!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-6xl font-bold text-primary">{score}</div>
          <p className="text-muted-foreground">points earned</p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold">{puzzlesCompleted}</p>
              <p className="text-xs text-muted-foreground">Puzzles</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold">Lv.{level}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
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
    <Card className="max-w-md mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="gap-1 capitalize">
            {difficulty}
          </Badge>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              Puzzle {puzzlesCompleted + 1}/3
            </Badge>
            <Badge variant={mistakes >= 3 ? "destructive" : "outline"}>
              Mistakes: {mistakes}
            </Badge>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Clock className="h-5 w-5 text-primary" />
              {time}s
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">Score: {score}</p>
        </div>

        {/* Sudoku Grid */}
        <div className="grid grid-cols-4 gap-1 p-4 bg-muted rounded-xl">
          {board.map((row, ri) => (
            row.map((cell, ci) => {
              const isSelected = selectedCell?.[0] === ri && selectedCell?.[1] === ci;
              const isOriginal = originalBoard[ri][ci] !== 0;
              const isWrong = cell !== 0 && cell !== solution[ri][ci];
              const borderRight = ci === 1 ? "border-r-2 border-foreground/20" : "";
              const borderBottom = ri === 1 ? "border-b-2 border-foreground/20" : "";
              
              return (
                <button
                  key={`${ri}-${ci}`}
                  onClick={() => handleCellClick(ri, ci)}
                  className={`
                    aspect-square text-2xl font-bold rounded-lg transition-all
                    ${borderRight} ${borderBottom}
                    ${isSelected ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-card"}
                    ${isOriginal ? "text-foreground" : "text-primary"}
                    ${isWrong ? "text-red-500 bg-red-500/10" : ""}
                    ${!isOriginal && !isSelected ? "hover:bg-primary/10" : ""}
                  `}
                >
                  {cell !== 0 ? cell : ""}
                </button>
              );
            })
          ))}
        </div>

        {/* Number Input */}
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4].map(num => (
            <Button
              key={num}
              variant="outline"
              size="lg"
              onClick={() => handleNumberInput(num)}
              className="text-xl font-bold h-14"
              disabled={!selectedCell}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            size="lg"
            onClick={clearCell}
            className="h-14"
            disabled={!selectedCell}
          >
            <Eraser className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Fill each row, column, and 2x2 box with numbers 1-4
        </p>
      </CardContent>
    </Card>
  );
};

export default SudokuGame;
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Star, Trophy, Play, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface MemoryGameProps {
  onComplete: (score: number, level: number, timeSeconds: number) => void;
}

interface MemoryCard {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EDUCATIONAL_PAIRS = [
  ["H₂O", "Water"],
  ["CO₂", "Carbon Dioxide"],
  ["π", "3.14159"],
  ["E=mc²", "Einstein"],
  ["DNA", "Double Helix"],
  ["NaCl", "Salt"],
  ["Fe", "Iron"],
  ["Au", "Gold"],
  ["O₂", "Oxygen"],
  ["N₂", "Nitrogen"],
  ["H₂SO₄", "Sulfuric Acid"],
  ["CaCO₃", "Limestone"],
];

const MemoryGame = ({ onComplete }: MemoryGameProps) => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready");
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  const initializeGame = () => {
    const pairCount = 4 + level * 2; // 6, 8, 10 pairs for levels 1, 2, 3
    const selectedPairs = EDUCATIONAL_PAIRS.slice(0, Math.min(pairCount, EDUCATIONAL_PAIRS.length));
    
    const gameCards: MemoryCard[] = [];
    selectedPairs.forEach((pair, index) => {
      gameCards.push(
        { id: index * 2, content: pair[0], isFlipped: false, isMatched: false },
        { id: index * 2 + 1, content: pair[1], isFlipped: false, isMatched: false }
      );
    });

    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTime(0);
  };

  const startGame = () => {
    setGameState("playing");
    setLevel(1);
    setScore(0);
    initializeGame();
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    if (cards.find(c => c.id === cardId)?.isMatched) return;
    if (flippedCards.includes(cardId)) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      // Check if they're a matching pair
      const pairIndex1 = Math.floor(first / 2);
      const pairIndex2 = Math.floor(second / 2);

      setTimeout(() => {
        if (pairIndex1 === pairIndex2) {
          // Match found!
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));
          setMatchedPairs(prev => {
            const newCount = prev + 1;
            const totalPairs = cards.length / 2;
            
            if (newCount === totalPairs) {
              // Level complete
              const levelScore = Math.max(100 - moves * 2, 10) * level;
              setScore(prev => prev + levelScore);
              
              if (level < 3) {
                toast.success(`Level ${level} Complete! Moving to Level ${level + 1}`, {
                  icon: "🎉"
                });
                setLevel(prev => prev + 1);
                setTimeout(() => initializeGame(), 1000);
              } else {
                setGameState("finished");
                onComplete(score + levelScore, level, time);
              }
            }
            return newCount;
          });
          setScore(prev => prev + 10);
        } else {
          // No match
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (level > 1) {
      initializeGame();
    }
  }, [level]);

  if (gameState === "ready") {
    return (
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4">
            <Brain className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">Memory Match</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Match scientific concepts with their meanings! 
            Find all pairs to level up. Fewer moves = higher score.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-muted">
              <Sparkles className="h-5 w-5 mx-auto mb-1 text-purple-500" />
              <p className="text-sm font-medium">Learn Science</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <Star className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-sm font-medium">3 Levels</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <Brain className="h-5 w-5 mx-auto mb-1 text-pink-500" />
              <p className="text-sm font-medium">Train Memory</p>
            </div>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500">
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
          <CardTitle className="text-2xl">Congratulations!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-6xl font-bold text-primary">{score}</div>
          <p className="text-muted-foreground">points earned</p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold">{moves}</p>
              <p className="text-xs text-muted-foreground">Total Moves</p>
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

  const gridCols = cards.length <= 12 ? "grid-cols-4" : cards.length <= 16 ? "grid-cols-4" : "grid-cols-5";

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="gap-1">
            <Star className="h-3 w-3" />
            Level {level}
          </Badge>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              Moves: {moves}
            </Badge>
            <Badge variant="outline">
              Pairs: {matchedPairs}/{cards.length / 2}
            </Badge>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Clock className="h-5 w-5 text-primary" />
              {time}s
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="text-2xl font-bold text-primary">Score: {score}</p>
        </div>

        <div className={`grid ${gridCols} gap-3`}>
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isMatched || flippedCards.length >= 2}
              className={`
                aspect-square rounded-xl text-sm font-bold transition-all duration-300 transform
                ${card.isFlipped || card.isMatched 
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white rotate-0" 
                  : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 hover:scale-105"
                }
                ${card.isMatched ? "opacity-60 scale-95" : ""}
                ${!card.isFlipped && !card.isMatched ? "hover:shadow-lg" : ""}
              `}
            >
              {(card.isFlipped || card.isMatched) && (
                <span className="text-xs md:text-sm px-1">{card.content}</span>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemoryGame;
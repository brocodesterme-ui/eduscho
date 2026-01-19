import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gamepad2, Brain, Puzzle, Calculator, Zap, Trophy, 
  Star, Clock, Play, Target, Lightbulb, Sparkles, Keyboard, Atom
} from "lucide-react";
import MathGame from "@/components/games/MathGame";
import MemoryGame from "@/components/games/MemoryGame";
import WordPuzzle from "@/components/games/WordPuzzle";
import SudokuGame from "@/components/games/SudokuGame";
import TypingGame from "@/components/games/TypingGame";
import PeriodicTableQuiz from "@/components/games/PeriodicTableQuiz";

interface GameScore {
  game_type: string;
  score: number;
  level: number;
  time_seconds: number;
  created_at: string;
}

const Games = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [scores, setScores] = useState<GameScore[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchScores();
    }
  }, [user]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
    }
  };

  const fetchScores = async () => {
    const { data } = await supabase
      .from("game_scores")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (data) {
      setScores(data as GameScore[]);
    }
  };

  const saveScore = async (gameType: string, score: number, level: number, timeSeconds: number) => {
    if (!user) return;

    await supabase.from("game_scores").insert({
      user_id: user.id,
      game_type: gameType,
      score,
      level,
      time_seconds: timeSeconds
    });

    fetchScores();
  };

  const games = [
    {
      id: "math-speed",
      title: "Math Speed Challenge",
      description: "Test your mental math skills! Solve as many problems as you can in 60 seconds.",
      icon: Calculator,
      color: "from-blue-500 to-cyan-500",
      difficulty: "Easy",
      category: "Math"
    },
    {
      id: "memory",
      title: "Memory Match",
      description: "Flip cards and find matching pairs. Train your memory while learning!",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      difficulty: "Medium",
      category: "Memory"
    },
    {
      id: "word-puzzle",
      title: "Word Scramble",
      description: "Unscramble educational words and learn vocabulary in a fun way!",
      icon: Puzzle,
      color: "from-green-500 to-emerald-500",
      difficulty: "Medium",
      category: "Language"
    },
    {
      id: "sudoku",
      title: "Sudoku",
      description: "Classic number puzzle to sharpen your logical thinking skills.",
      icon: Target,
      color: "from-orange-500 to-red-500",
      difficulty: "Hard",
      category: "Logic"
    },
    {
      id: "typing",
      title: "Typing Speed Test",
      description: "Improve your typing speed with educational sentences. Type fast and accurate!",
      icon: Keyboard,
      color: "from-indigo-500 to-violet-500",
      difficulty: "Medium",
      category: "Speed"
    },
    {
      id: "periodic-table",
      title: "Periodic Table Quiz",
      description: "Test your chemistry knowledge! Identify elements by their symbols and properties.",
      icon: Atom,
      color: "from-teal-500 to-cyan-500",
      difficulty: "Medium",
      category: "Science"
    }
  ];

  const getBestScore = (gameType: string) => {
    const gameScores = scores.filter(s => s.game_type === gameType);
    if (gameScores.length === 0) return null;
    return Math.max(...gameScores.map(s => s.score));
  };

  if (activeGame) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => setActiveGame(null)} 
            className="mb-6 gap-2"
          >
            ← Back to Games
          </Button>
          
          {activeGame === "math-speed" && (
            <MathGame onComplete={(score, level, time) => {
              saveScore("math-speed", score, level, time);
            }} />
          )}
          {activeGame === "memory" && (
            <MemoryGame onComplete={(score, level, time) => {
              saveScore("memory", score, level, time);
            }} />
          )}
          {activeGame === "word-puzzle" && (
            <WordPuzzle onComplete={(score, level, time) => {
              saveScore("word-puzzle", score, level, time);
            }} />
          )}
          {activeGame === "sudoku" && (
            <SudokuGame onComplete={(score, level, time) => {
              saveScore("sudoku", score, level, time);
            }} />
          )}
          {activeGame === "typing" && (
            <TypingGame onComplete={(score, level, time) => {
              saveScore("typing", score, level, time);
            }} />
          )}
          {activeGame === "periodic-table" && (
            <PeriodicTableQuiz onComplete={(score, level, time) => {
              saveScore("periodic-table", score, level, time);
            }} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
            <Gamepad2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Games & Puzzles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn while having fun! Challenge yourself with educational games designed to boost your brain power.
          </p>
        </div>

        <Tabs defaultValue="games" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="games" className="gap-2">
              <Gamepad2 className="h-4 w-4" />
              Games
            </TabsTrigger>
            <TabsTrigger value="scores" className="gap-2">
              <Trophy className="h-4 w-4" />
              My Scores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => {
                const bestScore = getBestScore(game.id);
                const Icon = game.icon;
                return (
                  <Card 
                    key={game.id} 
                    className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`h-2 bg-gradient-to-r ${game.color}`} />
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${game.color} text-white shadow-lg`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="secondary">{game.category}</Badge>
                          <Badge 
                            variant="outline" 
                            className={
                              game.difficulty === "Easy" ? "border-green-500 text-green-500" :
                              game.difficulty === "Medium" ? "border-yellow-500 text-yellow-500" :
                              "border-red-500 text-red-500"
                            }
                          >
                            {game.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-4">{game.title}</CardTitle>
                      <CardDescription className="text-base">{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        {bestScore !== null ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="text-muted-foreground">Best:</span>
                            <span className="font-bold text-primary">{bestScore}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="h-4 w-4" />
                            Not played yet
                          </div>
                        )}
                        <Button 
                          onClick={() => setActiveGame(game.id)}
                          className={`gap-2 bg-gradient-to-r ${game.color} hover:opacity-90 transition-opacity`}
                        >
                          <Play className="h-4 w-4" />
                          Play Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Tips Section */}
            <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Pro Tip</h3>
                  <p className="text-muted-foreground">
                    Playing educational games for just 15 minutes a day can significantly improve memory, focus, and problem-solving skills!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scores">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Recent Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                {scores.length === 0 ? (
                  <div className="text-center py-12">
                    <Gamepad2 className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground mb-4">No games played yet</p>
                    <Button onClick={() => document.querySelector('[value="games"]')?.dispatchEvent(new Event('click'))}>
                      Start Playing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {scores.map((score, index) => {
                      const game = games.find(g => g.id === score.game_type);
                      const Icon = game?.icon || Gamepad2;
                      return (
                        <div 
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${game?.color || 'from-gray-500 to-gray-600'} text-white`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{game?.title || score.game_type}</p>
                            <p className="text-sm text-muted-foreground">
                              Level {score.level} • {new Date(score.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-lg font-bold text-primary">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {score.score}
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {score.time_seconds}s
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Games;
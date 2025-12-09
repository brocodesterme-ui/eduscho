import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, Flame, Clock, Target, Crown, Sparkles, TrendingUp, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

interface LeaderboardEntry {
  user_id: string;
  email: string;
  full_name: string | null;
  total_quizzes: number;
  correct_answers: number;
  total_questions: number;
  best_score_percentage: number | null;
  longest_streak: number;
  total_time_seconds: number;
  teacher_type: string;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const subjects = [
    { value: "all", label: "All Subjects", icon: "🏆" },
    { value: "math-olympiad", label: "Mathematics", icon: "🧮" },
    { value: "physics-olympiad", label: "Physics", icon: "⚛️" },
    { value: "chemistry-olympiad", label: "Chemistry", icon: "🧪" },
    { value: "biology-olympiad", label: "Biology", icon: "🧬" },
    { value: "astronomy-olympiad", label: "Astronomy", icon: "🔭" },
    { value: "informatics-olympiad", label: "Informatics", icon: "💻" },
    { value: "economics-olympiad", label: "Economics", icon: "📊" },
    { value: "english-olympiad", label: "English", icon: "📚" },
    { value: "geography-olympiad", label: "Geography", icon: "🌍" },
    { value: "history-olympiad", label: "History", icon: "📜" },
  ];

  useEffect(() => {
    checkAuth();
    fetchLeaderboard();
  }, [selectedSubject]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
    }
  };

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("user_quiz_stats")
        .select(`
          user_id,
          total_quizzes,
          correct_answers,
          total_questions,
          best_score_percentage,
          longest_streak,
          total_time_seconds,
          teacher_type
        `)
        .order("correct_answers", { ascending: false })
        .limit(50);

      if (selectedSubject !== "all") {
        query = query.eq("teacher_type", selectedSubject);
      }

      const { data: stats, error: statsError } = await query;

      if (statsError) throw statsError;

      // Get user profiles for the leaderboard entries
      const userIds = [...new Set(stats?.map(s => s.user_id) || [])];
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .in("id", userIds);

      if (profilesError) throw profilesError;

      // Aggregate stats by user if showing all subjects
      const aggregated = selectedSubject === "all"
        ? aggregateByUser(stats || [], profiles || [])
        : (stats || []).map(s => {
            const profile = profiles?.find(p => p.id === s.user_id);
            return {
              ...s,
              email: profile?.email || "Unknown",
              full_name: profile?.full_name,
            };
          });

      // Sort by correct answers descending
      aggregated.sort((a, b) => b.correct_answers - a.correct_answers);

      setLeaderboard(aggregated.slice(0, 20));
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const aggregateByUser = (stats: any[], profiles: any[]): LeaderboardEntry[] => {
    const userMap = new Map<string, LeaderboardEntry>();

    stats.forEach(stat => {
      const existing = userMap.get(stat.user_id);
      const profile = profiles.find(p => p.id === stat.user_id);

      if (existing) {
        existing.total_quizzes += stat.total_quizzes;
        existing.correct_answers += stat.correct_answers;
        existing.total_questions += stat.total_questions;
        existing.total_time_seconds += stat.total_time_seconds;
        existing.longest_streak = Math.max(existing.longest_streak, stat.longest_streak);
        existing.best_score_percentage = Math.max(
          existing.best_score_percentage || 0,
          stat.best_score_percentage || 0
        );
      } else {
        userMap.set(stat.user_id, {
          user_id: stat.user_id,
          email: profile?.email || "Unknown",
          full_name: profile?.full_name,
          total_quizzes: stat.total_quizzes,
          correct_answers: stat.correct_answers,
          total_questions: stat.total_questions,
          best_score_percentage: stat.best_score_percentage,
          longest_streak: stat.longest_streak,
          total_time_seconds: stat.total_time_seconds,
          teacher_type: "all",
        });
      }
    });

    return Array.from(userMap.values());
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="h-7 w-7 text-yellow-500 animate-pulse" />;
    if (index === 1) return <Medal className="h-6 w-6 text-gray-400" />;
    if (index === 2) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-muted-foreground font-bold text-lg">{index + 1}</span>;
  };

  const getRankBg = (index: number) => {
    if (index === 0) return "bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-yellow-500/20 border-yellow-500/30";
    if (index === 1) return "bg-gradient-to-r from-gray-400/20 via-gray-300/10 to-gray-400/20 border-gray-400/30";
    if (index === 2) return "bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-amber-600/20 border-amber-600/30";
    return "bg-muted/30 border-transparent";
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getAccuracyColor = (correct: number, total: number) => {
    const percentage = total > 0 ? (correct / total) * 100 : 0;
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header with stats */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Leaderboard</h1>
              <p className="text-muted-foreground">Compete with students worldwide</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{leaderboard.length} Students</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setSelectedSubject}>
          <TabsList className="mb-6 flex-wrap h-auto gap-2 bg-muted/50 p-2 rounded-xl">
            {subjects.map(subject => (
              <TabsTrigger 
                key={subject.value} 
                value={subject.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <span className="mr-1.5">{subject.icon}</span>
                {subject.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedSubject}>
            {/* Top 3 Podium for larger screens */}
            {!isLoading && leaderboard.length >= 3 && (
              <div className="hidden md:flex justify-center items-end gap-4 mb-8">
                {/* Second Place */}
                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 border-4 border-gray-400 mb-2">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${leaderboard[1]?.email}`} />
                    <AvatarFallback>{leaderboard[1]?.full_name?.[0] || leaderboard[1]?.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm truncate max-w-24">{leaderboard[1]?.full_name || leaderboard[1]?.email.split("@")[0]}</p>
                  <div className="bg-gray-400 text-white px-6 py-8 rounded-t-lg mt-2 flex flex-col items-center">
                    <Medal className="h-8 w-8 mb-1" />
                    <span className="text-2xl font-bold">2</span>
                    <span className="text-sm">{leaderboard[1]?.correct_answers} pts</span>
                  </div>
                </div>
                
                {/* First Place */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-400 animate-pulse" />
                    <Avatar className="h-20 w-20 border-4 border-yellow-500 mb-2">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${leaderboard[0]?.email}`} />
                      <AvatarFallback>{leaderboard[0]?.full_name?.[0] || leaderboard[0]?.email[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="font-medium truncate max-w-28">{leaderboard[0]?.full_name || leaderboard[0]?.email.split("@")[0]}</p>
                  <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-white px-8 py-12 rounded-t-lg mt-2 flex flex-col items-center">
                    <Crown className="h-10 w-10 mb-1" />
                    <span className="text-3xl font-bold">1</span>
                    <span className="text-sm">{leaderboard[0]?.correct_answers} pts</span>
                  </div>
                </div>
                
                {/* Third Place */}
                <div className="flex flex-col items-center">
                  <Avatar className="h-14 w-14 border-4 border-amber-600 mb-2">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${leaderboard[2]?.email}`} />
                    <AvatarFallback>{leaderboard[2]?.full_name?.[0] || leaderboard[2]?.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm truncate max-w-24">{leaderboard[2]?.full_name || leaderboard[2]?.email.split("@")[0]}</p>
                  <div className="bg-amber-600 text-white px-6 py-6 rounded-t-lg mt-2 flex flex-col items-center">
                    <Award className="h-7 w-7 mb-1" />
                    <span className="text-xl font-bold">3</span>
                    <span className="text-sm">{leaderboard[2]?.correct_answers} pts</span>
                  </div>
                </div>
              </div>
            )}

            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="text-center py-16">
                    <Trophy className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground text-lg">No quiz data yet</p>
                    <p className="text-sm text-muted-foreground">Be the first to complete a quiz!</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {leaderboard.map((entry, index) => {
                      const accuracy = entry.total_questions > 0 
                        ? (entry.correct_answers / entry.total_questions) * 100 
                        : 0;
                      
                      return (
                        <div
                          key={entry.user_id + entry.teacher_type}
                          className={`flex items-center gap-4 p-4 transition-all duration-300 cursor-pointer border-l-4 ${getRankBg(index)} ${
                            entry.user_id === user?.id ? "ring-2 ring-primary ring-inset" : ""
                          } ${hoveredIndex === index ? "scale-[1.01] shadow-md" : ""}`}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <div className="w-10 flex justify-center">
                            {getRankIcon(index)}
                          </div>
                          <Avatar className={`h-12 w-12 border-2 ${index < 3 ? "border-primary/50" : "border-transparent"}`}>
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${entry.email}`}
                            />
                            <AvatarFallback>
                              {entry.full_name?.[0] || entry.email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium truncate">
                                {entry.full_name || entry.email.split("@")[0]}
                              </p>
                              {entry.user_id === user?.id && (
                                <Badge variant="secondary" className="shrink-0">You</Badge>
                              )}
                              {index === 0 && (
                                <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30 shrink-0">
                                  Champion
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className={`flex items-center gap-1 ${getAccuracyColor(entry.correct_answers, entry.total_questions)}`}>
                                <Target className="h-3 w-3" />
                                {entry.correct_answers}/{entry.total_questions}
                              </span>
                              <span className="flex items-center gap-1">
                                <Flame className="h-3 w-3 text-orange-500" />
                                {entry.longest_streak}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(entry.total_time_seconds)}
                              </span>
                            </div>
                            {/* Progress bar for accuracy */}
                            <div className="mt-2 hidden sm:block">
                              <Progress value={accuracy} className="h-1.5" />
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary">
                              {entry.best_score_percentage?.toFixed(0) || 0}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {entry.total_quizzes} quizzes
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

export default Leaderboard;

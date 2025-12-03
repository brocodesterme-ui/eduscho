import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, Flame, Clock, Target } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "math-olympiad", label: "Mathematics" },
    { value: "physics-olympiad", label: "Physics" },
    { value: "chemistry-olympiad", label: "Chemistry" },
    { value: "biology-olympiad", label: "Biology" },
    { value: "astronomy-olympiad", label: "Astronomy" },
    { value: "informatics-olympiad", label: "Informatics" },
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
    if (index === 0) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (index === 1) return <Medal className="h-6 w-6 text-gray-400" />;
    if (index === 2) return <Award className="h-6 w-6 text-amber-600" />;
    return <span className="text-muted-foreground font-bold">{index + 1}</span>;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Leaderboard</h1>
        </div>

        <Tabs defaultValue="all" onValueChange={setSelectedSubject}>
          <TabsList className="mb-6 flex-wrap h-auto gap-2">
            {subjects.map(subject => (
              <TabsTrigger key={subject.value} value={subject.value}>
                {subject.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedSubject}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
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
                  <p className="text-muted-foreground text-center py-8">
                    No quiz data yet. Be the first to complete a quiz!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={entry.user_id + entry.teacher_type}
                        className={`flex items-center gap-4 p-4 rounded-lg ${
                          index < 3 ? "bg-muted/50" : ""
                        } ${entry.user_id === user?.id ? "ring-2 ring-primary" : ""}`}
                      >
                        <div className="w-8 flex justify-center">
                          {getRankIcon(index)}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${entry.email}`}
                          />
                          <AvatarFallback>
                            {entry.full_name?.[0] || entry.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {entry.full_name || entry.email.split("@")[0]}
                            {entry.user_id === user?.id && (
                              <Badge variant="secondary" className="ml-2">You</Badge>
                            )}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {entry.correct_answers}/{entry.total_questions}
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame className="h-3 w-3" />
                              {entry.longest_streak} streak
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTime(entry.total_time_seconds)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {entry.best_score_percentage?.toFixed(0) || 0}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.total_quizzes} quizzes
                          </p>
                        </div>
                      </div>
                    ))}
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

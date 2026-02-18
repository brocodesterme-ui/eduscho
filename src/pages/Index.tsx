import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Calculator, Atom, BookOpen, GraduationCap, Trophy, Book, ArrowRight, 
  Sparkles, Play, Users, Zap, Brain, Target, Star, ChevronRight,
  MessageCircle, Award, TrendingUp, Flame, Heart, Gamepad2
} from "lucide-react";
import TeacherCard from "@/components/TeacherCard";
import Navbar from "@/components/Navbar";
import EduMascot from "@/components/EduMascot";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useConfetti } from "@/hooks/useConfetti";

const SPEECHES = [
  "Let's learn something today! 🚀",
  "You're doing amazing! ⭐",
  "Ready for a challenge? 💪",
  "Knowledge is power! 🧠",
  "Let's ace that quiz! 🎯",
];

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mascotMood, setMascotMood] = useState<"happy" | "excited" | "celebrating" | "waving" | "thinking">("happy");
  const [mascotSpeech, setMascotSpeech] = useState<string | undefined>("Hi! I'm EduBot! 🎉");
  const { fireConfetti } = useConfetti();


  useEffect(() => {
    setIsVisible(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Rotate speech bubbles
    let i = 0;
    const speechInterval = setInterval(() => {
      i = (i + 1) % SPEECHES.length;
      setMascotSpeech(SPEECHES[i]);
    }, 4000);

    return () => {
      subscription.unsubscribe();
      clearInterval(speechInterval);
    };
  }, []);

  const handleMascotClick = () => {
    setMascotMood("celebrating");
    setMascotSpeech("Woohoo! 🎉");
    fireConfetti("burst");
    setTimeout(() => {
      setMascotMood("happy");
      setMascotSpeech("Let's learn something today! 🚀");
    }, 2000);
  };

  const teachers = [
    { type: "math", name: "Math Teacher", description: "Master mathematics with step-by-step guidance", icon: Calculator, gradient: "from-blue-500 to-cyan-500" },
    { type: "science", name: "Science Teacher", description: "Explore scientific concepts through experiments", icon: Atom, gradient: "from-purple-500 to-pink-500" },
    { type: "language", name: "Language Arts", description: "Improve reading, writing and communication", icon: BookOpen, gradient: "from-orange-500 to-red-500" },
    { type: "general", name: "General Tutor", description: "Get help with any subject, anytime", icon: GraduationCap, gradient: "from-green-500 to-teal-500" },
  ];

  const stats = [
    { label: "Active Students", value: "10K+", icon: Users, color: "bg-blue-500" },
    { label: "Subjects", value: "12+", icon: Book, color: "bg-purple-500" },
    { label: "Quizzes Taken", value: "50K+", icon: Brain, color: "bg-orange-500" },
    { label: "Success Rate", value: "94%", icon: Target, color: "bg-green-500" },
  ];

  const learningPaths = [
    { icon: Book, label: "NCERT Books", path: "/ncert", color: "bg-blue-500", emoji: "📚", desc: "Classes 6–12" },
    { icon: Play, label: "Video Lessons", path: "/videos", color: "bg-red-500", emoji: "🎬", desc: "Watch & Learn" },
    { icon: Brain, label: "AI Quizzes", path: "/quiz", color: "bg-purple-500", emoji: "🧠", desc: "Test yourself" },
    { icon: Trophy, label: "Olympiad Prep", path: "/olympiad-prep", color: "bg-amber-500", emoji: "🏆", desc: "Compete & Win" },
    { icon: Gamepad2, label: "Fun Games", path: "/games", color: "bg-green-500", emoji: "🎮", desc: "Learn by playing" },
    { icon: Target, label: "Challenges", path: "/challenge", color: "bg-pink-500", emoji: "🎯", desc: "Daily streaks" },
  ];

  const handleTeacherSelect = (teacherType: string, teacherName: string) => {
    navigate("/chat", { state: { teacherType, teacherName } });
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated bg blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Floating emoji decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["📚", "⭐", "🧠", "🎯", "🏆", "✏️", "🔬", "💡"].map((emoji, i) => (
            <div
              key={i}
              className="absolute text-3xl select-none"
              style={{
                left: `${8 + i * 12}%`,
                top: `${15 + (i % 3) * 25}%`,
                animation: `float ${3 + i * 0.4}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0.5,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        <div className={`relative container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <Badge 
              variant="secondary" 
              className="mb-6 px-5 py-2 text-sm font-bold rounded-full border-2 border-primary/30 bg-primary/10 text-primary gap-2"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Education 🚀
            </Badge>

            <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight leading-none">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                EduVoice
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Learn. Play. Grow. 🌟
            </p>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
              The fun way to master every subject — with your AI tutor, games, and live streaks!
            </p>

            {/* Chunky CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                className="group text-lg px-8 py-6 rounded-2xl font-black shadow-[0_6px_0_0_hsl(var(--primary)/0.5)] hover:shadow-[0_3px_0_0_hsl(var(--primary)/0.5)] hover:translate-y-[3px] transition-all duration-150 active:translate-y-[6px] active:shadow-none"
                onClick={() => {
                  fireConfetti("side");
                  setTimeout(() => user ? navigate("/olympiad") : navigate("/auth"), 300);
                }}
              >
                {user ? "Start Learning! 🚀" : "Get Started Free! 🎉"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-2xl font-bold border-2 shadow-[0_6px_0_0_hsl(var(--border))] hover:shadow-[0_3px_0_0_hsl(var(--border))] hover:translate-y-[3px] transition-all duration-150"
                onClick={() => navigate("/videos")}
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                Watch Demo
              </Button>
            </div>

            {/* Streak / Gamification pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-orange-500/10 border-2 border-orange-500/30 px-4 py-2 rounded-full">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-bold text-orange-500">50K+ Streaks</span>
              </div>
              <div className="flex items-center gap-2 bg-red-500/10 border-2 border-red-500/30 px-4 py-2 rounded-full">
                <Heart className="h-5 w-5 text-red-500 fill-current" />
                <span className="font-bold text-red-500">94% Love It</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/10 border-2 border-yellow-500/30 px-4 py-2 rounded-full">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-bold text-yellow-500">Top Rated</span>
              </div>
            </div>
          </div>

          {/* Right: Mascot */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <EduMascot
              mood={mascotMood}
              size="xl"
              onClick={handleMascotClick}
              speechBubble={mascotSpeech}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
            />
            <p className="text-sm text-muted-foreground font-medium animate-pulse">
              Click me! 👆
            </p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-card/60 backdrop-blur-sm border-y-2 border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.color} shadow-lg mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-black text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING PATHS - Duolingo-style chunky cards */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 px-5 py-2 rounded-full mb-4">
            <span className="text-xl">🗺️</span>
            <span className="font-bold text-primary">Learning Paths</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Choose Your Adventure!</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pick any path and start leveling up your knowledge today 🎮
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {learningPaths.map((path, i) => (
            <Card
              key={i}
              className="group cursor-pointer border-2 border-border hover:border-primary/40 shadow-[0_6px_0_0_hsl(var(--border))] hover:shadow-[0_3px_0_0_hsl(var(--border))] hover:translate-y-[3px] transition-all duration-150 active:translate-y-[6px] active:shadow-none overflow-hidden"
              onClick={() => navigate(path.path)}
            >
              <CardContent className="p-6 text-center relative">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${path.color} shadow-lg mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                  <span className="text-2xl">{path.emoji}</span>
                </div>
                <h3 className="font-black text-base mb-1">{path.label}</h3>
                <p className="text-xs text-muted-foreground font-medium">{path.desc}</p>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* MASCOT CELEBRATION SECTION */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-y-2 border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <EduMascot mood="excited" size="lg" />
            <div className="text-center md:text-left max-w-md">
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                Daily Streak Challenge! 🔥
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Keep your learning streak alive every day and unlock exclusive rewards, badges, and climb the leaderboard!
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                {["🔥 Streak", "⭐ XP Points", "🏅 Badges", "🎁 Rewards"].map((tag) => (
                  <span key={tag} className="bg-card border-2 border-border px-4 py-2 rounded-full font-bold text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                className="rounded-2xl font-black px-8 py-5 text-lg shadow-[0_6px_0_0_hsl(var(--primary)/0.5)] hover:shadow-[0_3px_0_0_hsl(var(--primary)/0.5)] hover:translate-y-[3px] transition-all duration-150"
                onClick={() => {
                  fireConfetti("rain");
                  navigate("/leaderboard");
                }}
              >
                <Trophy className="mr-2 h-5 w-5" />
                View Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI TEACHERS */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border-2 border-purple-500/30 px-5 py-2 rounded-full mb-4">
            <span className="text-xl">🤖</span>
            <span className="font-bold text-purple-600 dark:text-purple-400">AI Teachers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Meet Your AI Tutors!</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            24/7 AI teachers ready to help you master any subject 🧑‍🏫
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={teacher.type}
              title={teacher.name}
              description={teacher.description}
              icon={teacher.icon}
              gradient={teacher.gradient}
              onSelect={() => handleTeacherSelect(teacher.type, teacher.name)}
              delay={index * 100}
            />
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <EduMascot mood="waving" size="md" className="mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Ready to Level Up? 🚀
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join 10,000+ students already crushing their goals with EduVoice!
          </p>
          <Button 
            size="lg" 
            className="text-xl px-12 py-7 rounded-2xl font-black shadow-[0_8px_0_0_hsl(var(--primary)/0.5)] hover:shadow-[0_4px_0_0_hsl(var(--primary)/0.5)] hover:translate-y-[4px] transition-all duration-150"
            onClick={() => {
              fireConfetti("stars");
              setTimeout(() => user ? navigate("/olympiad") : navigate("/auth"), 400);
            }}
          >
            {user ? "Continue Learning! 🎯" : "Join for Free! 🎉"}
            <Sparkles className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border/50 bg-card/30 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <EduMascot mood="happy" size="sm" />
              <div>
                <span className="text-xl font-black">EduVoice</span>
                <p className="text-xs text-muted-foreground">Learn. Play. Grow.</p>
              </div>
            </div>
            <p className="text-muted-foreground text-center font-medium">
              © 2025 EduVoice. Made with ❤️ for students everywhere.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-xl font-bold border-2">Privacy</Button>
              <Button variant="outline" size="sm" className="rounded-xl font-bold border-2">Terms</Button>
              <Button variant="outline" size="sm" className="rounded-xl font-bold border-2">Contact</Button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); }
          to   { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

export default Index;

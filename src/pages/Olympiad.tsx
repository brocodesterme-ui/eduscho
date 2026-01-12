import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import VirtualTeacher from "@/components/VirtualTeacher";
import { olympiadTeachers } from "@/data/olympiadTeachers";
import { 
  Trophy, Star, Target, Brain, TrendingUp, Zap, Medal, 
  Sparkles, Users, Clock, BookOpen, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Olympiad = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
    }
  };

  const handleStartChat = (teacher: typeof olympiadTeachers[0]) => {
    navigate("/chat", {
      state: {
        teacherType: teacher.teacherType,
        teacherName: teacher.name,
        teacherAvatar: teacher.avatar,
        systemPrompt: teacher.systemPrompt,
      },
    });
  };

  const handleStartQuiz = (teacher: typeof olympiadTeachers[0]) => {
    navigate("/quiz", {
      state: {
        teacherType: teacher.teacherType,
        teacherName: teacher.name,
        teacherAvatar: teacher.avatar,
        subject: teacher.subject,
      },
    });
  };

  const handleStartChallenge = (teacher: typeof olympiadTeachers[0]) => {
    navigate("/challenge", {
      state: {
        teacherType: teacher.teacherType,
        teacherName: teacher.name,
        teacherAvatar: teacher.avatar,
        subject: teacher.subject,
      },
    });
  };

  const categories = [
    { id: "all", label: "All Subjects" },
    { id: "math", label: "Mathematics" },
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
    { id: "biology", label: "Biology" },
    { id: "computer", label: "Informatics" },
    { id: "other", label: "Others" },
  ];

  const filteredTeachers = selectedCategory === "all" 
    ? olympiadTeachers 
    : olympiadTeachers.filter(t => 
        t.subject.toLowerCase().includes(selectedCategory) ||
        (selectedCategory === "other" && !["math", "physics", "chemistry", "biology", "computer"].some(c => t.subject.toLowerCase().includes(c)))
      );

  const features = [
    { 
      icon: Star, 
      title: "Voice Enabled", 
      description: "Teachers speak to explain concepts",
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      icon: Target, 
      title: "Olympiad Focused", 
      description: "Specialized for IMO, IPhO, IChO & more",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Brain, 
      title: "AI Quizzes", 
      description: "Practice with generated problems",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: Zap, 
      title: "Challenge Mode", 
      description: "Timed competitions",
      gradient: "from-red-500 to-orange-500"
    },
    { 
      icon: Trophy, 
      title: "Leaderboard", 
      description: "Compete with others",
      gradient: "from-amber-500 to-yellow-500"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Learning
            </Badge>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-xl">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Olympiad Prep
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Learn from expert virtual teachers specialized in Science and Math Olympiads. 
              Each teacher has voice capabilities and can interact with you in real-time.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="rounded-full shadow-lg hover:shadow-xl transition-all">
                <Link to="/progress">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  View Progress
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full">
                <Link to="/leaderboard">
                  <Medal className="mr-2 h-5 w-5" />
                  Leaderboard
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <CardContent className="p-5 text-center relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
            {[
              { icon: Users, value: "500+", label: "Active Students" },
              { icon: BookOpen, value: "12", label: "Subjects" },
              { icon: Brain, value: "10K+", label: "Questions" },
              { icon: Clock, value: "24/7", label: "Available" },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 py-4">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id 
                    ? "shadow-lg" 
                    : "hover:bg-card"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Meet Your Teachers</h2>
            <p className="text-muted-foreground">
              {filteredTeachers.length} teachers available
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher, index) => (
            <div 
              key={teacher.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <VirtualTeacher
                name={teacher.name}
                subject={teacher.subject}
                avatar={teacher.avatar}
                description={teacher.description}
                specialization={teacher.specialization}
                onStartChat={() => handleStartChat(teacher)}
                onStartQuiz={() => handleStartQuiz(teacher)}
                onStartChallenge={() => handleStartChallenge(teacher)}
              />
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No teachers found</h3>
            <p className="text-muted-foreground mb-4">
              Try selecting a different category
            </p>
            <Button onClick={() => setSelectedCategory("all")}>
              View All Teachers
            </Button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-secondary/10" />
        <div className="relative container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Excel in Olympiads?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start learning with AI-powered teachers and compete with students worldwide
          </p>
          <Button size="lg" className="rounded-full shadow-xl" onClick={() => navigate("/quiz")}>
            Start a Quiz Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Olympiad;
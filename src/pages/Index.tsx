import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Calculator, Atom, BookOpen, GraduationCap, Trophy, Book, ArrowRight, 
  Sparkles, Play, Users, Zap, Brain, Target, Star, ChevronRight,
  MessageCircle, Award, TrendingUp
} from "lucide-react";
import TeacherCard from "@/components/TeacherCard";
import Navbar from "@/components/Navbar";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const teachers = [
    {
      type: "math",
      name: "Math Teacher",
      description: "Master mathematics with step-by-step guidance and practice problems",
      icon: Calculator,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      type: "science",
      name: "Science Teacher",
      description: "Explore scientific concepts through experiments and real-world examples",
      icon: Atom,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      type: "language",
      name: "Language Arts Teacher",
      description: "Improve reading, writing, and communication skills with personalized feedback",
      icon: BookOpen,
      gradient: "from-orange-500 to-red-500",
    },
    {
      type: "general",
      name: "General Tutor",
      description: "Get help with any subject from a knowledgeable and adaptive tutor",
      icon: GraduationCap,
      gradient: "from-green-500 to-teal-500",
    },
  ];

  const stats = [
    { label: "Active Students", value: "10K+", icon: Users },
    { label: "Subjects", value: "12+", icon: Book },
    { label: "Quizzes Taken", value: "50K+", icon: Brain },
    { label: "Success Rate", value: "94%", icon: Target },
  ];

  const features = [
    { icon: Sparkles, title: "AI-Powered Learning", description: "Personalized experience with cutting-edge AI" },
    { icon: Zap, title: "Real-time Responses", description: "Instant answers to your questions" },
    { icon: MessageCircle, title: "Voice & Text Chat", description: "Learn the way that suits you best" },
    { icon: Award, title: "Track Progress", description: "Monitor your learning journey" },
  ];

  const handleTeacherSelect = (teacherType: string, teacherName: string) => {
    navigate("/chat", { state: { teacherType, teacherName } });
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <OnboardingTutorial />
      
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="/hero-video.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        {/* Floating decorative orbs */}
        <div className="absolute top-20 left-[15%] w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-32 right-[10%] w-64 h-64 bg-secondary/20 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/2 left-[60%] w-48 h-48 bg-accent/15 rounded-full blur-[80px] animate-float" />

        <div className={`relative container mx-auto px-4 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full glass-card text-sm font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
            AI-Powered Education Platform
          </div>

          {/* Main Title */}
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent glow-text bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
              EduVoice
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Transform your learning experience with AI-powered voice assistants 
            tailored to your unique educational journey
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-14">
            <Button 
              size="lg" 
              className="group text-lg px-10 py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-primary"
              onClick={() => user ? navigate("/olympiad") : navigate("/auth")}
            >
              {user ? "Start Learning" : "Get Started Free"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-7 rounded-2xl glass-card hover:bg-card/60 transition-all duration-300"
              onClick={() => navigate("/videos")}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 glass-card px-5 py-3 rounded-2xl hover:border-primary/30 transition-all duration-300 cursor-default group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="glass-card rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary mb-4 group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">Featured</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore Learning Paths</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your learning adventure with our comprehensive educational resources
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* NCERT Books Card */}
          <Card 
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer glass-card rounded-3xl"
            onClick={() => navigate("/ncert")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
            
            <CardHeader className="relative pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Book className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">NCERT Books</CardTitle>
                    <CardDescription className="text-base">Access official NCERT textbooks</CardDescription>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="flex flex-wrap gap-2 mb-6">
                {["Mathematics", "Science", "Physics", "Chemistry", "Biology"].map((subject) => (
                  <Badge key={subject} variant="secondary" className="font-medium rounded-full px-3">
                    {subject}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Button className="rounded-xl group-hover:glow-primary transition-all">
                  Browse Books <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">Classes 9-12</span>
              </div>
            </CardContent>
          </Card>

          {/* Olympiad Card */}
          <Card 
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer glass-card rounded-3xl"
            onClick={() => navigate("/olympiad")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
            
            <CardHeader className="relative pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">Olympiad Prep</CardTitle>
                    <CardDescription className="text-base">Learn from virtual AI teachers</CardDescription>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="flex flex-wrap gap-2 mb-6">
                {["IMO", "IPhO", "IChO", "IOI", "IAO", "IEO"].map((olympiad) => (
                  <Badge key={olympiad} variant="secondary" className="font-medium rounded-full px-3">
                    {olympiad}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Button className="rounded-xl group-hover:glow-primary transition-all">
                  Meet Teachers <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">Voice-enabled AI</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Play, label: "Video Lessons", path: "/videos", color: "from-red-500 to-pink-500" },
            { icon: Brain, label: "AI Quizzes", path: "/olympiad", color: "from-purple-500 to-indigo-500" },
            { icon: TrendingUp, label: "Track Progress", path: "/progress", color: "from-green-500 to-emerald-500" },
            { icon: MessageCircle, label: "Student Chat", path: "/student-chat", color: "from-blue-500 to-cyan-500" },
          ].map((action, index) => (
            <Card 
              key={index}
              className="group cursor-pointer border-0 glass-card rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              onClick={() => navigate(action.path)}
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <action.icon className="h-7 w-7 text-white" />
                </div>
                <p className="font-semibold">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* General AI Teachers */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">AI Teachers</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Your AI Tutors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant help with any subject from our AI-powered teachers available 24/7
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

      {/* CTA Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[120px] animate-float-delayed" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your Learning?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of students already learning with EduVoice's AI-powered platform
          </p>
          <Button 
            size="lg" 
            className="text-lg px-12 py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-primary"
            onClick={() => user ? navigate("/olympiad") : navigate("/auth")}
          >
            {user ? "Continue Learning" : "Start Learning for Free"}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 glass-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EduVoice</span>
            </div>
            <p className="text-muted-foreground text-center text-sm">
              © 2025 EduVoice. Powered by AI to enhance your learning experience.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">Privacy</Button>
              <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">Terms</Button>
              <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

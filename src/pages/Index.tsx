import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { 
  Calculator, Atom, BookOpen, GraduationCap, Trophy, Book, ArrowRight, 
  Sparkles, Play, Users, Zap, Brain, Target, ChevronRight,
  MessageCircle, Award, TrendingUp, Star, Mic, Volume2, Globe, Shield
} from "lucide-react";
import TeacherCard from "@/components/TeacherCard";
import Navbar from "@/components/Navbar";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Animated counter hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
};

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const students = useCounter(10000);
  const subjects = useCounter(12);
  const quizzes = useCounter(50000);
  const successRate = useCounter(94);

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

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => setActiveFeature(prev => (prev + 1) % 4), 3000);
    return () => clearInterval(timer);
  }, []);

  const teachers = [
    { type: "math", name: "Math Teacher", description: "Master mathematics with step-by-step guidance and practice problems", icon: Calculator, gradient: "from-blue-500 to-cyan-500" },
    { type: "science", name: "Science Teacher", description: "Explore scientific concepts through experiments and real-world examples", icon: Atom, gradient: "from-purple-500 to-pink-500" },
    { type: "language", name: "Language Arts", description: "Improve reading, writing, and communication skills with personalized feedback", icon: BookOpen, gradient: "from-orange-500 to-red-500" },
    { type: "general", name: "General Tutor", description: "Get help with any subject from a knowledgeable and adaptive tutor", icon: GraduationCap, gradient: "from-green-500 to-teal-500" },
  ];

  const showcaseFeatures = [
    { icon: Target, title: "AI Exam Simulator", description: "Full mock exams with timer, proctoring, negative marking & instant analytics — only on EduScho", color: "from-rose-500 to-red-600" },
    { icon: Mic, title: "Voice Conversations", description: "Talk naturally with AI teachers using voice — just like a real classroom", color: "from-violet-500 to-purple-600" },
    { icon: Brain, title: "Adaptive Quizzes", description: "AI adjusts difficulty in real-time based on your performance", color: "from-blue-500 to-cyan-500" },
    { icon: Shield, title: "Safe & Private", description: "Your data stays secure with end-to-end encryption", color: "from-amber-500 to-orange-500" },
  ];

  const handleTeacherSelect = (teacherType: string, teacherName: string) => {
    navigate("/chat", { state: { teacherType, teacherName } });
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <OnboardingTutorial />
      
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Video bg */}
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="/hero-video.mp4" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-16 left-[10%] w-96 h-96 bg-primary/25 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-24 right-[8%] w-80 h-80 bg-secondary/25 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/3 right-[30%] w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-float" />

        <div className={`relative container mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-5xl mx-auto">
            {/* Live indicator */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-muted-foreground">10,000+ students learning right now</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tighter leading-[0.9]">
              <span className="block text-foreground">Learn Smarter</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                with EduVoice
              </span>
            </h1>
            
            <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Your personal AI tutor that listens, adapts, and helps you master any subject — 
              from NCERT to Olympiad prep.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="group text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-primary"
                onClick={() => user ? navigate("/olympiad") : navigate("/auth")}
              >
                {user ? "Continue Learning" : "Start Free — No Credit Card"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 rounded-2xl glass-card hover:bg-card/60 transition-all duration-300 border-border/50"
                onClick={() => navigate("/videos")}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br ${
                      ['from-violet-400 to-purple-500', 'from-blue-400 to-cyan-500', 'from-emerald-400 to-teal-500', 'from-amber-400 to-orange-500'][i]
                    }`} />
                  ))}
                </div>
                <span>Trusted by <strong className="text-foreground">10,000+</strong> students</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
                <span className="ml-1"><strong className="text-foreground">4.9</strong>/5 rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-5 h-9 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { ref: students.ref, value: students.count, suffix: "+", label: "Active Students", icon: Users, color: "from-violet-500 to-purple-600" },
              { ref: subjects.ref, value: subjects.count, suffix: "+", label: "Subjects", icon: Book, color: "from-blue-500 to-cyan-500" },
              { ref: quizzes.ref, value: quizzes.count, suffix: "+", label: "Quizzes Taken", icon: Brain, color: "from-emerald-500 to-teal-500" },
              { ref: successRate.ref, value: successRate.count, suffix: "%", label: "Success Rate", icon: Target, color: "from-amber-500 to-orange-500" },
            ].map((stat, index) => (
              <div 
                key={index} 
                ref={stat.ref}
                className="glass-card rounded-3xl p-6 md:p-8 text-center group hover:scale-[1.03] transition-all duration-500 relative overflow-hidden"
              >
                <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <stat.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 tabular-nums">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-muted-foreground font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BENTO FEATURE GRID ═══════════════════ */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border-primary/30 text-primary">
            Why EduVoice
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Not just another <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">study app</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Built for Indian students who want to actually understand, not just memorize
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
          {/* Large card - NCERT */}
          <div 
            className="lg:col-span-2 group cursor-pointer glass-card rounded-3xl p-8 relative overflow-hidden hover:shadow-2xl transition-all duration-500"
            onClick={() => navigate("/ncert")}
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
            <div className="relative flex flex-col md:flex-row gap-6 items-start">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Book className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">NCERT Books</h3>
                  <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">Classes 9-12</Badge>
                </div>
                <p className="text-muted-foreground mb-4 text-base">Complete NCERT textbooks with AI-powered explanations. Read, learn, and get instant help on any chapter.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Mathematics", "Science", "Physics", "Chemistry", "Biology"].map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Browse Books <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Olympiad Card */}
          <div 
            className="group cursor-pointer glass-card rounded-3xl p-8 relative overflow-hidden hover:shadow-2xl transition-all duration-500"
            onClick={() => navigate("/olympiad")}
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
            <div className="relative">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-xl mb-5 inline-flex group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Olympiad Prep</h3>
              <p className="text-muted-foreground mb-4 text-sm">Train with AI teachers specialized in competitive exams</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["IMO", "IPhO", "IChO", "IOI"].map((o) => (
                  <span key={o} className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">{o}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all text-sm">
                Start Prep <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          {[
            { icon: Play, label: "Video Lessons", desc: "Visual learning", path: "/videos", color: "from-red-500 to-pink-500" },
            { icon: Brain, label: "AI Quizzes", desc: "Test yourself", path: "/olympiad", color: "from-purple-500 to-indigo-500" },
            { icon: TrendingUp, label: "Progress", desc: "Track growth", path: "/progress", color: "from-green-500 to-emerald-500" },
          ].map((action, index) => (
            <div 
              key={index}
              className="group cursor-pointer glass-card rounded-3xl p-6 relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => navigate(action.path)}
            >
              <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${action.color} rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-opacity`} />
              <div className="relative flex items-center gap-4">
                <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-base">{action.label}</p>
                  <p className="text-muted-foreground text-sm">{action.desc}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ INTERACTIVE FEATURE SHOWCASE ═══════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border-primary/30 text-primary">
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                Everything you need to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ace your exams</span>
              </h2>
              
              <div className="space-y-3">
                {showcaseFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-500 ${
                      activeFeature === index 
                        ? 'glass-card shadow-lg scale-[1.02]' 
                        : 'hover:bg-muted/30'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg flex-shrink-0 transition-all duration-300 ${activeFeature === index ? 'scale-110' : ''}`}>
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                      <p className={`text-muted-foreground text-sm transition-all duration-300 ${activeFeature === index ? 'opacity-100 max-h-20' : 'opacity-70 max-h-20'}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual showcase */}
            <div className="relative">
              <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${showcaseFeatures[activeFeature].color} opacity-[0.06] transition-all duration-700`} />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-3xl" />
                
                <div className="relative text-center space-y-6">
                  <div className={`inline-flex p-8 rounded-3xl bg-gradient-to-br ${showcaseFeatures[activeFeature].color} shadow-2xl transition-all duration-500`}>
                    {(() => {
                      const Icon = showcaseFeatures[activeFeature].icon;
                      return <Icon className="h-16 w-16 text-white" />;
                    })()}
                  </div>
                  <h3 className="text-2xl font-bold">{showcaseFeatures[activeFeature].title}</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">{showcaseFeatures[activeFeature].description}</p>
                  
                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 pt-4">
                    {showcaseFeatures.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveFeature(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeFeature === i ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 glass-card rounded-2xl px-4 py-3 shadow-xl animate-float">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Volume2 className="h-4 w-4 text-primary" />
                  <span>Voice Enabled</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-xl animate-float-delayed">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Zap className="h-4 w-4 text-accent" />
                  <span>Instant Feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ AI TEACHERS ═══════════════════ */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border-primary/30 text-primary">
            AI Teachers
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Your personal <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI tutors</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Available 24/7, infinitely patient, and always ready to explain things your way
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

      {/* ═══════════════════ SOCIAL PROOF ═══════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.03] to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Students <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">love</span> EduVoice
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Priya S.", class: "Class 12, Delhi", quote: "EduVoice helped me score 98% in Physics. The voice explanations make complex topics so easy!", rating: 5 },
              { name: "Arjun M.", class: "Class 10, Mumbai", quote: "The AI quizzes are addictive! I went from average to topping my class in just 3 months.", rating: 5 },
              { name: "Sneha R.", class: "Class 11, Bangalore", quote: "Best study companion ever. It's like having a personal teacher available 24/7.", rating: 5 },
            ].map((testimonial, index) => (
              <div key={index} className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.class}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[150px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[150px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px]" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="glass-card rounded-[2rem] p-12 md:p-16 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Ready to learn
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  without limits?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                Join 10,000+ students already transforming their grades with AI-powered learning
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 glow-primary"
                  onClick={() => user ? navigate("/olympiad") : navigate("/auth")}
                >
                  {user ? "Continue Learning" : "Get Started — It's Free"}
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mt-6">No credit card required • Free forever for students</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-border/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EduVoice</span>
            </div>
            <p className="text-muted-foreground text-center text-sm">
              © 2026 EduVoice. Empowering students with AI.
            </p>
            <div className="flex gap-2">
              <Link to="/privacy"><Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">Privacy</Button></Link>
              <Link to="/terms"><Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">Terms</Button></Link>
              <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

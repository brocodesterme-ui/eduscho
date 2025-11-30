import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calculator, Atom, BookOpen, GraduationCap } from "lucide-react";
import TeacherCard from "@/components/TeacherCard";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-education.jpg";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Auto-redirect authenticated users away from home
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
    },
    {
      type: "science",
      name: "Science Teacher",
      description: "Explore scientific concepts through experiments and real-world examples",
      icon: Atom,
    },
    {
      type: "language",
      name: "Language Arts Teacher",
      description: "Improve reading, writing, and communication skills with personalized feedback",
      icon: BookOpen,
    },
    {
      type: "general",
      name: "General Tutor",
      description: "Get help with any subject from a knowledgeable and adaptive tutor",
      icon: GraduationCap,
    },
  ];

  const handleTeacherSelect = (teacherType: string, teacherName: string) => {
    navigate("/chat", { state: { teacherType, teacherName } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroImage}
            alt="Education background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            EduVoice
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn with AI-powered voice assistants tailored to your subject
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <span className="text-primary">✓</span>
              <span>Voice & Text Chat</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <span className="text-primary">✓</span>
              <span>Real-time Responses</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <span className="text-primary">✓</span>
              <span>Personalized Learning</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Teacher</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.type}
              title={teacher.name}
              description={teacher.description}
              icon={teacher.icon}
              onSelect={() => handleTeacherSelect(teacher.type, teacher.name)}
            />
          ))}
        </div>
      </section>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 EduVoice. Powered by AI to enhance your learning experience.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

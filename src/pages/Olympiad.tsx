import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import VirtualTeacher from "@/components/VirtualTeacher";
import { olympiadTeachers } from "@/data/olympiadTeachers";
import { Trophy, Star, Target, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Olympiad = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Olympiad Preparation</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Learn from expert virtual teachers specialized in various Science and Math Olympiads. 
              Each teacher has voice capabilities and can interact with you in real-time.
            </p>
            <Button asChild variant="outline">
              <Link to="/progress">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Your Progress
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Star className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Voice Enabled</h3>
              <p className="text-sm text-muted-foreground">Teachers speak to explain concepts</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Target className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Olympiad Focused</h3>
              <p className="text-sm text-muted-foreground">Specialized for IMO, IPhO, IChO & more</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Brain className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">AI Quizzes</h3>
              <p className="text-sm text-muted-foreground">Practice with generated problems</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Track Progress</h3>
              <p className="text-sm text-muted-foreground">Monitor your improvement</p>
            </div>
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {olympiadTeachers.map((teacher) => (
              <VirtualTeacher
                key={teacher.id}
                name={teacher.name}
                subject={teacher.subject}
                avatar={teacher.avatar}
                description={teacher.description}
                specialization={teacher.specialization}
                onStartChat={() => handleStartChat(teacher)}
                onStartQuiz={() => handleStartQuiz(teacher)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Olympiad;

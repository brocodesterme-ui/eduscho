import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle, BookOpen, Brain, Trophy, Gamepad2, CalendarDays,
  ArrowRight, ArrowLeft, X, Sparkles, CheckCircle2
} from "lucide-react";

const TUTORIAL_KEY = "eduvoice-tutorial-completed";

interface TutorialStep {
  icon: React.ElementType;
  title: string;
  description: string;
  tip: string;
  gradient: string;
}

const steps: TutorialStep[] = [
  {
    icon: Sparkles,
    title: "Welcome to EduVoice! 👋",
    description: "Your AI-powered learning companion. Let's take a quick tour of all the amazing features available to you.",
    tip: "This tour takes less than a minute!",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: MessageCircle,
    title: "AI Teachers",
    description: "Chat with specialized AI teachers for Math, Science, Language Arts, and more. Ask questions via text or voice and get instant, personalized explanations.",
    tip: "Try asking your AI teacher to explain a topic step-by-step!",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Quizzes & Challenges",
    description: "Test your knowledge with AI-generated quizzes. Choose your subject, difficulty, and track your scores on the leaderboard.",
    tip: "Complete daily challenges to build your streak!",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: BookOpen,
    title: "NCERT Books & Video Lessons",
    description: "Access NCERT textbooks and curated video lessons from top educators — all organized by class and subject.",
    tip: "Bookmark chapters to pick up where you left off.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: CalendarDays,
    title: "Study Planner & Notes",
    description: "Create personalized study plans, generate AI-powered notes, and use flashcards to revise efficiently.",
    tip: "Set a daily study goal to stay consistent!",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Gamepad2,
    title: "Learning Games",
    description: "Make studying fun with educational games — Sudoku, Math challenges, Typing practice, Memory games, and more!",
    tip: "Games are a great way to take productive breaks.",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: Trophy,
    title: "You're All Set! 🎉",
    description: "You now know all the key features. Start exploring, track your progress, and climb the leaderboard. Happy learning!",
    tip: "You can revisit this tutorial from the homepage anytime.",
    gradient: "from-indigo-500 to-violet-500",
  },
];

const OnboardingTutorial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(TUTORIAL_KEY);
    if (!completed) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(TUTORIAL_KEY, "true");
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={handleRestart}
        variant="outline"
        size="sm"
        className="fixed bottom-6 right-6 z-50 gap-2 rounded-full shadow-lg border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary/10 transition-all"
      >
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">Tutorial</span>
      </Button>
    );
  }

  const step = steps[currentStep];
  const Icon = step.icon;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-lg relative overflow-hidden shadow-2xl border-0">
        {/* Gradient header */}
        <div className={`bg-gradient-to-r ${step.gradient} p-6 pb-10 text-white relative`}>
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-white/20">
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium opacity-80">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <h2 className="text-xl font-bold">{step.title}</h2>
        </div>

        <CardContent className="pt-6 pb-5 space-y-4 -mt-4 bg-card rounded-t-2xl relative">
          <p className="text-foreground/80 leading-relaxed">{step.description}</p>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">{step.tip}</p>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-6 bg-primary"
                    : i < currentStep
                    ? "w-2 bg-primary/40"
                    : "w-2 bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button onClick={handleNext} size="sm" className="gap-1">
              {isLast ? (
                <>
                  Get Started
                  <Sparkles className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTutorial;

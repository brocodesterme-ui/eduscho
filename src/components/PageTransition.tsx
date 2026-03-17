import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Play, Calculator, Atom, BookOpen, GraduationCap, Trophy, Brain,
  CalendarDays, TrendingUp, Medal, Gamepad2, MessageCircle, FileText,
  Mail, Share2, UserCircle, Target, Sparkles, Home, LogIn, Eye
} from "lucide-react";

interface PageMeta {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  emoji: string;
}

const pageMetaMap: Record<string, PageMeta> = {
  "/": {
    title: "Welcome Home",
    subtitle: "Your learning journey starts here",
    icon: Home,
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    emoji: "🏠",
  },
  "/auth": {
    title: "Step Into Your World",
    subtitle: "Sign in to unlock your potential",
    icon: LogIn,
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    emoji: "🔐",
  },
  "/chat": {
    title: "Meet Your AI Teacher",
    subtitle: "Ask anything, learn everything",
    icon: MessageCircle,
    gradient: "from-indigo-600 via-blue-500 to-cyan-400",
    emoji: "🤖",
  },
  "/lessons": {
    title: "Dive Into Lessons",
    subtitle: "Knowledge awaits you",
    icon: BookOpen,
    gradient: "from-emerald-600 via-green-500 to-lime-400",
    emoji: "📖",
  },
  "/olympiad": {
    title: "The Olympiad Arena",
    subtitle: "Where champions are made",
    icon: Trophy,
    gradient: "from-amber-600 via-yellow-500 to-orange-400",
    emoji: "🏆",
  },
  "/olympiad-prep": {
    title: "Olympiad Training Ground",
    subtitle: "Sharpen your competitive edge",
    icon: Target,
    gradient: "from-red-600 via-orange-500 to-amber-400",
    emoji: "🎯",
  },
  "/ncert": {
    title: "NCERT Library",
    subtitle: "Your textbooks, digitized and ready",
    icon: BookOpen,
    gradient: "from-teal-600 via-cyan-500 to-blue-400",
    emoji: "📚",
  },
  "/videos": {
    title: "Entering the World of Videos",
    subtitle: "Watch, learn, and master every concept",
    icon: Play,
    gradient: "from-rose-600 via-pink-500 to-fuchsia-400",
    emoji: "🎬",
  },
  "/planner": {
    title: "Your Study Command Center",
    subtitle: "Plan smart, study smarter",
    icon: CalendarDays,
    gradient: "from-sky-600 via-blue-500 to-indigo-400",
    emoji: "📅",
  },
  "/quiz": {
    title: "Quiz Challenge Awaits",
    subtitle: "Test your knowledge, push your limits",
    icon: Brain,
    gradient: "from-purple-600 via-violet-500 to-indigo-400",
    emoji: "🧠",
  },
  "/progress": {
    title: "Your Growth Story",
    subtitle: "Every step forward counts",
    icon: TrendingUp,
    gradient: "from-green-600 via-emerald-500 to-teal-400",
    emoji: "📈",
  },
  "/leaderboard": {
    title: "Hall of Champions",
    subtitle: "See where you stand among the best",
    icon: Medal,
    gradient: "from-yellow-600 via-amber-500 to-orange-400",
    emoji: "🥇",
  },
  "/challenge": {
    title: "Challenge Mode Activated",
    subtitle: "Push beyond your comfort zone",
    icon: Target,
    gradient: "from-red-600 via-rose-500 to-pink-400",
    emoji: "⚡",
  },
  "/flashcards": {
    title: "Flashcard Studio",
    subtitle: "Master concepts at lightning speed",
    icon: Sparkles,
    gradient: "from-fuchsia-600 via-pink-500 to-rose-400",
    emoji: "⚡",
  },
  "/notes": {
    title: "Your Notes Vault",
    subtitle: "AI-powered notes at your fingertips",
    icon: FileText,
    gradient: "from-slate-600 via-gray-500 to-zinc-400",
    emoji: "📝",
  },
  "/student-chat": {
    title: "Student Community",
    subtitle: "Connect, discuss, and grow together",
    icon: MessageCircle,
    gradient: "from-cyan-600 via-teal-500 to-emerald-400",
    emoji: "💬",
  },
  "/messages": {
    title: "Private Messages",
    subtitle: "Your conversations, your space",
    icon: Mail,
    gradient: "from-blue-600 via-indigo-500 to-violet-400",
    emoji: "✉️",
  },
  "/share": {
    title: "Spread the Knowledge",
    subtitle: "Share EduVoice with the world",
    icon: Share2,
    gradient: "from-pink-600 via-rose-500 to-red-400",
    emoji: "🌍",
  },
  "/profile": {
    title: "Your Profile",
    subtitle: "See how far you've come",
    icon: UserCircle,
    gradient: "from-violet-600 via-purple-500 to-indigo-400",
    emoji: "👤",
  },
  "/games": {
    title: "Game Zone Unlocked",
    subtitle: "Learn while having a blast",
    icon: Gamepad2,
    gradient: "from-orange-600 via-amber-500 to-yellow-400",
    emoji: "🎮",
  },
  "/demo": {
    title: "Live Demo",
    subtitle: "See EduVoice in action",
    icon: Eye,
    gradient: "from-indigo-600 via-blue-500 to-sky-400",
    emoji: "👁️",
  },
};

const defaultMeta: PageMeta = {
  title: "Loading...",
  subtitle: "Preparing something awesome",
  icon: Sparkles,
  gradient: "from-gray-600 via-slate-500 to-zinc-400",
  emoji: "✨",
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<"idle" | "splash" | "enter">("idle");
  const [targetMeta, setTargetMeta] = useState<PageMeta>(defaultMeta);
  const prevPath = useRef(location.pathname);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip splash on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPath.current = location.pathname;
      setDisplayChildren(children);
      return;
    }

    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname;

      // Get meta for the target page
      const basePath = "/" + location.pathname.split("/")[1];
      const meta = pageMetaMap[basePath] || defaultMeta;
      setTargetMeta(meta);

      // Show splash
      setPhase("splash");

      // After splash, swap content and animate in
      const splashTimer = setTimeout(() => {
        setDisplayChildren(children);
        window.scrollTo({ top: 0, behavior: "instant" });
        setPhase("enter");

        const enterTimer = setTimeout(() => {
          setPhase("idle");
        }, 400);

        return () => clearTimeout(enterTimer);
      }, 1400);

      return () => clearTimeout(splashTimer);
    } else {
      setDisplayChildren(children);
    }
  }, [children, location.pathname]);

  const Icon = targetMeta.icon;

  return (
    <>
      {/* Splash Screen */}
      {phase === "splash" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${targetMeta.gradient} splash-bg`} />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10 splash-particle"
                style={{
                  width: `${Math.random() * 40 + 10}px`,
                  height: `${Math.random() * 40 + 10}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${Math.random() * 1 + 0.8}s`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 splash-content">
            <div className="mb-4 splash-icon">
              <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 shadow-2xl">
                <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-4xl mb-3 splash-emoji">{targetMeta.emoji}</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 splash-title">
              {targetMeta.title}
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-sm splash-subtitle">
              {targetMeta.subtitle}
            </p>

            {/* Loading bar */}
            <div className="mt-6 w-48 h-1 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full bg-white/80 rounded-full splash-loader" />
            </div>
          </div>
        </div>
      )}

      {/* Page content */}
      <div className={phase === "enter" ? "page-enter" : phase === "splash" ? "opacity-0" : ""}>
        {displayChildren}
      </div>
    </>
  );
};

export default PageTransition;

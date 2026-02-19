import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Download, Share2, Sparkles, BookOpen, Trophy, Brain, TrendingUp, MessageCircle, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import demoPoster from "@/assets/demo-poster.jpg";

const features = [
  { icon: Mic, label: "AI Voice Teachers", desc: "Talk to Math, Science, Language & General AI tutors" },
  { icon: BookOpen, label: "NCERT Books", desc: "Access all NCERT textbooks from Class 6–12" },
  { icon: Trophy, label: "Olympiad Prep", desc: "IMO, IPhO, IChO prep with AI-powered guidance" },
  { icon: Brain, label: "AI Quizzes", desc: "Auto-generated quizzes tailored to your level" },
  { icon: TrendingUp, label: "Progress Tracking", desc: "Monitor your learning journey with analytics" },
  { icon: MessageCircle, label: "Student Chat", desc: "Connect and collaborate with fellow students" },
];

const Demo = () => {
  const navigate = useNavigate();

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "EduVoice Demo",
        text: "Check out EduVoice – the AI-powered education platform!",
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2 backdrop-blur-sm bg-card/50 border border-border/50">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            App Demo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            See{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EduVoice
            </span>{" "}
            in Action
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Watch how AI-powered learning transforms education with voice teachers, smart quizzes, and real-time progress tracking.
          </p>
        </div>
      </section>

      {/* Teaser Video */}
      <section className="container mx-auto px-4 pb-10">
        <div className="text-center mb-6">
          <Badge variant="outline" className="mb-2">⚡ 5-Second Teaser</Badge>
          <h2 className="text-2xl font-bold">Quick Teaser</h2>
        </div>
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
          <video
            className="w-full aspect-video"
            controls
            autoPlay
            muted
            loop
            poster={demoPoster}
          >
            <source src="/teaser-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Full Demo Video */}
      <section className="container mx-auto px-4 pb-10">
        <div className="text-center mb-6">
          <Badge variant="outline" className="mb-2">🎬 Full Demo</Badge>
          <h2 className="text-2xl font-bold">Full Feature Demo</h2>
        </div>
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
          <video
            className="w-full aspect-video"
            controls
            muted
            loop
            poster={demoPoster}
          >
            <source src="/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* App Screenshots Collage */}
      <section className="container mx-auto px-4 pb-10">
        <div className="text-center mb-6">
          <Badge variant="outline" className="mb-2">📸 App Preview</Badge>
          <h2 className="text-2xl font-bold">Feature Screenshots</h2>
        </div>
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50">
          <img src={demoPoster} alt="EduVoice App Screenshots" className="w-full" />
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center pb-16">
        <Button size="lg" className="rounded-full px-8" onClick={() => navigate("/auth")}>
          <Play className="mr-2 h-5 w-5" />
          Start Learning Free
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8" onClick={handleShare}>
          <Share2 className="mr-2 h-5 w-5" />
          Share App
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
          <a href="/teaser-video.mp4" download="EduVoice-Teaser.mp4">
            <Download className="mr-2 h-5 w-5" />
            Download Teaser
          </a>
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
          <a href="/demo-video.mp4" download="EduVoice-Demo.mp4">
            <Download className="mr-2 h-5 w-5" />
            Download Full Demo
          </a>
        </Button>
      </div>

      {/* Features Highlight */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Everything You Need to Excel</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            EduVoice packs all the tools students need into one seamless AI-powered platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.label}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Demo;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Share2, Copy, Mail, MessageCircle, Users, Sparkles, 
  Check, Gift, Trophy, GraduationCap, ArrowRight,
  Twitter, Facebook, Linkedin
} from "lucide-react";
import { toast } from "sonner";

const ShareApp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.origin;
  const shareMessage = "Join me on EduVoice - an AI-powered learning platform for Olympiad preparation and more! 🎓✨";

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareVia = (platform: string) => {
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
      email: `mailto:?subject=Join%20me%20on%20EduVoice!&body=${encodedMessage}%0A%0A${encodedUrl}`,
    };
    
    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  const benefits = [
    {
      icon: GraduationCap,
      title: "AI-Powered Teachers",
      description: "Learn from virtual teachers specialized in various subjects",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Trophy,
      title: "Olympiad Prep",
      description: "Prepare for IMO, IPhO, IChO, and more olympiads",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: MessageCircle,
      title: "Student Community",
      description: "Connect with fellow students and share knowledge",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Interactive Quizzes",
      description: "Test your knowledge with AI-generated questions",
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  const socialPlatforms = [
    { id: "twitter", icon: Twitter, label: "Twitter", color: "hover:bg-sky-500" },
    { id: "facebook", icon: Facebook, label: "Facebook", color: "hover:bg-blue-600" },
    { id: "linkedin", icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-700" },
    { id: "whatsapp", icon: MessageCircle, label: "WhatsApp", color: "hover:bg-green-500" },
    { id: "email", icon: Mail, label: "Email", color: "hover:bg-red-500" },
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

        <div className="relative container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Gift className="w-4 h-4 mr-2" />
            Invite Friends
          </Badge>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-xl">
              <Share2 className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Share EduVoice with Friends
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Help your friends excel in their studies by inviting them to our AI-powered learning platform
          </p>

          {/* Share Link */}
          <Card className="max-w-xl mx-auto border-0 shadow-xl mb-12">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Input
                  value={shareUrl}
                  readOnly
                  className="rounded-xl bg-muted/50 text-center font-medium"
                />
                <Button 
                  onClick={copyToClipboard}
                  className="rounded-xl px-6 shadow-md gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Social Share Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.id}
                variant="outline"
                size="lg"
                onClick={() => shareVia(platform.id)}
                className={`rounded-xl gap-2 transition-all duration-300 ${platform.color} hover:text-white hover:border-transparent`}
              >
                <platform.icon className="h-5 w-5" />
                {platform.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto max-w-5xl px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Your Friends Will Love EduVoice</h2>
          <p className="text-muted-foreground">
            Share the benefits of AI-powered learning with your study group
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <CardContent className="p-6 flex items-start gap-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${benefit.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "10K+", label: "Active Students" },
            { value: "12+", label: "Olympiad Subjects" },
            { value: "50K+", label: "Quizzes Completed" },
            { value: "94%", label: "Success Rate" },
          ].map((stat, index) => (
            <Card key={index} className="border-0 shadow-md text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-secondary/10" />
        <div className="relative container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learning is Better Together
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Invite your classmates and compete on the leaderboard!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="rounded-full shadow-xl"
              onClick={copyToClipboard}
            >
              <Copy className="mr-2 h-5 w-5" />
              Copy Invite Link
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full"
              onClick={() => navigate("/leaderboard")}
            >
              <Trophy className="mr-2 h-5 w-5" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShareApp;
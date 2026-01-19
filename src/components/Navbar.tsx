import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, LogOut, Trophy, Book, TrendingUp, Medal, GraduationCap, 
  Play, CalendarDays, Menu, BookOpen, FileText, MessageCircle, 
  Sparkles, ChevronDown, X, Gamepad2, UserCircle, Mail, Share2
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/ncert", icon: Book, label: "NCERT" },
    { path: "/videos", icon: Play, label: "Videos" },
    { path: "/games", icon: Gamepad2, label: "Games" },
    { path: "/olympiad-prep", icon: GraduationCap, label: "Olympiad" },
    { path: "/planner", icon: CalendarDays, label: "Planner" },
    { path: "/flashcards", icon: BookOpen, label: "Flashcards" },
    { path: "/notes", icon: FileText, label: "Notes" },
    { path: "/messages", icon: Mail, label: "Messages" },
    { path: "/student-chat", icon: MessageCircle, label: "Community" },
    { path: "/leaderboard", icon: Medal, label: "Leaderboard" },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            EduVoice
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Desktop Navigation */}
              <div className="hidden xl:flex items-center gap-1 bg-card/50 backdrop-blur-sm rounded-full p-1 border border-border/50">
                {navLinks.slice(0, 6).map((link) => (
                  <Link key={link.path} to={link.path}>
                    <Button 
                      variant={isActive(link.path) ? "secondary" : "ghost"} 
                      size="sm"
                      className={`rounded-full gap-1.5 transition-all duration-200 ${
                        isActive(link.path) 
                          ? "bg-primary text-primary-foreground shadow-md" 
                          : "hover:bg-card/80"
                      }`}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="hidden 2xl:inline">{link.label}</span>
                    </Button>
                  </Link>
                ))}
                
                {/* More dropdown for additional links */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-full gap-1">
                      More
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card border border-border">
                    {navLinks.slice(6).map((link) => (
                      <DropdownMenuItem 
                        key={link.path}
                        onClick={() => navigate(link.path)}
                        className={isActive(link.path) ? "bg-primary/10 text-primary" : ""}
                      >
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Navigation */}
              <Sheet>
                <SheetTrigger asChild className="xl:hidden">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-xl border-l border-border/50 p-0">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <span className="font-bold text-lg">EduVoice</span>
                          <p className="text-xs text-muted-foreground">AI Learning Platform</p>
                        </div>
                      </div>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-auto p-4">
                      <div className="space-y-1">
                        {navLinks.map((link) => (
                          <SheetClose key={link.path} asChild>
                            <Link to={link.path}>
                              <Button 
                                variant={isActive(link.path) ? "secondary" : "ghost"} 
                                className={`w-full justify-start gap-3 h-12 rounded-xl ${
                                  isActive(link.path) 
                                    ? "bg-primary text-primary-foreground" 
                                    : ""
                                }`}
                              >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                                {link.path === "/student-chat" && (
                                  <Badge variant="secondary" className="ml-auto text-xs">New</Badge>
                                )}
                              </Button>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Footer */}
                    <div className="p-4 border-t border-border/50 space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{user.email}</p>
                          <p className="text-xs text-muted-foreground">Student Account</p>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="w-full gap-2 rounded-xl" 
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative rounded-full h-10 w-10 p-0 hover:bg-card/80"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border border-border">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">My Account</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/progress")}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    My Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/messages")}>
                    <Mail className="mr-2 h-4 w-4" />
                    Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/share")}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share App
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link to="/auth">Log in</Link>
              </Button>
              <Button asChild className="rounded-full shadow-lg hover:shadow-xl transition-all">
                <Link to="/auth" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { User, LogOut, Trophy, Book, TrendingUp, Medal, GraduationCap, Play, CalendarDays, Menu, BookOpen, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          EduVoice
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/ncert">
                    <Book className="mr-1 h-4 w-4" />
                    NCERT
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/videos">
                    <Play className="mr-1 h-4 w-4" />
                    Videos
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/olympiad-prep">
                    <GraduationCap className="mr-1 h-4 w-4" />
                    Olympiad
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/planner">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    Planner
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/progress">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    Progress
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/flashcards">
                    <BookOpen className="mr-1 h-4 w-4" />
                    Flashcards
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/notes">
                    <FileText className="mr-1 h-4 w-4" />
                    Notes
                  </Link>
                </Button>
              </div>

              {/* Mobile Navigation */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-2 mt-8">
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/ncert">
                        <Book className="mr-2 h-4 w-4" />
                        NCERT Books
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/videos">
                        <Play className="mr-2 h-4 w-4" />
                        Video Lessons
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/olympiad">
                        <Trophy className="mr-2 h-4 w-4" />
                        AI Teachers
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/olympiad-prep">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Olympiad Prep
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/planner">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Study Planner
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/progress">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Progress
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/leaderboard">
                        <Medal className="mr-2 h-4 w-4" />
                        Leaderboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/flashcards">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Flashcards
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/notes">
                        <FileText className="mr-2 h-4 w-4" />
                        Notes
                      </Link>
                    </Button>
                    <Button variant="destructive" className="justify-start mt-4" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link to="/auth">Login / Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

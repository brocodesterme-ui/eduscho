import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import Lessons from "./pages/Lessons";
import Olympiad from "./pages/Olympiad";
import OlympiadPrep from "./pages/OlympiadPrep";
import NCERTBooks from "./pages/NCERTBooks";
import VideoLessons from "./pages/VideoLessons";
import StudyPlanner from "./pages/StudyPlanner";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import Leaderboard from "./pages/Leaderboard";
import Challenge from "./pages/Challenge";
import Flashcards from "./pages/Flashcards";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/olympiad" element={<Olympiad />} />
          <Route path="/olympiad-prep" element={<OlympiadPrep />} />
          <Route path="/ncert" element={<NCERTBooks />} />
          <Route path="/videos" element={<VideoLessons />} />
          <Route path="/planner" element={<StudyPlanner />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/notes" element={<Notes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

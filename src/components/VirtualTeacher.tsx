import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Volume2, MessageSquare, Brain, Zap, Sparkles } from "lucide-react";

interface VirtualTeacherProps {
  name: string;
  subject: string;
  avatar: string;
  description: string;
  specialization: string;
  onStartChat: () => void;
  onStartQuiz?: () => void;
  onStartChallenge?: () => void;
}

const VirtualTeacher = ({
  name,
  subject,
  avatar,
  description,
  specialization,
  onStartChat,
  onStartQuiz,
  onStartChallenge,
}: VirtualTeacherProps) => {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
      
      <div className="relative p-6 flex flex-col items-center text-center">
        {/* Avatar Section */}
        <div className="relative mb-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
          <Avatar className="relative h-28 w-28 border-4 border-card shadow-xl group-hover:scale-105 transition-transform duration-300">
            <AvatarImage src={avatar} alt={name} className="object-cover" />
            <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold">
              {name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-full shadow-lg animate-pulse">
            <Volume2 className="h-4 w-4 text-white" />
          </div>
        </div>
        
        {/* Info Section */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{name}</h3>
        <Badge className="mb-3 bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          {subject}
        </Badge>
        <p className="text-sm font-medium text-primary/80 mb-2">{specialization}</p>
        <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{description}</p>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2">
            <Button 
              onClick={onStartChat} 
              variant="outline"
              className="flex-1 rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Button>
            {onStartQuiz && (
              <Button 
                onClick={onStartQuiz} 
                className="flex-1 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Brain className="mr-2 h-4 w-4" />
                Quiz
              </Button>
            )}
          </div>
          {onStartChallenge && (
            <Button 
              onClick={onStartChallenge} 
              variant="secondary"
              className="w-full rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-500/20"
            >
              <Zap className="mr-2 h-4 w-4 text-amber-500" />
              Challenge Mode
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VirtualTeacher;
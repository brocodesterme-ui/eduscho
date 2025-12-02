import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Volume2, MessageSquare, Brain } from "lucide-react";

interface VirtualTeacherProps {
  name: string;
  subject: string;
  avatar: string;
  description: string;
  specialization: string;
  onStartChat: () => void;
  onStartQuiz?: () => void;
}

const VirtualTeacher = ({
  name,
  subject,
  avatar,
  description,
  specialization,
  onStartChat,
  onStartQuiz,
}: VirtualTeacherProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all group">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-full animate-pulse">
            <Volume2 className="h-3 w-3 text-white" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <Badge variant="secondary" className="mb-2">{subject}</Badge>
        <p className="text-sm text-muted-foreground mb-3">{specialization}</p>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex gap-2 w-full">
          <Button 
            onClick={onStartChat} 
            variant="outline"
            className="flex-1"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
          {onStartQuiz && (
            <Button 
              onClick={onStartQuiz} 
              className="flex-1"
            >
              <Brain className="mr-2 h-4 w-4" />
              Quiz
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VirtualTeacher;

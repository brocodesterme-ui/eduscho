import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon, ArrowRight, Sparkles } from "lucide-react";

interface TeacherCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: string;
  onSelect: () => void;
  delay?: number;
}

const TeacherCard = ({ 
  title, 
  description, 
  icon: Icon, 
  gradient = "from-primary to-primary/60",
  onSelect, 
  delay = 0 
}: TeacherCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-card to-card/80 hover:-translate-y-2"
      onClick={onSelect}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Decorative blur */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-start gap-4">
          <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            <Icon className="h-7 w-7 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-card animate-pulse" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <CardDescription className="text-base mb-6 line-clamp-2">
          {description}
        </CardDescription>
        
        <Button 
          className="w-full group/btn relative overflow-hidden"
          variant="secondary"
        >
          <span className="relative z-10 flex items-center justify-center w-full">
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </span>
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;
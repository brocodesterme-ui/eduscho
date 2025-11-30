import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface TeacherCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onSelect: () => void;
}

const TeacherCard = ({ title, description, icon: Icon, onSelect }: TeacherCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={onSelect}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          Start Learning
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, differenceInDays, isToday, isTomorrow, isPast } from "date-fns";
import { CalendarDays, Plus, Target, Clock, CheckCircle2, Circle, Trash2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { olympiadExams } from "@/data/olympiadData";

interface StudyPlan {
  id: string;
  title: string;
  target_exam: string;
  target_date: string;
  class_level: string;
  subjects: string[];
  daily_hours: number;
  created_at: string;
}

interface StudyTask {
  id: string;
  plan_id: string;
  title: string;
  subject: string;
  chapter: string | null;
  scheduled_date: string;
  duration_minutes: number;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
}

const StudyPlanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // New plan form state
  const [newPlan, setNewPlan] = useState({
    title: "",
    target_exam: "",
    target_date: new Date(),
    class_level: "10",
    subjects: [] as string[],
    daily_hours: 2,
  });

  // New task form state
  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    chapter: "",
    scheduled_date: new Date(),
    duration_minutes: 30,
  });

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Science", "English", "History"];

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPlans();
    }
  }, [user]);

  useEffect(() => {
    if (selectedPlan) {
      fetchTasks(selectedPlan.id);
    }
  }, [selectedPlan]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
    }
    setLoading(false);
  };

  const fetchPlans = async () => {
    const { data, error } = await supabase
      .from("study_plans")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast({ title: "Error", description: "Failed to fetch study plans", variant: "destructive" });
    } else {
      setPlans(data || []);
      if (data && data.length > 0 && !selectedPlan) {
        setSelectedPlan(data[0]);
      }
    }
  };

  const fetchTasks = async (planId: string) => {
    const { data, error } = await supabase
      .from("study_tasks")
      .select("*")
      .eq("plan_id", planId)
      .order("scheduled_date", { ascending: true });
    
    if (error) {
      toast({ title: "Error", description: "Failed to fetch tasks", variant: "destructive" });
    } else {
      setTasks(data || []);
    }
  };

  const createPlan = async () => {
    if (!user || !newPlan.title || !newPlan.target_exam) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const { data, error } = await supabase
      .from("study_plans")
      .insert({
        user_id: user.id,
        title: newPlan.title,
        target_exam: newPlan.target_exam,
        target_date: format(newPlan.target_date, "yyyy-MM-dd"),
        class_level: newPlan.class_level,
        subjects: newPlan.subjects,
        daily_hours: newPlan.daily_hours,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to create plan", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Study plan created!" });
      setPlans([data, ...plans]);
      setSelectedPlan(data);
      setIsCreatePlanOpen(false);
      setNewPlan({ title: "", target_exam: "", target_date: new Date(), class_level: "10", subjects: [], daily_hours: 2 });
    }
  };

  const addTask = async () => {
    if (!user || !selectedPlan || !newTask.title || !newTask.subject) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const { data, error } = await supabase
      .from("study_tasks")
      .insert({
        user_id: user.id,
        plan_id: selectedPlan.id,
        title: newTask.title,
        subject: newTask.subject,
        chapter: newTask.chapter || null,
        scheduled_date: format(newTask.scheduled_date, "yyyy-MM-dd"),
        duration_minutes: newTask.duration_minutes,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to add task", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Task added!" });
      setTasks([...tasks, data]);
      setIsAddTaskOpen(false);
      setNewTask({ title: "", subject: "", chapter: "", scheduled_date: new Date(), duration_minutes: 30 });
    }
  };

  const toggleTaskComplete = async (task: StudyTask) => {
    const { error } = await supabase
      .from("study_tasks")
      .update({ 
        completed: !task.completed, 
        completed_at: !task.completed ? new Date().toISOString() : null 
      })
      .eq("id", task.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update task", variant: "destructive" });
    } else {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    }
  };

  const deleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from("study_tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      toast({ title: "Error", description: "Failed to delete task", variant: "destructive" });
    } else {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const deletePlan = async (planId: string) => {
    const { error } = await supabase
      .from("study_plans")
      .delete()
      .eq("id", planId);

    if (error) {
      toast({ title: "Error", description: "Failed to delete plan", variant: "destructive" });
    } else {
      const remaining = plans.filter(p => p.id !== planId);
      setPlans(remaining);
      setSelectedPlan(remaining[0] || null);
      setTasks([]);
      toast({ title: "Success", description: "Plan deleted" });
    }
  };

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  const todayTasks = tasks.filter(t => isToday(new Date(t.scheduled_date)));
  const upcomingTasks = tasks.filter(t => !isPast(new Date(t.scheduled_date)) && !isToday(new Date(t.scheduled_date)));
  const completedTasks = tasks.filter(t => t.completed);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <CalendarDays className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Study Planner</h1>
                <p className="text-muted-foreground">Plan your studies and track progress</p>
              </div>
            </div>
            <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Study Plan</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Plan Title</Label>
                    <Input 
                      placeholder="e.g., IMO 2025 Preparation"
                      value={newPlan.title}
                      onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Target Exam</Label>
                    <Select value={newPlan.target_exam} onValueChange={(v) => setNewPlan({ ...newPlan, target_exam: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {olympiadExams.map((exam) => (
                          <SelectItem key={exam.id} value={exam.name}>{exam.fullName}</SelectItem>
                        ))}
                        <SelectItem value="CBSE Board">CBSE Board Exam</SelectItem>
                        <SelectItem value="JEE Main">JEE Main</SelectItem>
                        <SelectItem value="NEET">NEET</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Target Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {format(newPlan.target_date, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newPlan.target_date}
                          onSelect={(date) => date && setNewPlan({ ...newPlan, target_date: date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Class</Label>
                    <Select value={newPlan.class_level} onValueChange={(v) => setNewPlan({ ...newPlan, class_level: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["6", "7", "8", "9", "10", "11", "12"].map((c) => (
                          <SelectItem key={c} value={c}>Class {c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Daily Study Hours</Label>
                    <Select value={String(newPlan.daily_hours)} onValueChange={(v) => setNewPlan({ ...newPlan, daily_hours: parseInt(v) })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 8].map((h) => (
                          <SelectItem key={h} value={String(h)}>{h} hours</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={createPlan}>Create Plan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Plans Sidebar */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase">Your Plans</h3>
              {plans.length === 0 ? (
                <Card className="p-4 text-center text-muted-foreground">
                  <p>No plans yet. Create one to get started!</p>
                </Card>
              ) : (
                plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedPlan?.id === plan.id && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-sm">{plan.title}</CardTitle>
                          <CardDescription className="text-xs">
                            <Badge variant="outline" className="mt-1">{plan.target_exam}</Badge>
                          </CardDescription>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={(e) => { e.stopPropagation(); deletePlan(plan.id); }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Target className="h-3 w-3" />
                        {differenceInDays(new Date(plan.target_date), new Date())} days left
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {selectedPlan ? (
                <>
                  {/* Plan Overview */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{selectedPlan.title}</CardTitle>
                          <CardDescription>
                            Target: {selectedPlan.target_exam} by {format(new Date(selectedPlan.target_date), "PPP")}
                          </CardDescription>
                        </div>
                        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Task
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Study Task</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label>Task Title</Label>
                                <Input 
                                  placeholder="e.g., Complete Chapter 5 - Quadratic Equations"
                                  value={newTask.title}
                                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Subject</Label>
                                <Select value={newTask.subject} onValueChange={(v) => setNewTask({ ...newTask, subject: v })}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subject" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {subjects.map((s) => (
                                      <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Chapter (Optional)</Label>
                                <Input 
                                  placeholder="e.g., Chapter 5"
                                  value={newTask.chapter}
                                  onChange={(e) => setNewTask({ ...newTask, chapter: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Scheduled Date</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left">
                                      <CalendarDays className="mr-2 h-4 w-4" />
                                      {format(newTask.scheduled_date, "PPP")}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={newTask.scheduled_date}
                                      onSelect={(date) => date && setNewTask({ ...newTask, scheduled_date: date })}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div>
                                <Label>Duration</Label>
                                <Select value={String(newTask.duration_minutes)} onValueChange={(v) => setNewTask({ ...newTask, duration_minutes: parseInt(v) })}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {[15, 30, 45, 60, 90, 120].map((m) => (
                                      <SelectItem key={m} value={String(m)}>{m} minutes</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={addTask}>Add Task</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 rounded-lg bg-muted">
                          <p className="text-2xl font-bold text-primary">{todayTasks.length}</p>
                          <p className="text-xs text-muted-foreground">Today's Tasks</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted">
                          <p className="text-2xl font-bold text-primary">{completedTasks.length}</p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted">
                          <p className="text-2xl font-bold text-primary">{tasks.length - completedTasks.length}</p>
                          <p className="text-xs text-muted-foreground">Remaining</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Today's Tasks */}
                  {todayTasks.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Today's Tasks</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {todayTasks.map((task) => (
                          <div 
                            key={task.id} 
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border",
                              task.completed && "bg-muted/50"
                            )}
                          >
                            <Checkbox 
                              checked={task.completed}
                              onCheckedChange={() => toggleTaskComplete(task)}
                            />
                            <div className="flex-1">
                              <p className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                                {task.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">{task.subject}</Badge>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {task.duration_minutes} min
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* All Tasks */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">All Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {tasks.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No tasks yet. Add your first task!</p>
                      ) : (
                        <div className="space-y-2">
                          {tasks.map((task) => (
                            <div 
                              key={task.id} 
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border",
                                task.completed && "bg-muted/50"
                              )}
                            >
                              <Checkbox 
                                checked={task.completed}
                                onCheckedChange={() => toggleTaskComplete(task)}
                              />
                              <div className="flex-1">
                                <p className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                                  {task.title}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Badge variant="outline" className="text-xs">{task.subject}</Badge>
                                  {task.chapter && <span>{task.chapter}</span>}
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {task.duration_minutes} min
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <CalendarDays className="h-3 w-3" />
                                    {getDateLabel(task.scheduled_date)}
                                  </span>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="p-12 text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Plan Selected</h3>
                  <p className="text-muted-foreground mb-4">Create a study plan to start tracking your progress</p>
                  <Button onClick={() => setIsCreatePlanOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Plan
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;

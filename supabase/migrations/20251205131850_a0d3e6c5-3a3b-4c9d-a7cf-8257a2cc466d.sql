-- Create study_plans table for personalized study schedules
CREATE TABLE public.study_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  target_exam TEXT NOT NULL,
  target_date DATE NOT NULL,
  class_level TEXT NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  daily_hours INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create study_tasks table for individual tasks in a plan
CREATE TABLE public.study_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID NOT NULL REFERENCES public.study_plans(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  chapter TEXT,
  scheduled_date DATE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for study_plans
CREATE POLICY "Users can view their own study plans" 
ON public.study_plans FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study plans" 
ON public.study_plans FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study plans" 
ON public.study_plans FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study plans" 
ON public.study_plans FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for study_tasks
CREATE POLICY "Users can view their own study tasks" 
ON public.study_tasks FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study tasks" 
ON public.study_tasks FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study tasks" 
ON public.study_tasks FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study tasks" 
ON public.study_tasks FOR DELETE 
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_study_plans_updated_at
BEFORE UPDATE ON public.study_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
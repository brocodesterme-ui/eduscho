-- Create quiz_sessions table to track quiz attempts
CREATE TABLE public.quiz_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  teacher_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'medium',
  total_questions INTEGER NOT NULL DEFAULT 5,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  time_taken_seconds INTEGER,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_questions table to store questions and answers
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice',
  options JSONB,
  correct_answer TEXT NOT NULL,
  user_answer TEXT,
  is_correct BOOLEAN,
  explanation TEXT,
  time_spent_seconds INTEGER,
  answered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_quiz_stats table for aggregated statistics
CREATE TABLE public.user_quiz_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  teacher_type TEXT NOT NULL,
  total_quizzes INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  total_time_seconds INTEGER NOT NULL DEFAULT 0,
  best_score_percentage DECIMAL(5,2),
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_quiz_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, teacher_type)
);

-- Enable RLS
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quiz_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quiz_sessions
CREATE POLICY "Users can view their own quiz sessions"
ON public.quiz_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quiz sessions"
ON public.quiz_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz sessions"
ON public.quiz_sessions FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for quiz_questions
CREATE POLICY "Users can view their own quiz questions"
ON public.quiz_questions FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.quiz_sessions 
  WHERE quiz_sessions.id = quiz_questions.session_id 
  AND quiz_sessions.user_id = auth.uid()
));

CREATE POLICY "Users can create quiz questions for their sessions"
ON public.quiz_questions FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.quiz_sessions 
  WHERE quiz_sessions.id = quiz_questions.session_id 
  AND quiz_sessions.user_id = auth.uid()
));

CREATE POLICY "Users can update their own quiz questions"
ON public.quiz_questions FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.quiz_sessions 
  WHERE quiz_sessions.id = quiz_questions.session_id 
  AND quiz_sessions.user_id = auth.uid()
));

-- RLS Policies for user_quiz_stats
CREATE POLICY "Users can view their own stats"
ON public.user_quiz_stats FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats"
ON public.user_quiz_stats FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
ON public.user_quiz_stats FOR UPDATE
USING (auth.uid() = user_id);

-- Function to update user stats after quiz completion
CREATE OR REPLACE FUNCTION public.update_quiz_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_score_percentage DECIMAL(5,2);
  v_prev_streak INTEGER;
  v_was_good_score BOOLEAN;
BEGIN
  IF NEW.completed_at IS NOT NULL AND OLD.completed_at IS NULL THEN
    v_score_percentage := (NEW.correct_answers::DECIMAL / NULLIF(NEW.total_questions, 0)) * 100;
    v_was_good_score := v_score_percentage >= 70;
    
    INSERT INTO public.user_quiz_stats (
      user_id, teacher_type, total_quizzes, total_questions, correct_answers,
      total_time_seconds, best_score_percentage, current_streak, longest_streak, last_quiz_at
    )
    VALUES (
      NEW.user_id, NEW.teacher_type, 1, NEW.total_questions, NEW.correct_answers,
      COALESCE(NEW.time_taken_seconds, 0), v_score_percentage,
      CASE WHEN v_was_good_score THEN 1 ELSE 0 END,
      CASE WHEN v_was_good_score THEN 1 ELSE 0 END,
      NEW.completed_at
    )
    ON CONFLICT (user_id, teacher_type) DO UPDATE SET
      total_quizzes = user_quiz_stats.total_quizzes + 1,
      total_questions = user_quiz_stats.total_questions + NEW.total_questions,
      correct_answers = user_quiz_stats.correct_answers + NEW.correct_answers,
      total_time_seconds = user_quiz_stats.total_time_seconds + COALESCE(NEW.time_taken_seconds, 0),
      best_score_percentage = GREATEST(COALESCE(user_quiz_stats.best_score_percentage, 0), v_score_percentage),
      current_streak = CASE 
        WHEN v_was_good_score THEN user_quiz_stats.current_streak + 1 
        ELSE 0 
      END,
      longest_streak = GREATEST(
        user_quiz_stats.longest_streak, 
        CASE WHEN v_was_good_score THEN user_quiz_stats.current_streak + 1 ELSE user_quiz_stats.current_streak END
      ),
      last_quiz_at = NEW.completed_at,
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for updating stats
CREATE TRIGGER on_quiz_completed
AFTER UPDATE ON public.quiz_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_quiz_stats();
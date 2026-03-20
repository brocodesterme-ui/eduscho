CREATE TABLE public.exam_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  exam_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  class_level TEXT NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 30,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  wrong_answers INTEGER NOT NULL DEFAULT 0,
  unskipped INTEGER NOT NULL DEFAULT 0,
  total_marks NUMERIC NOT NULL DEFAULT 0,
  marks_obtained NUMERIC NOT NULL DEFAULT 0,
  time_limit_seconds INTEGER NOT NULL DEFAULT 3600,
  time_taken_seconds INTEGER,
  tab_switches INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own exam sessions" ON public.exam_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own exam sessions" ON public.exam_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own exam sessions" ON public.exam_sessions FOR UPDATE USING (auth.uid() = user_id);

CREATE TABLE public.exam_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  user_answer TEXT,
  is_correct BOOLEAN,
  marks NUMERIC NOT NULL DEFAULT 4,
  negative_marks NUMERIC NOT NULL DEFAULT 1,
  explanation TEXT,
  topic TEXT,
  difficulty TEXT NOT NULL DEFAULT 'medium',
  answered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their exam questions" ON public.exam_questions FOR SELECT USING (EXISTS (SELECT 1 FROM public.exam_sessions WHERE exam_sessions.id = exam_questions.session_id AND exam_sessions.user_id = auth.uid()));
CREATE POLICY "Users can create exam questions" ON public.exam_questions FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.exam_sessions WHERE exam_sessions.id = exam_questions.session_id AND exam_sessions.user_id = auth.uid()));
CREATE POLICY "Users can update exam questions" ON public.exam_questions FOR UPDATE USING (EXISTS (SELECT 1 FROM public.exam_sessions WHERE exam_sessions.id = exam_questions.session_id AND exam_sessions.user_id = auth.uid()));
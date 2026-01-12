-- Add display_name column to profiles (publicly visible)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Create a view for public profile info (only non-sensitive data)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  COALESCE(display_name, full_name, SPLIT_PART(email, '@', 1)) as display_name,
  SUBSTRING(email FROM 1 FOR 2) || '***@' || SPLIT_PART(email, '@', 2) as masked_email,
  created_at
FROM public.profiles;

-- Grant access to the view
GRANT SELECT ON public.public_profiles TO authenticated;

-- Create private_conversations table
CREATE TABLE public.private_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_1 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  participant_2 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_message_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(participant_1, participant_2)
);

-- Enable RLS
ALTER TABLE public.private_conversations ENABLE ROW LEVEL SECURITY;

-- Conversations are visible only to participants
CREATE POLICY "Users can view their own conversations" 
ON public.private_conversations 
FOR SELECT 
USING (auth.uid() = participant_1 OR auth.uid() = participant_2);

CREATE POLICY "Users can create conversations" 
ON public.private_conversations 
FOR INSERT 
WITH CHECK (auth.uid() = participant_1 OR auth.uid() = participant_2);

CREATE POLICY "Users can update their own conversations" 
ON public.private_conversations 
FOR UPDATE 
USING (auth.uid() = participant_1 OR auth.uid() = participant_2);

-- Create private_messages table
CREATE TABLE public.private_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.private_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.private_messages ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is participant in conversation
CREATE OR REPLACE FUNCTION public.is_conversation_participant(conv_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.private_conversations
    WHERE id = conv_id
      AND (participant_1 = auth.uid() OR participant_2 = auth.uid())
  )
$$;

-- Messages are visible only to conversation participants
CREATE POLICY "Users can view messages in their conversations" 
ON public.private_messages 
FOR SELECT 
USING (public.is_conversation_participant(conversation_id));

CREATE POLICY "Users can send messages in their conversations" 
ON public.private_messages 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id AND public.is_conversation_participant(conversation_id));

CREATE POLICY "Users can update their own messages" 
ON public.private_messages 
FOR UPDATE 
USING (auth.uid() = sender_id);

-- Enable realtime for private messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.private_messages;

-- Create index for faster queries
CREATE INDEX idx_private_messages_conversation ON public.private_messages(conversation_id);
CREATE INDEX idx_private_messages_created ON public.private_messages(created_at DESC);
CREATE INDEX idx_conversations_participants ON public.private_conversations(participant_1, participant_2);
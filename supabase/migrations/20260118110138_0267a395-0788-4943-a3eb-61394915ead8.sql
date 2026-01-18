-- Create friends table for friend system (not followers - mutual friendship)
CREATE TABLE public.friends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  friend_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, friend_id)
);

-- Enable RLS
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;

-- Users can view their own friend requests (sent or received)
CREATE POLICY "Users can view their friend requests"
ON public.friends
FOR SELECT
USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Users can send friend requests
CREATE POLICY "Users can send friend requests"
ON public.friends
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update friend requests they received (accept/reject) or their own (cancel)
CREATE POLICY "Users can update friend requests"
ON public.friends
FOR UPDATE
USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Users can delete their friend requests/friendships
CREATE POLICY "Users can delete friendships"
ON public.friends
FOR DELETE
USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Add bio and avatar_url to profiles for richer profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS class_level TEXT,
ADD COLUMN IF NOT EXISTS favorite_subjects TEXT[];

-- Update public_profiles view to include more info
DROP VIEW IF EXISTS public.public_profiles;
CREATE VIEW public.public_profiles AS
SELECT
  id,
  created_at,
  COALESCE(display_name, SPLIT_PART(email, '@', 1)) AS display_name,
  CONCAT(
    SUBSTRING(email FROM 1 FOR 2),
    '***@',
    SPLIT_PART(email, '@', 2)
  ) AS masked_email,
  bio,
  avatar_url,
  class_level,
  favorite_subjects
FROM public.profiles;

-- Create game scores table
CREATE TABLE public.game_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  game_type TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  level INTEGER DEFAULT 1,
  time_seconds INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on game_scores
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- Users can view all scores (for leaderboard)
CREATE POLICY "Anyone can view game scores"
ON public.game_scores
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Users can insert their own scores
CREATE POLICY "Users can insert their own scores"
ON public.game_scores
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Enable realtime for friends table
ALTER PUBLICATION supabase_realtime ADD TABLE public.friends;
-- Update RLS policy to allow all authenticated users to view all quiz stats for leaderboard
DROP POLICY IF EXISTS "Users can view their own stats" ON public.user_quiz_stats;

CREATE POLICY "Authenticated users can view all stats for leaderboard" 
ON public.user_quiz_stats 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Also allow viewing all profiles for leaderboard display
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);
-- Drop and recreate the view without SECURITY DEFINER
DROP VIEW IF EXISTS public.public_profiles;

-- Create a regular view (default is SECURITY INVOKER)
CREATE VIEW public.public_profiles 
WITH (security_invoker = true)
AS
SELECT 
  id,
  COALESCE(display_name, full_name, SPLIT_PART(email, '@', 1)) as display_name,
  SUBSTRING(email FROM 1 FOR 2) || '***@' || SPLIT_PART(email, '@', 2) as masked_email,
  created_at
FROM public.profiles;

-- Grant access to the view
GRANT SELECT ON public.public_profiles TO authenticated;
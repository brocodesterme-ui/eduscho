-- Fix security definer view by adding security_invoker = true
DROP VIEW IF EXISTS public.public_profiles;
CREATE VIEW public.public_profiles 
WITH (security_invoker = true)
AS
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
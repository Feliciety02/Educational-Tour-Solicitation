-- Create a public view that masks donor names when anonymous
CREATE VIEW public.donations_public
WITH (security_invoker=on) AS
  SELECT 
    id,
    CASE 
      WHEN is_anonymous = true THEN 'Anonymous'
      ELSE donor_name 
    END AS donor_name,
    amount,
    is_anonymous,
    message,
    created_at
  FROM public.donations;

-- Drop the existing permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view donations" ON public.donations;

-- Create a restrictive policy that denies direct SELECT access to the base table
CREATE POLICY "No direct SELECT access to donations"
  ON public.donations FOR SELECT
  USING (false);

-- Grant SELECT on the view to anon and authenticated roles
GRANT SELECT ON public.donations_public TO anon, authenticated;
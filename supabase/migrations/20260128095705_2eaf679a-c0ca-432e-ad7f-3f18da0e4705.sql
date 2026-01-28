-- Create donations table for tracking all donations
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  message TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view donations (for leaderboard and progress)
CREATE POLICY "Anyone can view donations" 
ON public.donations 
FOR SELECT 
USING (true);

-- Allow anyone to insert donations (public donation form)
CREATE POLICY "Anyone can submit donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for donations
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
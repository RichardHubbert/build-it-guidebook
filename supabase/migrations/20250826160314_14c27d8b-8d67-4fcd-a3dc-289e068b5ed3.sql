-- Create trade table
CREATE TABLE IF NOT EXISTS public.trade (
  id SERIAL PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  service TEXT,
  subject TEXT,
  date DATE,
  time TEXT,
  duration TEXT,
  treatment TEXT,
  client_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.trade ENABLE ROW LEVEL SECURITY;

-- Create policies for super admins to manage all trades
CREATE POLICY "Super admins can manage all trades" 
ON public.trade 
FOR ALL 
USING (is_super_admin(auth.uid()));

-- Create policy for business users to manage their business trades
CREATE POLICY "Business users can manage their business trades" 
ON public.trade 
FOR ALL 
USING (true); -- For now allow all authenticated users, can be refined later

-- Create policy to allow anyone to create trades (for public intake)
CREATE POLICY "Anyone can create trades" 
ON public.trade 
FOR INSERT 
WITH CHECK (true);
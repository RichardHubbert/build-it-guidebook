-- Fix security vulnerability in trade table by adding business-based access control

-- Add business_id column to link trades to businesses
ALTER TABLE public.trade ADD COLUMN business_id UUID REFERENCES public.businesses(id);

-- Drop the overly permissive policies
DROP POLICY "Business users can manage their business trades" ON public.trade;
DROP POLICY "Anyone can create trades" ON public.trade;

-- Create secure policies that restrict access based on business membership
CREATE POLICY "Business users can view their business trades" 
ON public.trade 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.business_users 
  WHERE business_users.business_id = trade.business_id 
  AND business_users.user_id = auth.uid()
));

CREATE POLICY "Business users can update their business trades" 
ON public.trade 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.business_users 
  WHERE business_users.business_id = trade.business_id 
  AND business_users.user_id = auth.uid()
));

CREATE POLICY "Business users can delete their business trades" 
ON public.trade 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.business_users 
  WHERE business_users.business_id = trade.business_id 
  AND business_users.user_id = auth.uid()
));

-- Allow anyone to create trades but require business_id
CREATE POLICY "Anyone can create trades with business_id" 
ON public.trade 
FOR INSERT 
WITH CHECK (business_id IS NOT NULL);
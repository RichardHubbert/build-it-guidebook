-- Create service_requests table
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  issue TEXT NOT NULL,
  address TEXT NOT NULL,
  urgency TEXT NOT NULL DEFAULT 'Medium' CHECK (urgency IN ('Low', 'Medium', 'High', 'Emergency')),
  status TEXT NOT NULL DEFAULT 'Voice Intake' CHECK (status IN ('Voice Intake', 'Scheduled', 'In Progress', 'Completed', 'Pending Payment')),
  scheduled_time TIMESTAMP WITH TIME ZONE,
  estimated_cost DECIMAL(10,2),
  technician_zone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  business_id UUID REFERENCES public.businesses(id),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for service requests
CREATE POLICY "Super admins can manage all service requests" 
ON public.service_requests 
FOR ALL 
USING (is_super_admin(auth.uid()));

CREATE POLICY "Business users can manage their business service requests" 
ON public.service_requests 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.business_users 
    WHERE business_users.business_id = service_requests.business_id 
    AND business_users.user_id = auth.uid()
  )
);

CREATE POLICY "Anyone can create service requests" 
ON public.service_requests 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
-- Create conversations table to store voice conversation data
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id),
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  conversation_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  session_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for conversations
CREATE POLICY "Business users can manage their business conversations" 
ON public.conversations 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.business_users 
  WHERE business_users.business_id = conversations.business_id 
  AND business_users.user_id = auth.uid()
));

CREATE POLICY "Super admins can manage all conversations" 
ON public.conversations 
FOR ALL 
USING (is_super_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_conversations_updated_at
BEFORE UPDATE ON public.conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
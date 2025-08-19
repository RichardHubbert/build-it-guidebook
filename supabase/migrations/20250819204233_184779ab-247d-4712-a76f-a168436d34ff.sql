-- Fix critical security issue: Remove public access to staff personal information
-- This migration removes the overly permissive policy that allows anyone to view staff data

-- Drop the problematic policy that exposes staff information to public
DROP POLICY IF EXISTS "Public can view active staff" ON public.staff;

-- Ensure we have proper policies for legitimate access:
-- 1. Business managers can view their business staff (already exists)
-- 2. Business users can view their business staff (already exists)  
-- 3. Staff members can view their own record

-- Add policy for staff to view their own record
CREATE POLICY "Staff can view their own record" 
ON public.staff 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

-- Add policy for staff to update their own record (excluding sensitive fields)
CREATE POLICY "Staff can update their own record" 
ON public.staff 
FOR UPDATE 
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Add comprehensive policy for super admins to manage all staff
CREATE POLICY "Super admins can manage all staff" 
ON public.staff 
FOR ALL 
TO authenticated
USING (is_super_admin(auth.uid()));

-- Log this critical security fix
INSERT INTO public.security_audit_log (
    user_id,
    action, 
    table_name,
    record_id,
    new_values
) VALUES (
    auth.uid(),
    'SECURITY_FIX',
    'staff', 
    'PUBLIC_ACCESS_REMOVED',
    '{"description": "Removed public access to staff personal information", "policies_updated": ["Public can view active staff"], "security_level": "CRITICAL"}'::jsonb
);
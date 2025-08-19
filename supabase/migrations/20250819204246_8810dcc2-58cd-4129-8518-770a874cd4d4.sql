-- Fix critical security issue: Remove public access to staff personal information
-- Only drop the problematic policy, other policies already exist

-- Drop the problematic policy that exposes staff information to public
DROP POLICY IF EXISTS "Public can view active staff" ON public.staff;

-- Log this critical security fix
DO $$
BEGIN
    -- Only insert audit log if the user is authenticated
    IF auth.uid() IS NOT NULL THEN
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
            '{"description": "Removed public access to staff personal information", "policy_removed": "Public can view active staff", "security_level": "CRITICAL"}'::jsonb
        );
    END IF;
END $$;
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

export type UserRole = 'admin' | 'viewer' | null;

async function fetchUserRole(userId: string) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle<{ role: UserRole }>();

  if (error) throw error;
  return data?.role ?? null;
}

export default function useUserRoleQuery(userId?: string) {
  return useQuery({
    queryKey: ['user-role', userId],
    enabled: Boolean(userId),
    queryFn: () => fetchUserRole(userId as string),
    staleTime: 5 * 60 * 1000,
  });
}

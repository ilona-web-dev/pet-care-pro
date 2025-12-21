import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

import type { Client } from '../types/admin';

const mapClient = (row: any): Client => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email,
  phone: row.phone,
  address: row.address ?? '',
  notes: row.notes ?? '',
  createdAt: row.created_at,
});

export function useClientsQuery() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at');
      if (error) {
        console.error('Error loading clients', error);
        throw error;
      }
      return data.map(mapClient);
    },
    retry: 1,
  });
}

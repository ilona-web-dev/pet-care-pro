import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import { mapClient } from './useClientsQuery';
import type { Client } from '../types/admin';

type CreateClientPayload = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
};

export function useCreateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation<Client, Error, CreateClientPayload>({
    mutationFn: async (payload) => {
      const { data, error } = await supabase
        .from('clients')
        .insert({
          full_name: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          address: payload.address ?? null,
          notes: payload.notes ?? null,
        })
        .select()
        .single();
      if (error) throw error;
      return mapClient(data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  });
}

export default useCreateClientMutation;

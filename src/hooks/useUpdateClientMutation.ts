import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

type UpdateClientPayload = {
  id: string;
  data: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
  };
};

function useUpdateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, UpdateClientPayload>({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase
        .from('clients')
        .update({
          full_name: data.fullName ?? null,
          email: data.email ?? null,
          phone: data.phone ?? null,
          address: data.address ?? null,
          notes: data.notes ?? null,
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Client updated');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (error) => {
      toast.error(error.message ?? 'Failed to update client');
    },
  });
}

export default useUpdateClientMutation;

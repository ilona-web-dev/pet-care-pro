import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

type UpdateVetPayload = {
  id: string;
  data: {
    fullName?: string;
    role?: string;
    yearsExperience: number;
    active?: boolean;
  };
};

function useUpdateVetMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, UpdateVetPayload>({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase
        .from('vets')
        .update({
          full_name: data.fullName ?? null,
          role: data.role ?? null,
          years_experience: data.yearsExperience ?? null,
          active: data.active,
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Vet updated!');
      queryClient.invalidateQueries({ queryKey: ['vets'] });
    },
    onError: (error) => toast.error(error.message ?? 'Failed to update vet'),
  });
}

export default useUpdateVetMutation;

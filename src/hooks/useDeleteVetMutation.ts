import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

function useDeleteVetMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (vetId) => {
      const { error } = await supabase.from('vets').delete().eq('id', vetId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Vet deleted');
      queryClient.invalidateQueries({ queryKey: ['vets'] });
    },
    onError: (error) => {
      toast.error(error.message ?? 'Failed to delete vet');
    },
  });
}

export default useDeleteVetMutation;

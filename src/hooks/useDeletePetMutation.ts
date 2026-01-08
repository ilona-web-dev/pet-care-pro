import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

function useDeletePetMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (petId) => {
      const { error } = await supabase.from('pets').delete().eq('id', petId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Pet deleted');
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    onError: (error) => {
      toast.error(error.message ?? 'Failed to delete pet');
    },
  });
}

export default useDeletePetMutation;

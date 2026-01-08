import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

function useDeleteVisitMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (visitId) => {
      const { error } = await supabase
        .from('visits')
        .delete()
        .eq('id', visitId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Visit deleted');
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    },
    onError: (error) => {
      toast.error(error.message ?? 'Failed to delete visit');
    },
  });
}

export default useDeleteVisitMutation;

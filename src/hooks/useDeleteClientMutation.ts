import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

function useDeleteClientMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (clientId) => {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Client deleted');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (error) => toast.error(error.message ?? 'Failed to delete client'),
  });
}

export default useDeleteClientMutation;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteClient, CLIENT_NOT_DELETED } from '../services/clients';
import toast from 'react-hot-toast';

function useDeleteClientMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteClient,
    onSuccess: () => {
      toast.success('Client deleted');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (error) => {
      if (error.message === CLIENT_NOT_DELETED) {
        toast.error('You are not allowed to delete this client');
      } else {
        toast.error(error.message ?? 'Failed to delete client');
      }
    },
  });
}

export default useDeleteClientMutation;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVet, VET_NOT_DELETED } from '../services/vets';
import toast from 'react-hot-toast';

function useDeleteVetMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteVet,
    onSuccess: () => {
      toast.success('Vet deleted');
      queryClient.invalidateQueries({ queryKey: ['vets'] });
    },
    onError: (error) => {
      if (error.message === VET_NOT_DELETED) {
        toast.error('You are not allowed to delete this vet');
      } else {
        toast.error(error.message ?? 'Failed to delete vet');
      }
    },
  });
}

export default useDeleteVetMutation;

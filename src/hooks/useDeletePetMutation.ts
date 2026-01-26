import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePet, PET_NOT_DELETED } from '../services/pets';
import toast from 'react-hot-toast';

function useDeletePetMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deletePet,
    onSuccess: () => {
      toast.success('Pet deleted');
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    onError: (error) => {
      if (error.message === PET_NOT_DELETED) {
        toast.error('You are not allowed to delete this pet');
      } else {
        toast.error(error.message ?? 'Failed to delete pet');
      }
    },
  });
}

export default useDeletePetMutation;

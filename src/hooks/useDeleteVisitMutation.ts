import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVisit, VISIT_NOT_DELETED } from '../services/visits';
import toast from 'react-hot-toast';

function useDeleteVisitMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteVisit,
    onSuccess: () => {
      toast.success('Visit deleted');
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    },
    onError: (error) => {
      if (error.message === VISIT_NOT_DELETED) {
        toast.error('You are not allowed to delete this visit');
      } else {
        toast.error(error.message ?? 'Failed to delete visit');
      }
    },
  });
}

export default useDeleteVisitMutation;

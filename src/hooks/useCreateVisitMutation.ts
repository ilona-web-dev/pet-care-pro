import { type Visit } from '../types/admin';
import { type CreateVisitPayload, createVisit } from '../services/visits';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useCreateVisitMutation() {
  const queryClient = useQueryClient();
  return useMutation<Visit, Error, CreateVisitPayload>({
    mutationFn: createVisit,
    onSuccess: (newVisit) => {
      toast.success(`Visit ${newVisit.id} added`);
      queryClient.invalidateQueries({ queryKey: ['visits'] });
      queryClient.invalidateQueries({ queryKey: ['client-details'] });
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      toast.error(`Create visit failed, ${message}`);
    },
  });
}
export default useCreateVisitMutation;

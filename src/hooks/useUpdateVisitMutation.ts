import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVisit, type UpdateVisitPayload } from '../services/visits';
import type { Visit } from '../types/admin';

function useUpdateVisitMutation() {
  const queryClient = useQueryClient();
  return useMutation<Visit, Error, UpdateVisitPayload>({
    mutationFn: updateVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    },
  });
}

export default useUpdateVisitMutation;

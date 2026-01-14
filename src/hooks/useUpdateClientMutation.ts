import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClient, type UpdateClientPayload } from '../services/clients';
import type { Client } from '../types/admin';

function useUpdateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation<Client, Error, UpdateClientPayload>({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}

export default useUpdateClientMutation;

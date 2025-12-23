import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Client } from '../types/admin';
import {
  createClient,
  type CreateClientPayload,
} from '../services/clients';

export function useCreateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation<Client, Error, CreateClientPayload>({
    mutationFn: createClient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  });
}

export default useCreateClientMutation;

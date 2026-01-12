import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVet } from '../services/vets';

export default function useCreateVetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVet,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vets'] }),
  });
}

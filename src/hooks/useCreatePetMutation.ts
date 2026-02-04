import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPet } from '../services/pets';

export default function useCreatePetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      queryClient.invalidateQueries({ queryKey: ['client-details'] });
      queryClient.invalidateQueries({ queryKey: ['pet-details'] });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePet, type UpdatePetPayload } from '../services/pets';
import type { Pet } from '../types/admin';

export default function useUpdatePetMutation() {
  const queryClient = useQueryClient();

  return useMutation<Pet, Error, UpdatePetPayload>({
    mutationFn: updatePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      queryClient.invalidateQueries({ queryKey: ['pet-details'] });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVet } from '../services/vets';
import { type Vet } from '../types/admin';

type UpdateVetPayload = {
  id: string;
  data: {
    fullName?: string;
    role?: string;
    yearsExperience: number;
    isActive?: boolean;
    notes?: string;
  };
};

function useUpdateVetMutation() {
  const queryClient = useQueryClient();
  return useMutation<Vet, Error, UpdateVetPayload>({
    mutationFn: updateVet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vets'] });
    },
  });
}

export default useUpdateVetMutation;

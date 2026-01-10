import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import type { PetSex, PetSpecies } from '../types/admin';

type UpdatePetPayload = {
  id: string;
  data: {
    ownerId?: string;
    name?: string;
    species?: PetSpecies;
    breed?: string;
    sex?: PetSex;
    birthDate?: string;
    weightKg?: number;
    microchip?: string;
    notes?: string;
  };
};

export default function useUpdatePetMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdatePetPayload>({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase
        .from('pets')
        .update({
          owner_id: data.ownerId ?? null,
          name: data.name ?? null,
          species: data.species ?? null,
          breed: data.breed ?? null,
          sex: data.sex ?? null,
          birth_date: data.birthDate ?? null,
          weight_kg: data.weightKg ?? null,
          microchip: data.microchip ?? null,
          notes: data.notes ?? null,
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Pet updated');
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    onError: (error) => {
      toast.error(error.message ?? 'Failed to update pet');
    },
  });
}

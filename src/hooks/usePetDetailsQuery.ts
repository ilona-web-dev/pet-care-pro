import { useQuery } from '@tanstack/react-query';
import { fetchPetDetails } from '../services/pets';

export default function usePetDetailsQuery(petId?: string) {
  return useQuery({
    queryKey: ['pet-details', petId],
    queryFn: () => fetchPetDetails(petId!),
    enabled: Boolean(petId),
    retry: 1,
  });
}

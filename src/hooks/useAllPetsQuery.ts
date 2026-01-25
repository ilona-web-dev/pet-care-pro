import { useQuery } from '@tanstack/react-query';
import { fetchAllPets } from '../services/pets';

export function useAllPetsQuery() {
  return useQuery({
    queryKey: ['pets', 'all'],
    queryFn: fetchAllPets,
    staleTime: 5 * 60 * 1000,
  });
}

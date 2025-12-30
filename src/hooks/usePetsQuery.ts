import { useQuery } from '@tanstack/react-query';
import { fetchPets } from '../services/pets';

export function usePetsQuery() {
  return useQuery({
    queryKey: ['pets'],
    queryFn: fetchPets,
    retry: 1,
  });
}

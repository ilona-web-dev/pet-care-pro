import { useQuery } from '@tanstack/react-query';
import { fetchVets } from '../services/vets';

export function useVetsQuery() {
  return useQuery({
    queryKey: ['vets'],
    queryFn: fetchVets,
    retry: 1,
  });
}

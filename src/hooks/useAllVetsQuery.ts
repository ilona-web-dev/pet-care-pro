import { useQuery } from '@tanstack/react-query';
import { fetchAllVets } from '../services/vets';

export function useAllVetsQuery() {
  return useQuery({
    queryKey: ['vets', 'all'],
    queryFn: fetchAllVets,
    staleTime: 5 * 60 * 1000,
  });
}

export default useAllVetsQuery;

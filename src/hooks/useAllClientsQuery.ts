import { useQuery } from '@tanstack/react-query';
import { fetchAllClients } from '../services/clients';

export function useAllClientsQuery() {
  return useQuery({
    queryKey: ['clients', 'all'],
    queryFn: fetchAllClients,
    staleTime: 5 * 60 * 1000,
  });
}

export default useAllClientsQuery;

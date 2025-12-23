import { useQuery } from '@tanstack/react-query';
import { fetchClients } from '../services/clients';

export function useClientsQuery() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    retry: 1,
  });
}

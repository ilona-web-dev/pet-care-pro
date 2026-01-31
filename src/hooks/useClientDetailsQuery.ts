import { useQuery } from '@tanstack/react-query';
import { fetchClientDetails } from '../services/clients';

export default function useClientDetailsQuery(clientId?: string) {
  return useQuery({
    queryKey: ['client-details', clientId],
    queryFn: () => fetchClientDetails(clientId!),
    enabled: Boolean(clientId),
    retry: 1,
  });
}

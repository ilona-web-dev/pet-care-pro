import { useQuery } from '@tanstack/react-query';
import { fetchClients } from '../services/clients';

type UseClientsQueryArgs = {
  page: number;
  rowsPerPage: number;
};

export function useClientsQuery({ page, rowsPerPage }: UseClientsQueryArgs) {
  return useQuery({
    queryKey: ['clients', page, rowsPerPage],
    queryFn: () => fetchClients(page, rowsPerPage),
    retry: 1,
  });
}

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchClients } from '../services/clients';
import type { ClientSort } from '../types/admin';

type UseClientsQueryArgs = {
  page: number;
  rowsPerPage: number;
  search?: string;
  sort?: ClientSort;
};

export function useClientsQuery({
  page,
  rowsPerPage,
  search = '',
  sort = 'name-asc',
}: UseClientsQueryArgs) {
  return useQuery({
    queryKey: ['clients', page, rowsPerPage, search, sort],
    queryFn: () => fetchClients(page, rowsPerPage, { search, sort }),
    placeholderData: keepPreviousData,
    retry: 1,
  });
}

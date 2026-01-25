import { useQuery } from '@tanstack/react-query';
import { fetchVets } from '../services/vets';

type UseVetsQueryArgs = {
  page: number;
  rowsPerPage: number;
};

export function useVetsQuery({ page, rowsPerPage }: UseVetsQueryArgs) {
  return useQuery({
    queryKey: ['vets', page, rowsPerPage],
    queryFn: () => fetchVets(page, rowsPerPage),
    retry: 1,
  });
}

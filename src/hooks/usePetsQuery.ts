import { useQuery } from '@tanstack/react-query';
import { fetchPets } from '../services/pets';

type UsePetsQueryArgs = {
  page: number;
  rowsPerPage: number;
};

export function usePetsQuery({ page, rowsPerPage }: UsePetsQueryArgs) {
  return useQuery({
    queryKey: ['pets', page, rowsPerPage],
    queryFn: () => fetchPets(page, rowsPerPage),
    retry: 1,
  });
}

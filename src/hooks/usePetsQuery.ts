import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchPets } from '../services/pets';
import type { PetSort } from '../types/admin';

type UsePetsQueryArgs = {
  page: number;
  rowsPerPage: number;
  search?: string;
  sort: PetSort;
};

export function usePetsQuery({
  page,
  rowsPerPage,
  search = '',
  sort = 'name-asc',
}: UsePetsQueryArgs) {
  return useQuery({
    queryKey: ['pets', page, rowsPerPage, search, sort],
    queryFn: () => fetchPets(page, rowsPerPage, { search, sort }),
    placeholderData: keepPreviousData,
    retry: 1,
  });
}

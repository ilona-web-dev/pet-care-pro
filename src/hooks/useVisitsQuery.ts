import { useQuery } from '@tanstack/react-query';
import { fetchVisits } from '../services/visits';

type UseVisitsQueryArgs = {
  page: number;
  rowsPerPage: number;
};

export default function useVisitsQuery({
  page,
  rowsPerPage,
}: UseVisitsQueryArgs) {
  return useQuery({
    queryKey: ['visits', page, rowsPerPage],
    queryFn: () => fetchVisits(page, rowsPerPage),
    retry: 1,
  });
}

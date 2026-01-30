import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchVisits } from '../services/visits';
import type {
  VisitReason,
  VisitStatus,
  VisitsSortByDate,
} from '../types/admin';

type UseVisitsQueryArgs = {
  page: number;
  rowsPerPage: number;
  sort?: VisitsSortByDate;
  reason?: VisitReason | 'all';
  status?: VisitStatus | 'all';
};

export default function useVisitsQuery({
  page,
  rowsPerPage,
  sort = 'date-desc',
  reason = 'all',
  status = 'all',
}: UseVisitsQueryArgs) {
  return useQuery({
    queryKey: ['visits', page, rowsPerPage, sort, reason, status],
    queryFn: () => fetchVisits(page, rowsPerPage, { sort, reason, status }),
    placeholderData: keepPreviousData,
    retry: 1,
  });
}

import { useQuery } from '@tanstack/react-query';
import { fetchVisits } from '../services/visits';

export default function useVisitsQuery() {
  return useQuery({
    queryKey: ['visits'],
    queryFn: fetchVisits,
    retry: 1,
  });
}

import { useMemo } from 'react';
import { useVetsQuery } from './useVetsQuery';

export default function useVetMap() {
  const { data: vets = [] } = useVetsQuery();
  return useMemo(
    () =>
      vets.reduce<Record<string, string>>((acc, vet) => {
        acc[vet.id] = `${vet.fullName} (${vet.role})`;
        return acc;
      }, {}),
    [vets],
  );
}

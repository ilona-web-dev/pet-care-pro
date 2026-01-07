import { useMemo } from 'react';
import { useVetsQuery } from './useVetsQuery';

function useVetNameMap() {
  const { data: vets = [] } = useVetsQuery();
  return useMemo(
    () =>
      vets.reduce<Record<string, string>>((acc, vet) => {
        acc[vet.id] = `${vet.fullName}`;
        return acc;
      }, {}),
    [vets],
  );
}

export default useVetNameMap;

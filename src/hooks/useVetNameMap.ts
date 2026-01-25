import { useMemo } from 'react';
import { useAllVetsQuery } from './useAllVetsQuery';

function useVetNameMap() {
  const { data: vets = [] } = useAllVetsQuery();
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

import { useMemo } from 'react';
import { useAllPetsQuery } from './useAllPetsQuery';

function usePetNameMap() {
  const { data: pets = [] } = useAllPetsQuery();
  return useMemo(
    () =>
      pets.reduce<Record<string, string>>((acc, pet) => {
        acc[pet.id] = `${pet.name}`;
        return acc;
      }, {}),
    [pets],
  );
}

export default usePetNameMap;

import { useMemo } from 'react';
import { usePetsQuery } from './usePetsQuery';

function usePetNameMap() {
  const { data: pets = [] } = usePetsQuery();
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

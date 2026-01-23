import { useMemo } from 'react';
import { useAllClientsQuery } from './useAllClientsQuery';

export default function useOwnerNameMap() {
  const { data: clients = [] } = useAllClientsQuery();

  return useMemo(
    () =>
      clients.reduce<Record<string, string>>((acc, client) => {
        acc[client.id] = client.fullName;
        return acc;
      }, {}),
    [clients],
  );
}

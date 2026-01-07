import { useMemo } from 'react';
import { useClientsQuery } from './useClientsQuery';

export default function useOwnerNameMap() {
  const { data: clients = [] } = useClientsQuery();
  return useMemo(
    () =>
      clients.reduce<Record<string, string>>((acc, client) => {
        acc[client.id] = client.fullName;
        return acc;
      }, {}),
    [clients],
  );
}

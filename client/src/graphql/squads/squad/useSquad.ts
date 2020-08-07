import { useEffect } from 'react';

import { SquadQuery, useSquadLazyQuery } from './squad.apollo';

export type UseSquad = {
  data: SquadQuery['squad'];
  params: { squadId?: string };
};

export const useSquad = (params?: UseSquad['params']) => {
  const [fetchSquad, { data, loading, error }] = useSquadLazyQuery();

  useEffect(() => {
    if (params?.squadId) {
      fetchSquad({ variables: { id: params.squadId } });
    }
  }, [params?.squadId]);

  return {
    loading,
    error,
    data: data?.squad ?? null,
    fetch: fetchSquad,
  };
};

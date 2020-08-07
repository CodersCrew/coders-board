import { useEffect } from 'react';

import { ClansQuery, useClansLazyQuery } from './clan.apollo';

export type UseClans = {
  item: ClansQuery['clans'][number];
  params: { guildId?: string };
};

export const useClans = (params: UseClans['params']) => {
  const [fetchClans, { data, loading, error }] = useClansLazyQuery();

  useEffect(() => {
    if (params?.guildId) {
      fetchClans({ variables: { guildId: params.guildId } });
    }
  }, [params?.guildId]);

  return {
    loading,
    error,
    data: data?.clans ?? [],
    fetch: fetchClans,
  };
};

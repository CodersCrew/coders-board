import { useEffect } from 'react';

import { GuildQuery, useGuildLazyQuery } from './guild.apollo';

export type UseGuild = {
  data: GuildQuery['guild'];
  params: { guildId?: string };
};

export const useGuild = (params?: UseGuild['params']) => {
  const [fetchGuild, { data, loading, error }] = useGuildLazyQuery();

  useEffect(() => {
    if (params?.guildId) {
      fetchGuild({ variables: { id: params.guildId } });
    }
  }, [params?.guildId]);

  return {
    loading,
    error,
    data: data?.guild ?? null,
    fetch: fetchGuild,
  };
};

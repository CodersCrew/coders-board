import { GuildsQuery, useGuildsQuery } from './guild.apollo';

export type UseGuilds = {
  item: GuildsQuery['guilds'][number];
};

export const useGuilds = () => {
  const { data, loading, error, refetch } = useGuildsQuery();

  const guilds = data?.guilds ?? [];

  return {
    loading,
    error,
    refetch,
    data: guilds,
    count: guilds.length,
  };
};

import { GuildsQuery, GuildsQueryVariables, useGuildsQuery } from './guild.apollo';

export type UseGuilds = {
  item: GuildsQuery['guilds'][number];
  params: GuildsQueryVariables;
};

export const useGuilds = (params?: UseGuilds['params']) => {
  const { data, loading, error } = useGuildsQuery({ variables: params });

  const guilds = data?.guilds ?? [];

  return {
    loading,
    error,
    data: guilds,
    count: guilds.length,
  };
};

import { SimpleGuildsQuery, SimpleGuildsQueryVariables, useSimpleGuildsQuery } from './guild.apollo';

export type UseSimpleGuilds = {
  item: SimpleGuildsQuery['guilds'][number];
  params: SimpleGuildsQueryVariables;
};

export const useSimpleGuilds = (params?: UseSimpleGuilds['params']) => {
  const { data, loading, error } = useSimpleGuildsQuery({ variables: params });

  const guilds = data?.guilds ?? [];

  return {
    loading,
    error,
    data: guilds,
    count: guilds.length,
  };
};

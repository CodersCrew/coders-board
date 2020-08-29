import { SimpleGuildsQuery, SimpleGuildsQueryVariables, useSimpleGuildsQuery } from './guild.apollo';

export type UseSimpleGuilds = {
  item: SimpleGuildsQuery['guilds'][number];
  variables: SimpleGuildsQueryVariables;
};

export const useSimpleGuilds = (variables?: UseSimpleGuilds['variables']) => {
  const { data, loading, error, refetch } = useSimpleGuildsQuery({ variables });

  const guilds = data?.guilds ?? [];

  return {
    loading,
    error,
    refetch,
    data: guilds,
    count: guilds.length,
  };
};

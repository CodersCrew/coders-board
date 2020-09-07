import { GuildQuery, GuildQueryVariables, useGuildQuery } from './guild.apollo';

export type UseGuild = {
  data: GuildQuery['guild'];
  variables: GuildQueryVariables;
};

export const useGuild = (variables: UseGuild['variables']) => {
  const { data, loading, error, refetch } = useGuildQuery({ variables });

  return {
    loading,
    error,
    refetch,
    data: data?.guild ?? null,
  };
};

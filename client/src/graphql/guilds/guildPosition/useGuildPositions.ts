import { GuildPositionsQuery, GuildPositionsQueryVariables, useGuildPositionsQuery } from './guildPosition.apollo';

export type UseGuildPositions = {
  item: GuildPositionsQuery['guildPositions'][number];
  variables: GuildPositionsQueryVariables;
};

export const useGuildPositions = (variables: UseGuildPositions['variables']) => {
  const { data, loading, error, refetch } = useGuildPositionsQuery({ variables });

  const guildPositions = data?.guildPositions ?? [];

  return {
    loading,
    error,
    refetch,
    data: guildPositions,
    count: guildPositions.length,
  };
};

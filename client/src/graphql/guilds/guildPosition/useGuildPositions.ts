import { GuildPositionsQuery, GuildPositionsQueryVariables, useGuildPositionsQuery } from './guildPosition.apollo';

export type UseGuildPositions = {
  item: GuildPositionsQuery['guildPositions'][number];
  variables: GuildPositionsQueryVariables;
};

export const useGuildPositions = (variables: UseGuildPositions['variables']) => {
  const { data, loading, error, refetch } = useGuildPositionsQuery({ variables });

  let guildPositions = data?.guildPositions ?? [];

  guildPositions = guildPositions.map(guildPosition => ({
    ...guildPosition,
    from: new Date(guildPosition.from),
    to: guildPosition.to ? new Date(guildPosition.to) : guildPosition.to,
  }));

  return {
    loading,
    error,
    refetch,
    data: guildPositions,
    count: guildPositions.length,
  };
};

import { useEffect } from 'react';

import { GraphQLOperations } from '@/typings/graphql';

import {
  GuildPositionsQuery,
  useCreateGuildPositionMutation,
  useDeleteGuildPositionMutation,
  useGuildPositionsLazyQuery,
  useUpdateGuildPositionMutation,
} from './guildPosition.apollo';

export type UseGuildPositions = {
  item: GuildPositionsQuery['guildPositions'][number];
  params: { guildId?: string };
};

export const useGuildPositions = (params?: UseGuildPositions['params']) => {
  const refetch = { refetchQueries: [GraphQLOperations.Query.guildMembers, GraphQLOperations.Query.guildPositions] };

  const [fetchPositions, { data, loading, error }] = useGuildPositionsLazyQuery();
  const [createPosition] = useCreateGuildPositionMutation(refetch);
  const [updatePosition] = useUpdateGuildPositionMutation(refetch);
  const [deletePosition] = useDeleteGuildPositionMutation(refetch);

  useEffect(() => {
    if (params?.guildId) {
      fetchPositions({ variables: { guildId: params.guildId } });
    }
  }, [params?.guildId]);

  const guildPositions = data?.guildPositions ?? [];

  return {
    loading,
    error,
    data: guildPositions,
    count: guildPositions.length,
    fetch: fetchPositions,
    create: createPosition,
    update: updatePosition,
    delete: deletePosition,
  };
};

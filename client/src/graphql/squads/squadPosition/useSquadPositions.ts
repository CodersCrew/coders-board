import { useEffect } from 'react';

import { GraphQLOperations } from '@/typings/graphql';

import {
  SquadPositionsQuery,
  useCreateSquadPositionMutation,
  useDeleteSquadPositionMutation,
  useSquadPositionsLazyQuery,
  useUpdateSquadPositionMutation,
} from './squadPosition.apollo';

export type UseSquadPositions = {
  item: SquadPositionsQuery['squadPositions'][number];
  params: { squadId?: string };
};

export const useSquadPositions = (params?: UseSquadPositions['params']) => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.squadMembers, GraphQLOperations.Query.squadMembersIds],
  };

  const [fetchPositions, { data, loading, error }] = useSquadPositionsLazyQuery();
  const [createPosition] = useCreateSquadPositionMutation(mutationConfig);
  const [updatePosition] = useUpdateSquadPositionMutation(mutationConfig);
  const [deletePosition] = useDeleteSquadPositionMutation(mutationConfig);

  useEffect(() => {
    if (params?.squadId) {
      fetchPositions({ variables: { squadId: params.squadId } });
    }
  }, [params?.squadId]);

  const squadPositions = data?.squadPositions ?? [];

  return {
    loading,
    error,
    data: squadPositions,
    count: squadPositions.length,
    fetch: fetchPositions,
    create: createPosition,
    update: updatePosition,
    delete: deletePosition,
  };
};

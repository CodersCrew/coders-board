import { GraphQLOperations } from '@/typings/graphql';

import {
  PositionsQuery,
  useCreatePositionMutation,
  useDeletePositionMutation,
  usePositionsQuery,
  useUpdatePositionMutation,
} from './positions.apollo';

export type UsePositions = {
  item: PositionsQuery['positions'][number];
};

export const usePositions = () => {
  const mutationConfig = { refetchQueries: [GraphQLOperations.Query.positions] };

  const { data, loading, error, refetch } = usePositionsQuery();
  const [createMember] = useCreatePositionMutation(mutationConfig);
  const [updateMember] = useUpdatePositionMutation(mutationConfig);
  const [deleteMember] = useDeletePositionMutation(mutationConfig);

  const positions = data?.positions ?? [];

  return {
    loading,
    error,
    data: positions,
    count: positions.length,
    fetch: refetch,
    create: createMember,
    update: updateMember,
    delete: deleteMember,
  };
};

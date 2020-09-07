import { PositionsQuery, PositionsQueryVariables, usePositionsQuery } from './positions.apollo';

export type UsePositions = {
  variables: PositionsQueryVariables;
  item: PositionsQuery['positions'][number];
};

export const usePositions = (variables?: UsePositions['variables']) => {
  const { data, loading, error, refetch } = usePositionsQuery({ variables });

  const positions = data?.positions ?? [];

  return {
    loading,
    error,
    refetch,
    data: positions,
    count: positions.length,
  };
};

import { SimplePositionsQuery, SimplePositionsQueryVariables, useSimplePositionsQuery } from './positions.apollo';

export type UseSimplePositions = {
  variables: SimplePositionsQueryVariables;
  item: SimplePositionsQuery['positions'][number];
};

export const useSimplePositions = (variables?: UseSimplePositions['variables']) => {
  const { data, loading, error, refetch } = useSimplePositionsQuery({ variables });

  const positions = data?.positions ?? [];

  return {
    loading,
    error,
    refetch,
    data: positions,
    count: positions.length,
  };
};

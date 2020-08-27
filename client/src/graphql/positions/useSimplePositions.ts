import { SimplePositionsQuery, SimplePositionsQueryVariables, useSimplePositionsQuery } from './positions.apollo';

export type UseSimplePositions = {
  item: SimplePositionsQuery['positions'][number];
  params: SimplePositionsQueryVariables;
};

export const useSimplePositions = (params?: UseSimplePositions['params']) => {
  const { data, loading, error } = useSimplePositionsQuery({ variables: params });

  const positions = data?.positions ?? [];

  return {
    loading,
    error,
    data: positions,
    count: positions.length,
  };
};

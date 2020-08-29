import { SimplePositionsQuery, useSimplePositionsQuery } from './positions.apollo';

export type UseSimplePositions = {
  item: SimplePositionsQuery['positions'][number];
};

export const useSimplePositions = () => {
  const { data, loading, error, refetch } = useSimplePositionsQuery();

  const positions = data?.positions ?? [];

  return {
    loading,
    error,
    refetch,
    data: positions,
    count: positions.length,
  };
};

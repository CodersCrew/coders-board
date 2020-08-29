import { SquadPositionsQuery, SquadPositionsQueryVariables, useSquadPositionsQuery } from './squadPosition.apollo';

export type UseSquadPositions = {
  item: SquadPositionsQuery['squadPositions'][number];
  variables: SquadPositionsQueryVariables;
};

export const useSquadPositions = (variables: UseSquadPositions['variables']) => {
  const { data, loading, error, refetch } = useSquadPositionsQuery({ variables });

  const squadPositions = data?.squadPositions ?? [];

  return {
    loading,
    error,
    refetch,
    data: squadPositions,
    count: squadPositions.length,
  };
};

import { SquadPositionsQuery, SquadPositionsQueryVariables, useSquadPositionsQuery } from './squadPosition.apollo';

export type UseSquadPositions = {
  item: SquadPositionsQuery['squadPositions'][number];
  variables: SquadPositionsQueryVariables;
};

export const useSquadPositions = (variables: UseSquadPositions['variables']) => {
  const { data, loading, error, refetch } = useSquadPositionsQuery({ variables });

  let squadPositions = data?.squadPositions ?? [];

  squadPositions = squadPositions.map(squadPosition => ({
    ...squadPosition,
    from: new Date(squadPosition.from),
    to: squadPosition.to ? new Date(squadPosition.to) : squadPosition.to,
  }));

  return {
    loading,
    error,
    refetch,
    data: squadPositions,
    count: squadPositions.length,
  };
};

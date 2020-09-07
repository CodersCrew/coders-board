import { SquadQuery, SquadQueryVariables, useSquadQuery } from './squad.apollo';

export type UseSquad = {
  data: SquadQuery['squad'];
  variables: SquadQueryVariables;
};

export const useSquad = (variables: UseSquad['variables']) => {
  const { data, loading, error, refetch } = useSquadQuery({ variables });

  return {
    loading,
    error,
    refetch,
    data: data?.squad ?? null,
  };
};

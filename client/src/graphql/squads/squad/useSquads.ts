import { SquadsQuery, SquadsQueryVariables, useSquadsQuery } from './squad.apollo';

export type UseSquads = {
  item: SquadsQuery['squads'][number];
  params: SquadsQueryVariables;
};

export const useSquads = (params?: UseSquads['params']) => {
  const { data, loading, error } = useSquadsQuery({ variables: params });

  const squads = data?.squads ?? [];

  return {
    loading,
    error,
    data: squads,
    count: squads.length,
  };
};

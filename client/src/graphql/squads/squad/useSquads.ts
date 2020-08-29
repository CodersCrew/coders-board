import { SquadsQuery, useSquadsQuery } from './squad.apollo';

export type UseSquads = {
  item: SquadsQuery['squads'][number];
};

export const useSquads = () => {
  const { data, loading, error, refetch } = useSquadsQuery();

  const squads = data?.squads ?? [];

  return {
    loading,
    error,
    refetch,
    data: squads,
    count: squads.length,
  };
};

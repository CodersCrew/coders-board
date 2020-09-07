import { ClansQuery, ClansQueryVariables, useClansQuery } from './clan.apollo';

export type UseClans = {
  item: ClansQuery['clans'][number];
  variables: ClansQueryVariables;
};

export const useClans = (variables: UseClans['variables']) => {
  const { data, loading, error, refetch } = useClansQuery({ variables });

  const clans = data?.clans ?? [];

  return {
    loading,
    error,
    refetch,
    data: clans,
    count: clans.length,
  };
};

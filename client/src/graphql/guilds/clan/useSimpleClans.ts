import { SimpleClansQuery, SimpleClansQueryVariables, useSimpleClansQuery } from './clan.apollo';

export type UseSimpleClans = {
  item: SimpleClansQuery['clans'][number];
  variables: SimpleClansQueryVariables;
};

export const useSimpleClans = (variables: UseSimpleClans['variables']) => {
  const { data, loading, error } = useSimpleClansQuery({ variables });

  const clans = data?.clans ?? [];

  return {
    loading,
    error,
    data: clans,
    count: clans.length,
  };
};

import { SimpleClansQuery, SimpleClansQueryVariables, useSimpleClansQuery } from './clan.apollo';

export type UseSimpleClans = {
  item: SimpleClansQuery['clans'][number];
  params: SimpleClansQueryVariables;
};

export const useSimpleClans = (params?: UseSimpleClans['params']) => {
  const { data, loading, error } = useSimpleClansQuery({ variables: params });

  const clans = data?.clans ?? [];

  return {
    loading,
    error,
    data: clans,
    count: clans.length,
  };
};

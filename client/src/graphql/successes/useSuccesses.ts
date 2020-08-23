import { SuccessesQuery, SuccessesQueryVariables, useSuccessesQuery } from './successes.apollo';

export type UseSuccesses = {
  params: SuccessesQueryVariables;
  item: SuccessesQuery['successes'][number];
};

export const useSuccesses = (params?: UseSuccesses['params']) => {
  const { data, loading, error, refetch } = useSuccessesQuery({ variables: params });

  const successes = data?.successes ?? [];

  return {
    loading,
    error,
    data: successes,
    count: successes.length,
    fetch: refetch,
  };
};

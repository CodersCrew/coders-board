import { SuccessesQuery, SuccessesQueryVariables, useSuccessesQuery } from './successes.apollo';

export type UseSuccesses = {
  variables: SuccessesQueryVariables;
  item: SuccessesQuery['successes'][number];
};

export const useSuccesses = (variables?: UseSuccesses['variables']) => {
  const { data, loading, error, refetch } = useSuccessesQuery({ variables });

  const successes = data?.successes ?? [];

  return {
    loading,
    error,
    refetch,
    data: successes,
    count: successes.length,
  };
};

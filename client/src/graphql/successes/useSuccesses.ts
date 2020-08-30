import { SuccessesQuery, SuccessesQueryVariables, useSuccessesQuery } from './successes.apollo';

export type UseSuccesses = {
  variables: SuccessesQueryVariables;
  item: SuccessesQuery['successes'][number];
};

export const useSuccesses = (variables?: UseSuccesses['variables']) => {
  const { data, loading, error, refetch } = useSuccessesQuery({ variables });

  let successes = data?.successes ?? [];

  successes = successes.map(success => ({ ...success, date: new Date(success.date) }));

  return {
    loading,
    error,
    refetch,
    data: successes,
    count: successes.length,
  };
};

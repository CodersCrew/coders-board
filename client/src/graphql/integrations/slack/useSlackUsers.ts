import { SlackUsersQuery, useSlackUsersQuery } from './slack.apollo';

export type UseSlackUsers = {
  item: SlackUsersQuery['slackUsers'][number];
};

export const useSlackUsers = () => {
  const { data, loading, error, refetch } = useSlackUsersQuery();

  return {
    loading,
    error,
    data: data?.slackUsers ?? [],
    refetch,
  };
};

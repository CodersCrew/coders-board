import { SlackUsersQuery, useSlackUsersQuery } from './slack.apollo';

export type UseSlackUsers = {
  item: SlackUsersQuery['slackUsers'][number];
};

export const useSlackUsers = () => {
  const { data, loading, error, refetch } = useSlackUsersQuery();

  const slackUsers = data?.slackUsers ?? [];

  return {
    loading,
    error,
    refetch,
    data: slackUsers,
    count: slackUsers.length,
  };
};

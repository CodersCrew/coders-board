import { GsuiteUsersQuery, useGsuiteUsersQuery } from './gsuite.apollo';

export type UseGsuiteUsers = {
  item: GsuiteUsersQuery['gsuiteUsers'][number];
};

export const useGsuiteUsers = () => {
  const { data, loading, error, refetch } = useGsuiteUsersQuery();

  const gsuiteUsers = data?.gsuiteUsers ?? [];

  return {
    loading,
    error,
    refetch,
    data: gsuiteUsers,
    count: gsuiteUsers.length,
  };
};

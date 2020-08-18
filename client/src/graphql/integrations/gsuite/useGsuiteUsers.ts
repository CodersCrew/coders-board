import { GsuiteUsersQuery, useGsuiteUsersQuery } from './gsuite.apollo';

export type UseGsuiteUsers = {
  item: GsuiteUsersQuery['gsuiteUsers'][number];
};

export const useGsuiteUsers = () => {
  const { data, loading, error, refetch } = useGsuiteUsersQuery();

  return {
    loading,
    error,
    data: data?.gsuiteUsers ?? [],
    refetch,
  };
};

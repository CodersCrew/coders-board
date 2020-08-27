import { SimpleUsersQuery, SimpleUsersQueryVariables, useSimpleUsersQuery } from './user.apollo';

export type UseSimpleUsers = {
  item: SimpleUsersQuery['users'][number];
  params: SimpleUsersQueryVariables;
};

export const useSimpleUsers = (params?: UseSimpleUsers['params']) => {
  const { data, loading, error } = useSimpleUsersQuery({ variables: params });

  const users = data?.users ?? [];

  return {
    loading,
    error,
    data: users,
    count: users.length,
  };
};

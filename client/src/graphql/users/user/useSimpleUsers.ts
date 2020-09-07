import { SimpleUsersQuery, SimpleUsersQueryVariables, useSimpleUsersQuery } from './user.apollo';

export type UseSimpleUsers = {
  item: SimpleUsersQuery['users'][number];
  variables: SimpleUsersQueryVariables;
};

export const useSimpleUsers = (variables: UseSimpleUsers['variables']) => {
  const { data, loading, error } = useSimpleUsersQuery({ variables });

  const users = data?.users ?? [];

  return {
    loading,
    error,
    data: users,
    count: users.length,
  };
};

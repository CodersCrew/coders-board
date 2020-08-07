import { useCreateUserMutation, UsersQuery, UsersQueryVariables, useUsersQuery } from './user.apollo';

export type UseUsers = {
  item: UsersQuery['users'][number];
  params: UsersQueryVariables;
};

export const useUsers = (params?: UseUsers['params']) => {
  const { data, loading, error } = useUsersQuery({ variables: params });
  const [createUser] = useCreateUserMutation();

  const users = data?.users ?? [];

  return {
    loading,
    error,
    data: users,
    count: users.length,
    create: createUser,
  };
};

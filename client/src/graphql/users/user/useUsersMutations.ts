import { GraphQLOperations } from '@/typings/graphql';

import { useCreateUserMutation, useDeleteUserMutation } from './user.apollo';

export const useUsersMutations = () => {
  const mutationConfig = { refetchQueries: [GraphQLOperations.Query.users, GraphQLOperations.Query.userSelectUsers] };

  const [createUser] = useCreateUserMutation(mutationConfig);
  const [deleteUser] = useDeleteUserMutation(mutationConfig);

  return {
    create: createUser,
    delete: deleteUser,
  };
};

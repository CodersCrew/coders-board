import { CreateUserInput, GraphQLOperations } from '@/typings/graphql';

import { DeleteUserMutationVariables, useCreateUserMutation, useDeleteUserMutation } from './user.apollo';

export const useUsersMutations = () => {
  const mutationConfig = {
    refetchQueries: [
      GraphQLOperations.Query.users,
      GraphQLOperations.Query.simpleUsers,
      GraphQLOperations.Query.slackUsers,
    ],
  };

  const [createUser] = useCreateUserMutation(mutationConfig);
  const [deleteUser] = useDeleteUserMutation(mutationConfig);

  return {
    createUser: (data: CreateUserInput) => createUser({ variables: { data } }),
    deleteUser: (variables: DeleteUserMutationVariables) => deleteUser({ variables }),
  };
};

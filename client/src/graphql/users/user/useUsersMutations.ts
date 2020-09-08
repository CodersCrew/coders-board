import { CreateUserInput, GraphQLOperations, UpdateUserInput } from '@/typings/graphql';

import {
  DeleteUserMutationVariables,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from './user.apollo';

export const useUsersMutations = () => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.users, GraphQLOperations.Query.simpleUsers],
  };

  const [createUser] = useCreateUserMutation(mutationConfig);
  const [updateUser] = useUpdateUserMutation(mutationConfig);
  const [deleteUser] = useDeleteUserMutation(mutationConfig);

  return {
    createUser: (data: CreateUserInput) => createUser({ variables: { data } }),
    updateUser: (data: UpdateUserInput) => updateUser({ variables: { data } }),
    deleteUser: (variables: DeleteUserMutationVariables) => deleteUser({ variables }),
  };
};

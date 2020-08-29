import { CreateSuccessInput, GraphQLOperations, UpdateSuccessInput } from '@/typings/graphql';

import {
  DeleteSuccessMutationVariables,
  useCreateSuccessMutation,
  useDeleteSuccessMutation,
  useUpdateSuccessMutation,
} from './successes.apollo';

export const useSuccessMutations = () => {
  const mutationConfig = { refetchQueries: [GraphQLOperations.Query.successes] };

  const [createSuccess] = useCreateSuccessMutation(mutationConfig);
  const [updateSuccess] = useUpdateSuccessMutation(mutationConfig);
  const [deleteSuccess] = useDeleteSuccessMutation(mutationConfig);

  return {
    createSuccess: (data: CreateSuccessInput) => createSuccess({ variables: { data } }),
    updateSuccess: (data: UpdateSuccessInput) => updateSuccess({ variables: { data } }),
    deleteSuccess: (variables: DeleteSuccessMutationVariables) => deleteSuccess({ variables }),
  };
};

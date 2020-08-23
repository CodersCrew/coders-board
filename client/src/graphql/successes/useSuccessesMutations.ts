import { GraphQLOperations } from '@/typings/graphql';

import { useCreateSuccessMutation, useDeleteSuccessMutation, useUpdateSuccessMutation } from './successes.apollo';

export const useSuccessesMutations = () => {
  const mutationConfig = { refetchQueries: [GraphQLOperations.Query.successes] };

  const [createMember] = useCreateSuccessMutation(mutationConfig);
  const [updateMember] = useUpdateSuccessMutation(mutationConfig);
  const [deleteMember] = useDeleteSuccessMutation(mutationConfig);

  return {
    create: createMember,
    update: updateMember,
    delete: deleteMember,
  };
};

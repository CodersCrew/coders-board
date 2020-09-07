import { CreatePositionInput, GraphQLOperations, UpdatePositionInput } from '@/typings/graphql';

import {
  DeletePositionMutationVariables,
  useCreatePositionMutation,
  useDeletePositionMutation,
  useUpdatePositionMutation,
} from './positions.apollo';

export const usePositionMutations = () => {
  const mutationConfig = { refetchQueries: [GraphQLOperations.Query.positions] };

  const [createPosition] = useCreatePositionMutation(mutationConfig);
  const [updatePosition] = useUpdatePositionMutation(mutationConfig);
  const [deletePosition] = useDeletePositionMutation(mutationConfig);

  return {
    createPosition: (data: CreatePositionInput) => createPosition({ variables: { data } }),
    updatePosition: (data: UpdatePositionInput) => updatePosition({ variables: { data } }),
    deletePosition: (variables: DeletePositionMutationVariables) => deletePosition({ variables }),
  };
};

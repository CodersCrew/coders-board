import { CreateGuildPositionInput, GraphQLOperations, UpdateGuildPositionInput } from '@/typings/graphql';

import {
  DeleteGuildPositionMutationVariables,
  useCreateGuildPositionMutation,
  useDeleteGuildPositionMutation,
  useUpdateGuildPositionMutation,
} from './guildPosition.apollo';

export const useGuildPositionMutations = () => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.guildMembers, GraphQLOperations.Query.guildPositions],
  };

  const [createGuildPosition] = useCreateGuildPositionMutation(mutationConfig);
  const [updateGuildPosition] = useUpdateGuildPositionMutation(mutationConfig);
  const [deleteGuildPosition] = useDeleteGuildPositionMutation(mutationConfig);

  return {
    createGuildPosition: (data: CreateGuildPositionInput) => createGuildPosition({ variables: { data } }),
    updateGuildPosition: (data: UpdateGuildPositionInput) => updateGuildPosition({ variables: { data } }),
    deleteGuildPosition: (variables: DeleteGuildPositionMutationVariables) => deleteGuildPosition({ variables }),
  };
};

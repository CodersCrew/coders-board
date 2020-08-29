import { CreateSquadPositionInput, GraphQLOperations, UpdateSquadPositionInput } from '@/typings/graphql';

import {
  DeleteSquadPositionMutationVariables,
  useCreateSquadPositionMutation,
  useDeleteSquadPositionMutation,
  useUpdateSquadPositionMutation,
} from './squadPosition.apollo';

export const useSquadPositionMutations = () => {
  const mutationConfig = {
    refetchQueries: [
      GraphQLOperations.Query.squadMembers,
      GraphQLOperations.Query.squad,
      GraphQLOperations.Query.squadPositions,
      GraphQLOperations.Query.chapters,
    ],
  };

  const [createSquadPosition] = useCreateSquadPositionMutation(mutationConfig);
  const [updateSquadPosition] = useUpdateSquadPositionMutation(mutationConfig);
  const [deleteSquadPosition] = useDeleteSquadPositionMutation(mutationConfig);

  return {
    createSquadPosition: (data: CreateSquadPositionInput) => createSquadPosition({ variables: { data } }),
    updateSquadPosition: (data: UpdateSquadPositionInput) => updateSquadPosition({ variables: { data } }),
    deleteSquadPosition: (variables: DeleteSquadPositionMutationVariables) => deleteSquadPosition({ variables }),
  };
};

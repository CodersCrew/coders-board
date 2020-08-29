import { CreateSquadMemberInput, GraphQLOperations, UpdateSquadMemberInput } from '@/typings/graphql';

import {
  DeleteSquadMemberMutationVariables,
  useCreateSquadMemberMutation,
  useDeleteSquadMemberMutation,
  useUpdateSquadMemberMutation,
} from './squadMember.apollo';

export const useSquadMemberMutations = () => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.squadMembers, GraphQLOperations.Query.squadPositions],
  };

  const [createSquadMember] = useCreateSquadMemberMutation(mutationConfig);
  const [updateSquadMember] = useUpdateSquadMemberMutation(mutationConfig);
  const [deleteSquadMember] = useDeleteSquadMemberMutation(mutationConfig);

  return {
    createSquadMember: (data: CreateSquadMemberInput) => createSquadMember({ variables: { data } }),
    updateSquadMember: (data: UpdateSquadMemberInput) => updateSquadMember({ variables: { data } }),
    deleteSquadMember: (variables: DeleteSquadMemberMutationVariables) => deleteSquadMember({ variables }),
  };
};

import { CreateSquadMemberInput, GraphQLOperations, UpdateSquadMemberInput } from '@/typings/graphql';

import { useCreateSquadMemberMutation, useUpdateSquadMemberMutation } from './squadMember.apollo';

export const useSquadMemberMutations = () => {
  const mutationConfig = {
    refetchQueries: [
      GraphQLOperations.Query.squadMembers,
      GraphQLOperations.Query.squadMembersIds,
      GraphQLOperations.Query.squadPositions,
    ],
  };

  const [createSquadMember] = useCreateSquadMemberMutation(mutationConfig);
  const [updateSquadMember] = useUpdateSquadMemberMutation(mutationConfig);

  return {
    createSquadMember: (data: CreateSquadMemberInput) => createSquadMember({ variables: { data } }),
    updateSquadMember: (data: UpdateSquadMemberInput) => updateSquadMember({ variables: { data } }),
  };
};

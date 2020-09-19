import { CreateGuildMemberInput, GraphQLOperations, UpdateGuildMemberInput } from '@/typings/graphql';

import { useCreateGuildMemberMutation, useUpdateGuildMemberMutation } from './guildMember.apollo';

export const useGuildMemberMutations = () => {
  const mutationConfig = {
    refetchQueries: [
      GraphQLOperations.Query.guildMembers,
      GraphQLOperations.Query.guildMembersIds,
      GraphQLOperations.Query.guildPositions,
    ],
  };

  const [createGuildMember] = useCreateGuildMemberMutation(mutationConfig);
  const [updateGuildMember] = useUpdateGuildMemberMutation(mutationConfig);

  return {
    createGuildMember: (data: CreateGuildMemberInput) => createGuildMember({ variables: { data } }),
    updateGuildMember: (data: UpdateGuildMemberInput) => updateGuildMember({ variables: { data } }),
  };
};

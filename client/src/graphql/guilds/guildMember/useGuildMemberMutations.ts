import { CreateGuildMemberInput, GraphQLOperations, UpdateGuildMemberInput } from '@/typings/graphql';

import {
  DeleteGuildMemberMutationVariables,
  useCreateGuildMemberMutation,
  useDeleteGuildMemberMutation,
  useUpdateGuildMemberMutation,
} from './guildMember.apollo';

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
  const [deleteGuildMember] = useDeleteGuildMemberMutation(mutationConfig);

  return {
    createGuildMember: (data: CreateGuildMemberInput) => createGuildMember({ variables: { data } }),
    updateGuildMember: (data: UpdateGuildMemberInput) => updateGuildMember({ variables: { data } }),
    deleteGuildMember: (variables: DeleteGuildMemberMutationVariables) => deleteGuildMember({ variables }),
  };
};

import { GraphQLOperations } from '@/typings/graphql';

import {
  useCreateGuildMemberMutation,
  useDeleteGuildMemberMutation,
  useUpdateGuildMemberMutation,
} from './guildMember.apollo';

export const useGuildMembersMutations = () => {
  const mutationConfig = {
    refetchQueries: [
      GraphQLOperations.Query.guildMembers,
      GraphQLOperations.Query.guildMembersIds,
      GraphQLOperations.Query.guildPositions,
    ],
  };

  const [createMember] = useCreateGuildMemberMutation(mutationConfig);
  const [updateMember] = useUpdateGuildMemberMutation(mutationConfig);
  const [deleteMember] = useDeleteGuildMemberMutation(mutationConfig);

  return {
    create: createMember,
    update: updateMember,
    delete: deleteMember,
  };
};

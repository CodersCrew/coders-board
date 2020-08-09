import { useEffect } from 'react';

import { GraphQLOperations } from '@/typings/graphql';

import {
  GuildMembersQuery,
  useCreateGuildMemberMutation,
  useDeleteGuildMemberMutation,
  useGuildMembersLazyQuery,
  useUpdateGuildMemberMutation,
} from './guildMember.apollo';

export type UseGuildMembers = {
  item: GuildMembersQuery['guildMembers'][number];
  params: { guildId?: string };
};

export const useGuildMembers = (params?: UseGuildMembers['params']) => {
  const mutationConfig = {
    refetchQueries: [GraphQLOperations.Query.guildMembers, GraphQLOperations.Query.guildMembersIds],
  };

  const [fetchMembers, { data, loading, error }] = useGuildMembersLazyQuery();
  const [createMember] = useCreateGuildMemberMutation(mutationConfig);
  const [updateMember] = useUpdateGuildMemberMutation(mutationConfig);
  const [deleteMember] = useDeleteGuildMemberMutation(mutationConfig);

  useEffect(() => {
    if (params?.guildId) {
      fetchMembers({ variables: { guildId: params.guildId } });
    }
  }, [params?.guildId]);

  const guildMembers = data?.guildMembers ?? [];

  return {
    loading,
    error,
    data: guildMembers,
    count: guildMembers.length,
    fetch: fetchMembers,
    create: createMember,
    update: updateMember,
    delete: deleteMember,
  };
};

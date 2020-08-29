import { GuildMembersQuery, GuildMembersQueryVariables, useGuildMembersQuery } from './guildMember.apollo';

export type UseGuildMembers = {
  item: GuildMembersQuery['guildMembers'][number];
  variables: GuildMembersQueryVariables;
};

export const useGuildMembers = (variables: UseGuildMembers['variables']) => {
  const { data, loading, error, refetch } = useGuildMembersQuery({ variables });

  const guildMembers = data?.guildMembers ?? [];

  return {
    loading,
    error,
    refetch,
    data: guildMembers,
    count: guildMembers.length,
  };
};

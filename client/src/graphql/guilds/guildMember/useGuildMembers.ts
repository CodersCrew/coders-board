import { GuildMembersQuery, useGuildMembersQuery } from './guildMember.apollo';

export type UseGuildMembers = {
  item: GuildMembersQuery['guildMembers'][number];
  params: { guildId: string };
};

export const useGuildMembers = ({ guildId }: UseGuildMembers['params']) => {
  const { data, loading, error, refetch } = useGuildMembersQuery({ variables: { guildId } });

  const guildMembers = data?.guildMembers ?? [];

  return {
    loading,
    error,
    data: guildMembers,
    count: guildMembers.length,
    refetch,
  };
};

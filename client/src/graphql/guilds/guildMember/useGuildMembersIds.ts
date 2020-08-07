import { useGuildMembersIdsQuery } from './guildMember.apollo';

export type UseGuildMembersIds = {
  params: { guildId: string };
};

export const useGuildMembersIds = ({ guildId }: UseGuildMembersIds['params']) => {
  const { data } = useGuildMembersIdsQuery({ variables: { guildId } });

  const guildMembers = data?.guildMembers ?? [];
  const memberIds = guildMembers.map(({ id }) => id);
  const userIds = guildMembers.map(({ user }) => user.id);
  const userToMemberMap = guildMembers.reduce((obj, { id, user }) => ({ ...obj, [user.id]: id }), {});

  return {
    memberIds,
    userIds,
    userToMemberMap,
  };
};

import { GuildMembersIdsQueryVariables, useGuildMembersIdsQuery } from './guildMember.apollo';

export type UseGuildMembersIds = {
  variables: GuildMembersIdsQueryVariables;
};

export const useGuildMembersIds = (variables: UseGuildMembersIds['variables']) => {
  const { data } = useGuildMembersIdsQuery({ variables });

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

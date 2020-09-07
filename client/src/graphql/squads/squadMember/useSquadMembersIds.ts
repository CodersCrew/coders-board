import { SquadMembersIdsQueryVariables, useSquadMembersIdsQuery } from './squadMember.apollo';

export type UseSquadMembersIds = {
  variables: SquadMembersIdsQueryVariables;
};

export const useSquadMembersIds = (variables: UseSquadMembersIds['variables']) => {
  const { data } = useSquadMembersIdsQuery({ variables });

  const squadMembers = data?.squadMembers ?? [];
  const membersIds = squadMembers.map(({ id }) => id);
  const membersUserIds = squadMembers.map(({ user }) => user.id);
  const userIdToMemberIdMap = squadMembers.reduce((obj, { id, user }) => ({ ...obj, [user.id]: id }), {});

  return {
    membersIds,
    membersUserIds,
    userIdToMemberIdMap,
  };
};

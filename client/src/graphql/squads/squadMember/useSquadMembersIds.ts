import { useSquadMembersIdsQuery } from './squadMember.apollo';

export type UseSquadMembersIds = {
  params: { squadId: string };
};

export const useSquadMembersIds = ({ squadId }: UseSquadMembersIds['params']) => {
  const { data } = useSquadMembersIdsQuery({ variables: { squadId } });

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

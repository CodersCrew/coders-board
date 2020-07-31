import { pick } from 'lodash';

import { TeamPositionsQuery } from './TeamPositions.apollo';
import { PositionItem } from './TeamPositions.types';

export const membersToPositionItems = (members: TeamPositionsQuery['teamMembers']): PositionItem[] =>
  members.reduce((arr, member) => {
    const positions = member.positions.map(memberPosition => ({
      ...pick(memberPosition, ['id', 'notes', 'from', 'to']),
      positionName: memberPosition.position.name,
      positionId: memberPosition.position.id,
      userName: `${member.user.firstName} ${member.user.lastName}`,
      userImage: member.user.image,
      teamMemberId: member.id,
    }));

    return [...arr, ...positions];
  }, [] as PositionItem[]);

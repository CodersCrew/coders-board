import { ConflictException } from '@nestjs/common';

import { Team, TeamKind } from './team.model';

export const checkKindRelation = (kind: TeamKind, parent?: Team) => {
  switch (kind) {
    case TeamKind.CHAPTER: {
      if (parent?.kind !== TeamKind.SQUAD) {
        throw new ConflictException(`${kind} needs to have ${TeamKind.SQUAD} as a parent`);
      }
      break;
    }
    case TeamKind.CLAN: {
      if (parent?.kind !== TeamKind.GUILD) {
        throw new ConflictException(`${kind} needs to have ${TeamKind.GUILD} as a parent`);
      }
      break;
    }
    default: {
      if (parent) {
        throw new ConflictException(`${kind} is a root team and cannot has a parent`);
      }
    }
  }
};

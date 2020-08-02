import { TeamKind } from '@/typings/graphql';

import { getTeamName } from './getTeamName';

export const canHaveChildren = (kind: TeamKind) => kind === TeamKind.Guild || kind === TeamKind.Squad;

export const canBeChild = (kind: TeamKind) => kind === TeamKind.Clan || kind === TeamKind.Chapter;

export const getChildrenName = (kind: TeamKind) => {
  if (kind === TeamKind.Guild) return getTeamName(TeamKind.Clan, { plural: true });
  if (kind === TeamKind.Squad) return getTeamName(TeamKind.Chapter, { plural: true });

  console.warn(`Team of kind ${kind} cannot have children teams`);

  return '';
};

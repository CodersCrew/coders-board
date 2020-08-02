import { TeamKind } from '@/typings/graphql';

type Options = {
  plural?: boolean;
  lowercase?: boolean;
};

const teamNames = {
  [TeamKind.Squad]: 'Squad',
  [TeamKind.Chapter]: 'Chapter',
  [TeamKind.Guild]: 'Guild',
  [TeamKind.Clan]: 'Clan',
  [TeamKind.Taskforce]: 'Task Force',
  [TeamKind.Management]: 'Management',
};

export const getTeamName = (kind: TeamKind, options: Options) => {
  let name = teamNames[kind];

  if (options.lowercase) {
    name = name.toLowerCase();
  }

  if (options.plural) {
    name = `${name}s`;
  }

  return name;
};

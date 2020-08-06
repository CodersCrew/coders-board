import { GuildPositionKind } from '@/typings/graphql';

type Options = {
  plural?: boolean;
  lowercase?: boolean;
};

const kindName = {
  [GuildPositionKind.Expert]: 'Expert',
  [GuildPositionKind.Leader]: 'Leader',
  [GuildPositionKind.Member]: 'Member',
};

export const parseGuildPositionKind = (kind: GuildPositionKind, options?: Options) => {
  let name = kindName[kind];

  if (options?.lowercase) {
    name = name.toLowerCase();
  }

  if (options?.plural) {
    name = `${name}s`;
  }

  return name;
};

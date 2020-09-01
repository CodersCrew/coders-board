import { GuildPositionKind } from '@/typings/graphql';

type Options = {
  plural?: boolean;
  lowercase?: boolean;
};

const kindNames = {
  [GuildPositionKind.Expert]: 'Expert',
  [GuildPositionKind.Leader]: 'Leader',
  [GuildPositionKind.Member]: 'Member',
};

/**
 * Parses GuildPositionKind enum into a text.
 * @param kind One of the GuildPositionKind values.
 * @param options Options for transforming function output.
 */
export const parseGuildPositionKind = (kind: GuildPositionKind, options?: Options) => {
  let name = kindNames[kind];

  if (options?.lowercase) {
    name = name.toLowerCase();
  }

  if (options?.plural) {
    name = `${name}s`;
  }

  return name;
};

export const getPositionInGuild = (kind: GuildPositionKind, clanName?: string) => {
  const kindName = parseGuildPositionKind(kind);
  return clanName ? `${kindName} in ${clanName} clan` : `${kindName} of the guild`;
};

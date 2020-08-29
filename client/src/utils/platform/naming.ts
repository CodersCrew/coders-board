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

/**
 * Parses GuildPositionKind enum into a text.
 * @param kind One of the GuildPositionKind values.
 * @param options Options for transforming function output.
 */
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

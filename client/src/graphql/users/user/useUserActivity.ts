import arraySort from 'array-sort';
import { compareAsc, compareDesc } from 'date-fns';

import { pick } from '@/utils/objects';
import { parseGuildPositionKind } from '@/utils/platform';

import { UserActivityQuery, UserActivityQueryVariables, useUserActivityQuery } from './user.apollo';

type Activity = {
  id: string;
  type: 'squad' | 'guild';
  team: {
    name: string;
    image: string;
  };
  subTeam?: {
    type: 'clan' | 'chapter';
    name: string;
  };
  position: {
    name: string;
    from: Date;
    to?: Date | null;
    notes: string;
  };
};

export type UseUserActivity = {
  item: Activity;
  variables: UserActivityQueryVariables;
};

const parseUserActivity = (data: UserActivityQuery['user']): Activity[] => {
  const guilds = data.guilds.flatMap(({ guild, positions }) => {
    return positions.map<Activity>(position => {
      const positionKind = parseGuildPositionKind(position.kind);
      const positionName = position.clan
        ? `${positionKind} in the ${position.clan.name} clan`
        : `${positionKind} of the ${guild.name} guild`;

      return {
        id: position.id,
        type: 'guild',
        team: pick(guild, ['name', 'image']),
        subTeam: position.clan ? { type: 'clan', name: position.clan.name } : undefined,
        position: {
          name: positionName,
          from: new Date(position.from),
          to: position.to ? new Date(position.to) : null,
          notes: position.notes ?? '',
        },
      };
    });
  });

  const squads = data.squads.flatMap(({ squad, positions }) => {
    return positions.map<Activity>(position => {
      return {
        id: position.id,
        type: 'squad',
        team: pick(squad, ['name', 'image']),
        subTeam: position.chapter ? { type: 'chapter', name: position.chapter.name } : undefined,
        position: {
          name: position.position.name,
          from: new Date(position.from),
          to: position.to ? new Date(position.to) : null,
          notes: position.notes ?? '',
        },
      };
    });
  });

  const now = new Date();

  return arraySort(
    [...guilds, ...squads],
    [
      (a, b) => compareDesc(a.position.to ?? now, b.position.to ?? now),
      (a, b) => compareDesc(a.position.from, b.position.from),
    ],
  );
};

export const useUserActivity = (variables: UseUserActivity['variables']) => {
  const { data, loading, error, refetch } = useUserActivityQuery({ variables });

  return {
    loading,
    error,
    refetch,
    data: data?.user ? parseUserActivity(data.user) : [],
  };
};

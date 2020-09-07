import Listr from 'listr';
import { createConnection } from 'typeorm';

import { env } from '../../common/env';
import typeOrmConfig from '../../ormconfig';
import { seedChapters } from './chapters';
import { seedClans } from './clans';
import { seedGuilds } from './guilds';
import { seedPositions } from './positions';
import { seedSquads } from './squads';
import { seedUsers } from './users';

const initializeSeed = async () => {
  const connection = await createConnection(typeOrmConfig);

  await connection.dropDatabase();
  await connection.synchronize();
};

const seed = async () => {
  if (env.APP_ENV === 'production') {
    throw new Error('You cannot seed the production database!');
  }

  const tasks = new Listr([
    {
      title: 'Seed initialization',
      task: initializeSeed,
    },
    {
      title: 'Seeding root types',
      task: () =>
        new Listr(
          [
            {
              title: 'Seeding users (0/100)',
              task: seedUsers,
            },
            {
              title: 'Seeding guilds (0/5)',
              task: seedGuilds,
            },
            {
              title: 'Seeding squads (0/6)',
              task: seedSquads,
            },
          ],
          { concurrent: true },
        ),
    },
    {
      title: 'Seeding sub-teams',
      task: () =>
        new Listr(
          [
            {
              title: 'Seeding clans',
              task: seedClans,
            },
            {
              title: 'Seeding chapters',
              task: seedChapters,
            },
          ],
          { concurrent: true },
        ),
    },
    {
      title: 'Seeding positions (0/50)',
      task: seedPositions,
    },
  ]);

  return tasks.run().then(() => {
    process.exit(0);
  });
};

seed();

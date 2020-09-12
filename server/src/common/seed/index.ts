import Listr from 'listr';
import { Connection, createConnection } from 'typeorm';

import typeOrmConfig from '../../ormconfig';
import { env } from '../env';
import { seedChapters } from './chapters';
import { seedClans } from './clans';
import { seedGuilds } from './guilds';
import { seedPositions } from './positions';
import { seedSquads } from './squads';
import { seedUsers } from './users';

let connection: Connection;

const initializeSeed = async () => {
  connection = await createConnection(typeOrmConfig);

  await connection.dropDatabase();
  await connection.synchronize();
};

const endConnection = async () => {
  await connection.close();
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
    {
      title: 'Deconnecting database',
      task: endConnection,
    },
  ]);

  return tasks.run();
};

export default seed;

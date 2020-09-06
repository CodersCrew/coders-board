import Listr from 'listr';
import { createConnection } from 'typeorm';

import { env } from '../../common/env';
import typeOrmConfig from '../../ormconfig';
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
      task: () => initializeSeed(),
    },
    {
      title: 'Seeding users (0/100)',
      task: (ctx, task) => seedUsers(task),
    },
  ]);

  return tasks.run().then(() => {
    process.exit(0);
  });
};

seed();

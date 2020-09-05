import path from 'path';
import { ConnectionOptions } from 'typeorm';

import { env } from './common/env';

const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  url: env.DATABASE_URL,
  synchronize: env.DATABASE_SYNC,
  entities: [path.resolve(__dirname, '**/*.model{.ts,.js}')],
  migrations: [path.resolve(__dirname + 'migrations/**/*{.ts,.js}')],
  subscribers: [path.resolve(__dirname, '**/*.subscriber{.ts,.js}')],
  migrationsRun: !env.DATABASE_SYNC,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = typeOrmConfig;

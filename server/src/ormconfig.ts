import path from 'path';
import { ConnectionOptions } from 'typeorm';

import { env } from './common/env';

const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  url: env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: env.DATABASE_SYNC,
  entities: [path.resolve(__dirname, '**/*.model{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'common/migrations/*{.ts,.js}')],
  subscribers: [path.resolve(__dirname, '**/*.subscriber{.ts,.js}')],
  migrationsRun: !env.DATABASE_SYNC,
  cli: {
    migrationsDir: 'src/common/migrations',
  },
};

export = typeOrmConfig;

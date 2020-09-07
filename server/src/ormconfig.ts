import path from 'path';
import { ConnectionOptions } from 'typeorm';

import { env } from './common/env';

const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  url: env.DATABASE_URL,
  ssl: env.APP_ENV === 'local' ? false : { rejectUnauthorized: false },
  synchronize: env.APP_ENV !== 'production',
  entities: [path.resolve(__dirname, '**/*.model{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'common/migrations/*{.ts,.js}')],
  subscribers: [path.resolve(__dirname, '**/*.subscriber{.ts,.js}')],
  migrationsRun: env.APP_ENV === 'production',
  cli: {
    migrationsDir: 'src/common/migrations',
  },
};

export = typeOrmConfig;

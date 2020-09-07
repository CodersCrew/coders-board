import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { env } from './common/env';
import { GuildsModule } from './guilds/guilds.module';
import { IntegrationsModule } from './integrations/integrations.module';
import typeOrmConfig from './ormconfig';
import { PositionsModule } from './positions/positions.module';
import { ServicesModule } from './services/services.module';
import { SquadsModule } from './squads/squads.module';
import { SuccessesModule } from './successes/successes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      playground: env.APP_ENV !== 'production',
      context: ({ req }) => ({ req }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
      exclude: ['/auth/*', '/graphql'],
    }),
    UsersModule,
    AuthModule,
    PositionsModule,
    GuildsModule,
    SquadsModule,
    IntegrationsModule,
    SuccessesModule,
    ServicesModule,
  ],
  controllers: [],
})
export class AppModule {}

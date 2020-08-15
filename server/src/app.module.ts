import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { GsuiteModule } from './gsuite/gsuite.module';
import { GuildsModule } from './guilds/guilds.module';
import typeOrmConfig from './ormconfig';
import { PositionsModule } from './positions/positions.module';
import { SquadsModule } from './squads/squads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ user: req.user }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
    UsersModule,
    AuthModule,
    PositionsModule,
    GsuiteModule,
    GuildsModule,
    SquadsModule,
  ],
  controllers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { GsuiteModule } from './gsuite/gsuite.module';
import { MemberPositionsModule } from './member-positions/member-positions.module';
import { PositionsModule } from './positions/positions.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { TeamsModule } from './teams/teams.module';
import { TypeOrmConfigService } from './typeorm-config.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: false,
      context: ({ req }) => ({ user: req.user }),
    }),
    UsersModule,
    AuthModule,
    TeamsModule,
    TeamMembersModule,
    PositionsModule,
    MemberPositionsModule,
    GsuiteModule,
  ],
  controllers: [],
})
export class AppModule {}

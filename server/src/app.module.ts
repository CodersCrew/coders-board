import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { DateScalar } from './common/scalars/date.scalar';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { GsuiteModule } from './gsuite/gsuite.module';
import { PositionsModule } from './positions/positions.module';
import { SkillsModule } from './skills/skills.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { TeamsModule } from './teams/teams.module';
import { TypeOrmConfigService } from './typeorm-config.service';
import { UserPositionsModule } from './user-positions/user-positions.module';
import { UserSkillsModule } from './user-skills/user-skills.module';
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
    UserPositionsModule,
    SkillsModule,
    UserSkillsModule,
    GsuiteModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}

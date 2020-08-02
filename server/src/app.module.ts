import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ClansModule } from './clans/clans.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { GsuiteModule } from './gsuite/gsuite.module';
import { GuildMembersModule } from './guild-members/guild-members.module';
import { GuildPositionsModule } from './guild-positions/guild-positions.module';
import { GuildsModule } from './guilds/guilds.module';
import { PositionsModule } from './positions/positions.module';
import { SquadMembersModule } from './squad-members/squad-members.module';
import { SquadPositionsModule } from './squad-positions/squad-positions.module';
import { SquadsModule } from './squads/squads.module';
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
    PositionsModule,
    GsuiteModule,
    ChaptersModule,
    ClansModule,
    GuildsModule,
    GuildMembersModule,
    GuildPositionsModule,
    SquadsModule,
    SquadMembersModule,
    SquadPositionsModule,
  ],
  controllers: [],
})
export class AppModule {}

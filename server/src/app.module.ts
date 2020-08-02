import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { ChapterModule } from './chapter/chapter.module';
import { ClanModule } from './clan/clan.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { GsuiteModule } from './gsuite/gsuite.module';
import { GuildMemberModule } from './guild-member/guild-member.module';
import { GuildPositionModule } from './guild-position/guild-position.module';
import { GuildModule } from './guild/guild.module';
import { PositionsModule } from './positions/positions.module';
import { SquadMemberModule } from './squad-member/squad-member.module';
import { SquadPositionModule } from './squad-position/squad-position.module';
import { SquadModule } from './squad/squad.module';
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
    SquadMemberModule,
    SquadPositionModule,
    GuildPositionModule,
    GuildMemberModule,
    GuildModule,
    ClanModule,
    SquadModule,
    ChapterModule,
  ],
  controllers: [],
})
export class AppModule {}

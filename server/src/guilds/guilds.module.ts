import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GsuiteModule } from '../gsuite/gsuite.module';
import { ClansModule } from './clans/clans.module';
import { GuildMembersModule } from './guild-members/guild-members.module';
import { GuildPositionsModule } from './guild-positions/guild-positions.module';
import { Guild } from './guild.model';
import { GuildRepository } from './guild.repository';
import { GuildsResolver } from './guilds.resolver';
import { GuildsService } from './guilds.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guild, GuildRepository]),
    GsuiteModule,
    GuildMembersModule,
    GuildPositionsModule,
    ClansModule,
  ],
  providers: [GuildsService, GuildsResolver],
  exports: [GuildsService],
})
export class GuildsModule {}

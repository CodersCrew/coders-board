import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Guild } from './guild.model';
import { GuildRepository } from './guild.repository';
import { GuildsResolver } from './guilds.resolver';
import { GuildsService } from './guilds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guild, GuildRepository])],
  providers: [GuildsService, GuildsResolver],
})
export class GuildsModule {}

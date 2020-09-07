import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuildPositionRepository } from './guild-position.repository';
import { GuildPositionsResolver } from './guild-positions.resolver';
import { GuildPositionsService } from './guild-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildPositionRepository])],
  providers: [GuildPositionsService, GuildPositionsResolver],
  exports: [GuildPositionsService],
})
export class GuildPositionsModule {}

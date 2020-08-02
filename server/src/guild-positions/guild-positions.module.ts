import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuildPosition } from './guild-position.model';
import { GuildPositionRepository } from './guild-position.repository';
import { GuildPositionsResolver } from './guild-positions.resolver';
import { GuildPositionsService } from './guild-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildPosition, GuildPositionRepository])],
  providers: [GuildPositionsService, GuildPositionsResolver],
})
export class GuildPositionsModule {}

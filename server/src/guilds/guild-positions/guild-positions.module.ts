import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuildMemberRepository } from '../guild-members/guild-member.repository';
import { GuildPositionRepository } from './guild-position.repository';
import { GuildPositionsResolver } from './guild-positions.resolver';
import { GuildPositionsService } from './guild-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildPositionRepository, GuildMemberRepository])],
  providers: [GuildPositionsService, GuildPositionsResolver],
  exports: [GuildPositionsService],
})
export class GuildPositionsModule {}

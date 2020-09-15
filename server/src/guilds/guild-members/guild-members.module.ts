import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PositionRepository } from '../../positions/position.repository';
import { GuildMemberRepository } from './guild-member.repository';
import { GuildMembersResolver } from './guild-members.resolver';
import { GuildMembersService } from './guild-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildMemberRepository, PositionRepository])],
  providers: [GuildMembersService, GuildMembersResolver],
})
export class GuildMembersModule {}

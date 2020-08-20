import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegrationsModule } from '../..//integrations/integrations.module';
import { GuildPositionsModule } from '../guild-positions/guild-positions.module';
import { GuildMemberRepository } from './guild-member.repository';
import { GuildMembersResolver } from './guild-members.resolver';
import { GuildMembersService } from './guild-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildMemberRepository]), GuildPositionsModule, IntegrationsModule],
  providers: [GuildMembersService, GuildMembersResolver],
})
export class GuildMembersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuildMember } from './guild-member.model';
import { GuildMemberRepository } from './guild-member.repository';
import { GuildMembersResolver } from './guild-members.resolver';
import { GuildMembersService } from './guild-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildMember, GuildMemberRepository])],
  providers: [GuildMembersService, GuildMembersResolver],
})
export class GuildMembersModule {}

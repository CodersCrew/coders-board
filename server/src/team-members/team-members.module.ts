import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GsuiteModule } from '../gsuite/gsuite.module';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { TeamMember } from './team-member.model';
import { TeamMemberRepository } from './team-member.repository';
import { TeamMembersResolver } from './team-members.resolver';
import { TeamMembersService } from './team-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember, TeamMemberRepository]), GsuiteModule, UsersModule, TeamsModule],
  providers: [TeamMembersService, TeamMembersResolver],
})
export class TeamMembersModule {}

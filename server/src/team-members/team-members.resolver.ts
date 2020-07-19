import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '../common/guards/auth.guard';
import { Team } from '../teams/team.model';
import { User } from '../users/user.model';
import { CreateTeamMemberInput } from './dto/create-team-member.input';
import { GetTeamMembersArgs } from './dto/get-team-members.args';
import { TeamMember } from './team-member.model';
import { TeamMembersService } from './team-members.service';

@Resolver(of => TeamMember)
@UseGuards(AuthGuard)
export class TeamMembersResolver {
  constructor(private teamMembersService: TeamMembersService) {}

  @ResolveField('team', returns => Team)
  async getTeam(@Parent() teamMember: TeamMember) {
    return this.teamMembersService.getTeam(teamMember.id);
  }

  @ResolveField('user', returns => User)
  async getUser(@Parent() teamMember: TeamMember) {
    return this.teamMembersService.getUser(teamMember.id);
  }

  @Query(returns => [TeamMember], { name: 'teamMembers' })
  getTeamMembers(@Args() args?: GetTeamMembersArgs) {
    return this.teamMembersService.findAll(args);
  }

  @Mutation(returns => TeamMember)
  createTeamMember(@Args('data') input: CreateTeamMemberInput) {
    return this.teamMembersService.create(input);
  }

  @Mutation(returns => Boolean)
  deleteTeamMember(@Args('id') teamMemberId: string) {
    return this.teamMembersService.delete(teamMemberId);
  }
}

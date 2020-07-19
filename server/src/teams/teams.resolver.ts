import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AdminGuard } from '../common/guards/admin.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateTeamInput } from './dto/create-team.input';
import { GetTeamsArgs } from './dto/get-teams.args';
import { Team } from './team.model';
import { TeamsService } from './teams.service';

@Resolver(of => Team)
@UseGuards(AuthGuard)
export class TeamsResolver {
  constructor(private teamsService: TeamsService) {}

  @ResolveField('parent', returns => Team, { nullable: true })
  async getParent(@Parent() team: Team) {
    return this.teamsService.getParent(team.id);
  }

  @ResolveField('children', returns => [Team])
  getChildren(@Parent() team: Team) {
    return this.teamsService.getChildren(team.id);
  }

  @ResolveField('positions', returns => [Team])
  getPositions(@Parent() team: Team) {
    return this.teamsService.getPositions(team.id);
  }

  @ResolveField('members', returns => [Team])
  getMembers(@Parent() team: Team) {
    return this.teamsService.getMembers(team.id);
  }

  @Query(returns => [Team], { name: 'teams' })
  getTeams(@Args() args?: GetTeamsArgs) {
    return this.teamsService.findAll(args);
  }

  @Mutation(returns => Team)
  @UseGuards(AdminGuard)
  createTeam(@Args('data') input: CreateTeamInput) {
    return this.teamsService.create(input);
  }

  @Mutation(returns => Boolean)
  @UseGuards(AdminGuard)
  deleteTeam(@Args('id') teamId: string) {
    return this.teamsService.delete(teamId);
  }
}

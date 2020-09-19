import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { TeamKind } from '../../common/decorators';
import { TeamRole } from '../../common/enums';
import { TeamRoleGuard } from '../../common/guards';
import { User } from '../../users/user.model';
import { SquadPosition } from '../squad-positions/squad-position.model';
import { Squad } from '../squad.model';
import { CreateSquadMemberInput } from './dto/create-squad-member.input';
import { GetSquadMembersArgs } from './dto/get-squad-members.args';
import { UpdateSquadMemberInput } from './dto/update-squad-member.input';
import { SquadMember } from './squad-member.model';
import { SquadMembersService } from './squad-members.service';

@Resolver(of => SquadMember)
@TeamKind('squad')
export class SquadMembersResolver {
  constructor(private readonly squadMembersService: SquadMembersService) {}

  @ResolveField('positions', returns => [SquadPosition])
  async getPositions(@Parent() squadMember: SquadMember, @Args('active', { nullable: true }) active?: boolean) {
    return this.squadMembersService.getPositions(squadMember, active);
  }

  @ResolveField('user', returns => User)
  async getUser(@Parent() squadMember: SquadMember) {
    return this.squadMembersService.getUser(squadMember);
  }

  @ResolveField('squad', returns => Squad)
  async getSquad(@Parent() squadMember: SquadMember) {
    return this.squadMembersService.getSquad(squadMember);
  }

  @Query(returns => [SquadMember], { name: 'squadMembers' })
  getSquadMembers(@Args() args: GetSquadMembersArgs) {
    return this.squadMembersService.findAll(args);
  }

  @Mutation(returns => SquadMember)
  @TeamRoleGuard(TeamRole.OWNER, 'data.squadId')
  createSquadMember(@Args('data') input: CreateSquadMemberInput) {
    return this.squadMembersService.create(input);
  }

  @Mutation(returns => SquadMember)
  @TeamRoleGuard(TeamRole.OWNER, 'data.squadId')
  updateSquadMember(@Args('data') input: UpdateSquadMemberInput) {
    return this.squadMembersService.update(input);
  }
}

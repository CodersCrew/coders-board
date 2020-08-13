import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamRole } from 'src/common/enums/team-role.enum';
import { TeamRoleGuard } from 'src/common/guards/team-role.guard';

import { TeamKind } from '../../common/decorators/team-kind.decorator';
import { AuthorizedGuard } from '../../common/guards/authorized.guard';
import { User } from '../../users/user.model';
import { SquadPosition } from '../squad-positions/squad-position.model';
import { Squad } from '../squad.model';
import { CreateSquadMemberInput } from './dto/create-squad-member.input';
import { DeleteSquadMemberArgs } from './dto/delete-squad-member.args';
import { GetSquadMembersArgs } from './dto/get-squad-members.args';
import { UpdateSquadMemberInput } from './dto/update-squad-member.input';
import { SquadMember } from './squad-member.model';
import { SquadMembersService } from './squad-members.service';

@Resolver(of => SquadMember)
@TeamKind('squad')
@AuthorizedGuard()
export class SquadMembersResolver {
  constructor(private readonly squadMembersService: SquadMembersService) {}

  @ResolveField('user', returns => User)
  async getUser(@Parent() squadMember: SquadMember) {
    return this.squadMembersService.getUser(squadMember.id);
  }

  @ResolveField('squad', returns => Squad)
  async getSquad(@Parent() squadMember: SquadMember) {
    return this.squadMembersService.getSquad(squadMember.id);
  }

  @ResolveField('positions', returns => [SquadPosition])
  async getPositions(@Parent() squadMember: SquadMember, @Args('active', { nullable: true }) active?: boolean) {
    return this.squadMembersService.getPositions(squadMember.id, active);
  }

  @Query(returns => [SquadMember], { name: 'squadMembers' })
  getSquadMembers(@Args() args?: GetSquadMembersArgs) {
    return this.squadMembersService.findAll(args);
  }

  @Mutation(returns => SquadMember)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.squadId')
  createSquadMember(@Args('data') input: CreateSquadMemberInput) {
    return this.squadMembersService.create(input);
  }

  @Mutation(returns => SquadMember)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.squadId')
  updateSquadMember(@Args('data') input: UpdateSquadMemberInput) {
    return this.squadMembersService.update(input);
  }

  @Mutation(returns => Boolean)
  @TeamRoleGuard(TeamRole.MANAGER, 'squadId')
  deleteSquadMember(@Args() args: DeleteSquadMemberArgs) {
    return this.squadMembersService.delete(args.id);
  }
}
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { SquadPosition } from '../squad-positions/squad-position.model';
import { Squad } from '../squads/squad.model';
import { User } from '../users/user.model';
import { CreateSquadMemberInput } from './dto/create-squad-member.input';
import { DeleteSquadMemberArgs } from './dto/delete-squad-member.args';
import { GetSquadMembersArgs } from './dto/get-squad-members.args';
import { UpdateSquadMemberInput } from './dto/update-squad-member.input';
import { SquadMember } from './squad-member.model';
import { SquadMembersService } from './squad-members.service';

@Resolver(of => SquadMember)
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

  @ResolveField('positions', returns => SquadPosition)
  async getPositions(@Parent() squadMember: SquadMember) {
    return this.squadMembersService.getPositions(squadMember.id);
  }

  @Query(returns => [SquadMember], { name: 'squadMembers' })
  getSquadMembers(@Args() args?: GetSquadMembersArgs) {
    return this.squadMembersService.findAll(args);
  }

  @Mutation(returns => SquadMember)
  createSquadMember(@Args('data') input: CreateSquadMemberInput) {
    return this.squadMembersService.create(input);
  }

  @Mutation(returns => SquadMember)
  updateSquadMember(@Args('data') input: UpdateSquadMemberInput) {
    return this.squadMembersService.update(input);
  }

  @Mutation(returns => Boolean)
  deleteSquadMember(@Args() args: DeleteSquadMemberArgs) {
    return this.squadMembersService.delete(args.id);
  }
}

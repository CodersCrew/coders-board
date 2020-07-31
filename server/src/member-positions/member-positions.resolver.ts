import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Position } from '../positions/position.model';
import { TeamMember } from '../team-members/team-member.model';
import { CreateMemberPositionInput } from './dto/create-member-position.input';
import { GetMemberPositionsArgs } from './dto/get-member-positions.args';
import { UpdateMemberPositionInput } from './dto/update-member-position.input';
import { MemberPosition } from './member-position.model';
import { MemberPositionsService } from './member-positions.service';

@Resolver(of => MemberPosition)
export class MemberPositionsResolver {
  constructor(private memberPositionsService: MemberPositionsService) {}

  @ResolveField('position', returns => Position)
  async getPosition(@Parent() memberPosition: MemberPosition) {
    return this.memberPositionsService.getPosition(memberPosition.id);
  }

  @ResolveField('teamMember', returns => TeamMember)
  async getTeamMember(@Parent() memberPosition: MemberPosition) {
    return this.memberPositionsService.getTeamMember(memberPosition.id);
  }

  @Query(returns => [MemberPosition], { name: 'memberPositions' })
  getMemberPositions(@Args() args?: GetMemberPositionsArgs) {
    return this.memberPositionsService.findAll(args);
  }

  @Mutation(returns => MemberPosition)
  createMemberPosition(@Args('data') input: CreateMemberPositionInput) {
    return this.memberPositionsService.create(input);
  }

  @Mutation(returns => MemberPosition)
  updateMemberPosition(@Args('data') input: UpdateMemberPositionInput) {
    return this.memberPositionsService.update(input);
  }

  @Mutation(returns => Boolean)
  deleteMemberPosition(@Args('id', { type: () => ID }) memberPositionId: string) {
    return this.memberPositionsService.delete(memberPositionId);
  }
}

import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { TeamKind } from '../../common/decorators/team-kind.decorator';
import { TeamRole } from '../../common/enums/team-role.enum';
import { AuthorizedGuard } from '../../common/guards/authorized.guard';
import { TeamRoleGuard } from '../../common/guards/team-role.guard';
import { Chapter } from '../chapters/chapter.model';
import { SquadMember } from '../squad-members/squad-member.model';
import { CreateSquadPositionInput } from './dto/create-squad-position.input';
import { DeleteSquadPositionArgs } from './dto/delete-squad-position.args';
import { GetSquadPositionsArgs } from './dto/get-squad-positions.args';
import { UpdateSquadPositionInput } from './dto/update-squad-position.input';
import { SquadPosition } from './squad-position.model';
import { SquadPositionsService } from './squad-positions.service';

@Resolver(of => SquadPosition)
@TeamKind('squad')
@AuthorizedGuard()
export class SquadPositionsResolver {
  constructor(private readonly squadPositionsService: SquadPositionsService) {}

  @ResolveField('member', returns => SquadMember)
  async getMember(@Parent() squadPosition: SquadPosition) {
    return this.squadPositionsService.getMember(squadPosition.id);
  }

  @ResolveField('clan', returns => Chapter, { nullable: true })
  async getChapter(@Parent() squadPosition: SquadPosition) {
    return this.squadPositionsService.getChapter(squadPosition.id);
  }

  @Query(returns => [SquadPosition], { name: 'squadPositions' })
  getSquadPositions(@Args() args?: GetSquadPositionsArgs) {
    return this.squadPositionsService.findAll(args);
  }

  @Mutation(returns => SquadPosition)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.squadId')
  createSquadPosition(@Args('data') input: CreateSquadPositionInput) {
    return this.squadPositionsService.create(input);
  }

  @Mutation(returns => SquadPosition)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.squadId')
  updateSquadPosition(@Args('data') input: UpdateSquadPositionInput) {
    return this.squadPositionsService.update(input);
  }

  @Mutation(returns => Boolean)
  @TeamRoleGuard(TeamRole.MANAGER, 'squadId')
  deleteSquadPosition(@Args() args: DeleteSquadPositionArgs) {
    return this.squadPositionsService.delete(args.id);
  }
}

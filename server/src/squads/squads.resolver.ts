import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { TeamKind } from '../common/decorators';
import { TeamRole } from '../common/enums';
import { AdminGuard, TeamRoleGuard } from '../common/guards';
import { Chapter } from './chapters/chapter.model';
import { CreateSquadInput } from './dto/create-squad.input';
import { DeleteSquadArgs } from './dto/delete-squad.args';
import { GetSquadArgs } from './dto/get-squad.args';
import { GetSquadsArgs } from './dto/get-squads.args';
import { UpdateSquadInput } from './dto/update-squad.input';
import { SquadMember } from './squad-members/squad-member.model';
import { Squad } from './squad.model';
import { SquadsService } from './squads.service';

@Resolver(of => Squad)
@TeamKind('squad')
export class SquadsResolver {
  constructor(private readonly squadsService: SquadsService) {}

  @ResolveField('chapters', returns => [Chapter])
  getChapters(@Parent() squad: Squad) {
    return this.squadsService.getChapters(squad);
  }

  @ResolveField('members', returns => [SquadMember])
  getMembers(@Parent() squad: Squad) {
    return this.squadsService.getMembers(squad);
  }

  @Query(returns => [Squad], { name: 'squads' })
  getSquads(@Args() args?: GetSquadsArgs) {
    return this.squadsService.findAll(args);
  }

  @Query(returns => Squad, { name: 'squad' })
  getSquad(@Args() args: GetSquadArgs) {
    return this.squadsService.findByIdOrThrow(args.id);
  }

  @Mutation(returns => Squad)
  @AdminGuard()
  createSquad(@Args('data') input: CreateSquadInput) {
    return this.squadsService.create(input);
  }

  @Mutation(returns => Squad)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.id')
  updateSquad(@Args('data') input: UpdateSquadInput) {
    return this.squadsService.update(input);
  }

  @Mutation(returns => Boolean)
  @TeamRoleGuard(TeamRole.OWNER, 'id')
  deleteSquad(@Args() args: DeleteSquadArgs) {
    return this.squadsService.delete(args.id);
  }
}

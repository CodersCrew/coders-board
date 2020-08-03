import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Chapter } from '../chapters/chapter.model';
import { SquadMember } from '../squad-members/squad-member.model';
import { CreateSquadInput } from './dto/create-squad.input';
import { DeleteSquadArgs } from './dto/delete-squad.args';
import { GetSquadArgs } from './dto/get-squad.args';
import { GetSquadsArgs } from './dto/get-squads.args';
import { UpdateSquadInput } from './dto/update-squad.input';
import { Squad } from './squad.model';
import { SquadsService } from './squads.service';

@Resolver(of => Squad)
export class SquadsResolver {
  constructor(private readonly squadsService: SquadsService) {}

  @ResolveField('chapters', returns => [Chapter])
  async getChapters(@Parent() squad: Squad) {
    return this.squadsService.getChapters(squad.id);
  }

  @ResolveField('members', returns => [SquadMember])
  getMembers(@Parent() squad: Squad) {
    return this.squadsService.getMembers(squad.id);
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
  createSquad(@Args('data') input: CreateSquadInput) {
    return this.squadsService.create(input);
  }

  @Mutation(returns => Squad)
  updateSquad(@Args('data') input: UpdateSquadInput) {
    return this.squadsService.update(input);
  }

  @Mutation(returns => Boolean)
  deleteSquad(@Args() args: DeleteSquadArgs) {
    return this.squadsService.delete(args.id);
  }
}

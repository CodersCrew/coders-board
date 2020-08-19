import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Clan } from '../guilds/clans/clan.model';
import { Guild } from '../guilds/guild.model';
import { CreatePositionInput } from './dto/create-position.input';
import { DeletePositionArgs } from './dto/delete-position.args';
import { GetPositionsArgs } from './dto/get-positions.args';
import { UpdatePositionInput } from './dto/update-position.input';
import { Position } from './position.model';
import { PositionsService } from './positions.service';

@Resolver(of => Position)
export class PositionsResolver {
  constructor(private positionsService: PositionsService) {}

  @ResolveField('guild', returns => Guild, { nullable: true })
  async getGuild(@Parent() position: Position) {
    return this.positionsService.getGuild(position);
  }

  @ResolveField('clan', returns => Clan, { nullable: true })
  async getClan(@Parent() position: Position) {
    return this.positionsService.getClan(position);
  }

  @Query(returns => [Position], { name: 'positions' })
  getPositions(@Args() args?: GetPositionsArgs) {
    return this.positionsService.findAll(args);
  }

  @Mutation(returns => Position)
  createPosition(@Args('data') input: CreatePositionInput) {
    return this.positionsService.create(input);
  }

  @Mutation(returns => Position)
  updatePosition(@Args('data') input: UpdatePositionInput) {
    return this.positionsService.update(input);
  }

  @Mutation(returns => Boolean)
  deletePosition(@Args() args: DeletePositionArgs) {
    return this.positionsService.delete(args.id);
  }
}

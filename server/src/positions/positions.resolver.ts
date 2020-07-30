import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '../common/guards/auth.guard';
import { CreatePositionInput } from './dto/create-position.input';
import { GetPositionsArgs } from './dto/get-positions.args';
import { UpdatePositionInput } from './dto/update-position.input';
import { Position } from './position.model';
import { PositionsService } from './positions.service';

@Resolver(of => Position)
@UseGuards(AuthGuard)
export class PositionsResolver {
  constructor(private positionsService: PositionsService) {}

  @ResolveField('team', returns => Position, { nullable: true })
  async getTeam(@Parent() position: Position) {
    return this.positionsService.getTeam(position.id);
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
  deletePosition(@Args('id', { type: () => ID }) positionId: string) {
    return this.positionsService.delete(positionId);
  }
}

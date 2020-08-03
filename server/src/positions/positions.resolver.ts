import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '../common/guards/auth.guard';
import { CreatePositionInput } from './dto/create-position.input';
import { DeletePositionArgs } from './dto/delete-position.args';
import { GetPositionsArgs } from './dto/get-positions.args';
import { UpdatePositionInput } from './dto/update-position.input';
import { Area, Position } from './position.model';
import { PositionsService } from './positions.service';

@Resolver(of => Position)
@UseGuards(AuthGuard)
export class PositionsResolver {
  constructor(private positionsService: PositionsService) {}

  @ResolveField('area', returns => Area, { nullable: true })
  async getArea(@Parent() position: Position) {
    return this.positionsService.getArea(position.id);
  }

  @ResolveField('image', returns => String, { nullable: true })
  async getImage(@Parent() position: Position) {
    return this.positionsService.getImage(position.id);
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

import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

import { AuthGuard } from '../common/guards/auth.guard';
import { Position } from './position.model';
import { PositionsService } from './positions.service';

@Resolver(of => Position)
@UseGuards(AuthGuard)
export class PositionsResolver {
  constructor(private positionsService: PositionsService) {}
}

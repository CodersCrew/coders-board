import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Position } from './position.model';
import { PositionRepository } from './position.repository';
import { PositionsResolver } from './positions.resolver';
import { PositionsService } from './positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Position, PositionRepository])],
  providers: [PositionsService, PositionsResolver],
})
export class PositionsModule {}

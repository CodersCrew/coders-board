import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SquadPosition } from './squad-position.model';
import { SquadPositionRepository } from './squad-position.repository';
import { SquadPositionsResolver } from './squad-positions.resolver';
import { SquadPositionsService } from './squad-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadPosition, SquadPositionRepository])],
  providers: [SquadPositionsService, SquadPositionsResolver],
})
export class SquadPositionsModule {}

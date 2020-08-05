import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GsuiteModule } from '../gsuite/gsuite.module';
import { SquadPosition } from './squad-position.model';
import { SquadPositionRepository } from './squad-position.repository';
import { SquadPositionsResolver } from './squad-positions.resolver';
import { SquadPositionsService } from './squad-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadPosition, SquadPositionRepository]), GsuiteModule],
  providers: [SquadPositionsService, SquadPositionsResolver],
})
export class SquadPositionsModule {}

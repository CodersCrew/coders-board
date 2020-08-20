import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegrationsModule } from '../../integrations/integrations.module';
import { SquadPositionRepository } from './squad-position.repository';
import { SquadPositionsResolver } from './squad-positions.resolver';
import { SquadPositionsService } from './squad-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadPositionRepository]), IntegrationsModule],
  providers: [SquadPositionsService, SquadPositionsResolver],
})
export class SquadPositionsModule {}

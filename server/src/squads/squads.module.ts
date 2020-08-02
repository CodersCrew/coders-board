import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Squad } from './squad.model';
import { SquadRepository } from './squad.repository';
import { SquadsResolver } from './squads.resolver';
import { SquadsService } from './squads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Squad, SquadRepository])],
  providers: [SquadsService, SquadsResolver],
})
export class SquadsModule {}

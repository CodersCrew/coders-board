import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChaptersModule } from './chapters/chapters.module';
import { SquadMembersModule } from './squad-members/squad-members.module';
import { SquadPositionsModule } from './squad-positions/squad-positions.module';
import { SquadRepository } from './squad.repository';
import { SquadsResolver } from './squads.resolver';
import { SquadsService } from './squads.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadRepository]), ChaptersModule, SquadMembersModule, SquadPositionsModule],
  providers: [SquadsService, SquadsResolver],
  exports: [SquadsService],
})
export class SquadsModule {}

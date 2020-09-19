import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SquadMemberRepository } from '../squad-members/squad-member.repository';
import { SquadPositionRepository } from './squad-position.repository';
import { SquadPositionsResolver } from './squad-positions.resolver';
import { SquadPositionsService } from './squad-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadPositionRepository, SquadMemberRepository])],
  providers: [SquadPositionsService, SquadPositionsResolver],
})
export class SquadPositionsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PositionRepository } from '../../positions/position.repository';
import { SquadMemberRepository } from './squad-member.repository';
import { SquadMembersResolver } from './squad-members.resolver';
import { SquadMembersService } from './squad-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadMemberRepository, PositionRepository])],
  providers: [SquadMembersService, SquadMembersResolver],
})
export class SquadMembersModule {}

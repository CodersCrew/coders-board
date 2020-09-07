import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SquadMemberRepository } from './squad-member.repository';
import { SquadMembersResolver } from './squad-members.resolver';
import { SquadMembersService } from './squad-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadMemberRepository])],
  providers: [SquadMembersService, SquadMembersResolver],
})
export class SquadMembersModule {}

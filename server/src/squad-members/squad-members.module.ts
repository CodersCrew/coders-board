import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SquadMember } from './squad-member.model';
import { SquadMemberRepository } from './squad-member.repository';
import { SquadMembersResolver } from './squad-members.resolver';
import { SquadMembersService } from './squad-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadMember, SquadMemberRepository])],
  providers: [SquadMembersService, SquadMembersResolver],
})
export class SquadMembersModule {}

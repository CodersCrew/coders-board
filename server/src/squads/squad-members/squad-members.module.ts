import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegrationsModule } from '../../integrations/integrations.module';
import { SquadMemberRepository } from './squad-member.repository';
import { SquadMembersResolver } from './squad-members.resolver';
import { SquadMembersService } from './squad-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadMemberRepository]), IntegrationsModule],
  providers: [SquadMembersService, SquadMembersResolver],
})
export class SquadMembersModule {}

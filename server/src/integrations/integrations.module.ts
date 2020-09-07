import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../users/user.repository';
import { GsuiteModule } from './gsuite/gsuite.module';
import { GsuiteService } from './gsuite/gsuite.service';
import { SlackModule } from './slack/slack.module';
import { SlackService } from './slack/slack.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), GsuiteModule, SlackModule],
  providers: [GsuiteService, SlackService],
  exports: [GsuiteService, SlackService],
})
export class IntegrationsModule {}

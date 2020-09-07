import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../../users/user.repository';
import { SlackResolver } from './slack.resolver';
import { SlackService } from './slack.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [SlackService, SlackResolver],
  exports: [SlackService],
})
export class SlackModule {}

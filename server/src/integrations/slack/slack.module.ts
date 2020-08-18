import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../../users/user.repository';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { SlackResolver } from './slack.resolver';
import { SlackService } from './slack.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), CloudinaryModule],
  providers: [SlackService, SlackResolver],
  exports: [SlackService],
})
export class SlackModule {}

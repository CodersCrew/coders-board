import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../users/user.repository';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { GsuiteModule } from './gsuite/gsuite.module';
import { GsuiteService } from './gsuite/gsuite.service';
import { SlackModule } from './slack/slack.module';
import { SlackService } from './slack/slack.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), GsuiteModule, SlackModule, CloudinaryModule],
  providers: [GsuiteService, SlackService, CloudinaryService],
  exports: [GsuiteService, SlackService, CloudinaryService],
})
export class IntegrationsModule {}

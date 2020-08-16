import { Module } from '@nestjs/common';

import { CloudinaryService } from './cloudinary/cloudinary.service';
import { GsuiteService } from './gsuite/gsuite.service';
import { SlackService } from './slack/slack.service';

@Module({
  providers: [GsuiteService, SlackService, CloudinaryService],
  exports: [GsuiteService, SlackService, CloudinaryService],
})
export class IntegrationsModule {}

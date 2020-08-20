import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegrationsModule } from '../../integrations/integrations.module';
import { ChapterRepository } from './chapter.repository';
import { ChaptersResolver } from './chapters.resolver';
import { ChaptersService } from './chapters.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterRepository]), IntegrationsModule],
  providers: [ChaptersService, ChaptersResolver],
})
export class ChaptersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chapter } from './chapter.model';
import { ChapterRepository } from './chapter.repository';
import { ChaptersResolver } from './chapters.resolver';
import { ChaptersService } from './chapters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, ChapterRepository])],
  providers: [ChaptersService, ChaptersResolver],
})
export class ChaptersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChapterRepository } from './chapter.repository';
import { ChaptersResolver } from './chapters.resolver';
import { ChaptersService } from './chapters.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterRepository])],
  providers: [ChaptersService, ChaptersResolver],
})
export class ChaptersModule {}

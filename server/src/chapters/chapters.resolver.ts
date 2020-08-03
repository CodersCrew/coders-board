import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '../common/guards/auth.guard';
import { SquadPosition } from '../squad-positions/squad-position.model';
import { Squad } from '../squads/squad.model';
import { Chapter } from './chapter.model';
import { ChaptersService } from './chapters.service';
import { CreateChapterInput } from './dto/create-chapter.input';
import { DeleteChapterArgs } from './dto/delete-chapter.args';
import { GetChapterArgs } from './dto/get-chapter.args';
import { GetChaptersArgs } from './dto/get-chapters.args';
import { UpdateChapterInput } from './dto/update-chapter.input';

@Resolver(of => Chapter)
@UseGuards(AuthGuard)
export class ChaptersResolver {
  constructor(private readonly chaptersService: ChaptersService) {}

  @ResolveField('squad', returns => [Squad])
  async getSquad(@Parent() chapter: Chapter) {
    return this.chaptersService.getSquad(chapter.id);
  }

  @ResolveField('positions', returns => [SquadPosition])
  getPositions(@Parent() chapter: Chapter) {
    return this.chaptersService.getPositions(chapter.id);
  }

  @Query(returns => [Chapter], { name: 'chapters' })
  getChapters(@Args() args?: GetChaptersArgs) {
    return this.chaptersService.findAll(args);
  }

  @Query(returns => Chapter, { name: 'chapter' })
  getChapter(@Args() args: GetChapterArgs) {
    return this.chaptersService.findByIdOrThrow(args.id);
  }

  @Mutation(returns => Chapter)
  createChapter(@Args('data') input: CreateChapterInput) {
    return this.chaptersService.create(input);
  }

  @Mutation(returns => Chapter)
  updateChapter(@Args('data') input: UpdateChapterInput) {
    return this.chaptersService.update(input);
  }

  @Mutation(returns => Boolean)
  deleteChapter(@Args() args: DeleteChapterArgs) {
    return this.chaptersService.delete(args.id);
  }
}

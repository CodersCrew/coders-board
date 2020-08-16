import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { TeamKind } from '../../common/decorators/team-kind.decorator';
import { TeamRole } from '../../common/enums/team-role.enum';
import { AuthorizedGuard } from '../../common/guards/authorized.guard';
import { TeamRoleGuard } from '../../common/guards/team-role.guard';
import { SquadPosition } from '../squad-positions/squad-position.model';
import { Squad } from '../squad.model';
import { Chapter } from './chapter.model';
import { ChaptersService } from './chapters.service';
import { CreateChapterInput } from './dto/create-chapter.input';
import { DeleteChapterArgs } from './dto/delete-chapter.args';
import { GetChapterArgs } from './dto/get-chapter.args';
import { GetChaptersArgs } from './dto/get-chapters.args';
import { UpdateChapterInput } from './dto/update-chapter.input';

@Resolver(of => Chapter)
@TeamKind('squad')
@AuthorizedGuard()
export class ChaptersResolver {
  constructor(private readonly chaptersService: ChaptersService) {}

  @ResolveField('squad', returns => [Squad])
  async getSquad(@Parent() chapter: Chapter) {
    return this.chaptersService.getSquad(chapter);
  }

  @ResolveField('positions', returns => [SquadPosition])
  getPositions(@Parent() chapter: Chapter, @Args('active', { nullable: true }) active?: boolean) {
    return this.chaptersService.getPositions(chapter, active);
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
  @TeamRoleGuard(TeamRole.MANAGER, 'data.squadId')
  createChapter(@Args('data') input: CreateChapterInput) {
    return this.chaptersService.create(input);
  }

  @Mutation(returns => Chapter)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.squadId')
  updateChapter(@Args('data') input: UpdateChapterInput) {
    return this.chaptersService.update(input);
  }

  @Mutation(returns => Boolean)
  @TeamRoleGuard(TeamRole.MANAGER, 'squadId')
  deleteChapter(@Args() args: DeleteChapterArgs) {
    return this.chaptersService.delete(args.id);
  }
}

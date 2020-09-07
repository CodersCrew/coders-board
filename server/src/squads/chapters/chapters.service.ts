import { ConflictException, Injectable } from '@nestjs/common';

import { brackets, resolveAsyncRelation } from '../../common/utils';
import { Chapter } from './chapter.model';
import { ChapterRepository } from './chapter.repository';
import { CreateChapterInput } from './dto/create-chapter.input';
import { GetChaptersArgs } from './dto/get-chapters.args';
import { UpdateChapterInput } from './dto/update-chapter.input';

@Injectable()
export class ChaptersService {
  constructor(private readonly chapterRepository: ChapterRepository) {}

  getSquad = resolveAsyncRelation(this.chapterRepository, 'squad');

  async getPositions(chapter: Chapter, isActive?: boolean) {
    const positions = await resolveAsyncRelation(this.chapterRepository, 'positions')(chapter);

    if (typeof isActive !== 'undefined') {
      return positions.filter(position => (isActive ? !position.to : position.to));
    }

    return positions;
  }

  findAll({ search, squadId }: GetChaptersArgs) {
    const query = this.chapterRepository.createQueryBuilder('chapter');

    if (squadId) {
      query.andWhere('chapter.squadId = :squadId', { squadId });
    }

    if (search) {
      const searchQuery = brackets(
        ['chapter.name LIKE :search', 'chapter.email LIKE :search', 'chapter.description LIKE :search'].join(' OR '),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    return query.getMany();
  }

  create(input: CreateChapterInput) {
    return this.chapterRepository.save(input);
  }

  async update({ id, ...input }: UpdateChapterInput) {
    const chapter = await this.chapterRepository.findOneOrFail(id);

    return this.chapterRepository.save({ ...chapter, ...input });
  }

  async delete(id: string) {
    const chapter = await this.chapterRepository.findOneOrFail(id, { relations: ['positions'] });

    if (chapter.positions.length) {
      throw new ConflictException('You cannot remove a chapter with positions');
    }

    await this.chapterRepository.remove(chapter);

    return true;
  }
}

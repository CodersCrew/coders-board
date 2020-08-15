import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual, pick } from 'lodash';

import { resolveAsyncRelation } from '../../common/utils';
import { brackets } from '../../common/utils/brackets';
import { GsuiteService } from '../../gsuite/gsuite.service';
import { UpdateGroupParams } from '../../gsuite/interfaces/update-group.params';
import { Chapter } from './chapter.model';
import { ChapterRepository } from './chapter.repository';
import { CreateChapterInput } from './dto/create-chapter.input';
import { GetChaptersArgs } from './dto/get-chapters.args';
import { UpdateChapterInput } from './dto/update-chapter.input';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(ChapterRepository)
    private readonly chapterRepository: ChapterRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  getSquad = resolveAsyncRelation<Chapter, 'squad'>('squad', this.findByIdOrThrow);

  getPositions = resolveAsyncRelation<Chapter, 'positions'>('positions', this.findByIdOrThrow);

  findById(id: string): Promise<Chapter | null> {
    if (!id) return null;

    return this.chapterRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<Chapter> {
    if (!id) throw new BadRequestException();

    return this.chapterRepository.findOneOrFail(id);
  }

  findAll({ search, squadId }: GetChaptersArgs): Promise<Chapter[]> {
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

  async create(input: CreateChapterInput): Promise<Chapter> {
    const googleId = await this.gsuiteService.createGroup(input);
    const chapter = await this.chapterRepository.save({ ...input, googleId });
    const squad = await this.getSquad(chapter);

    await this.gsuiteService.updateGroup({ ...input, name: `${squad.name} | ${chapter.name}`, id: googleId });

    return chapter;
  }

  async update({ id, ...input }: UpdateChapterInput): Promise<Chapter> {
    const chapter = await this.findByIdOrThrow(id);

    const googlePropNames: (keyof Omit<UpdateGroupParams, 'id'>)[] = ['name', 'description', 'email'];

    if (!isEqual(pick(input, googlePropNames), pick(chapter, googlePropNames))) {
      const squad = await this.getSquad(chapter);

      await this.gsuiteService.updateGroup({ ...input, id: chapter.googleId, name: `${squad.name} | ${input.name}` });
    }

    return this.chapterRepository.save({ ...chapter, ...input });
  }

  async delete(id: string): Promise<boolean> {
    const chapter = await this.findByIdOrThrow(id);

    const positions = await chapter.positions;

    if (positions.length) {
      throw new ConflictException('You cannot remove a chapter with positions');
    }

    await this.gsuiteService.deleteGroup({ id: chapter.googleId });
    await this.chapterRepository.delete(id);

    return true;
  }
}

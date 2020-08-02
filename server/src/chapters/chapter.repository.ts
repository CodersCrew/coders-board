import { EntityRepository, Repository } from 'typeorm';

import { Chapter } from './chapter.model';

@EntityRepository(Chapter)
export class ChapterRepository extends Repository<Chapter> {}

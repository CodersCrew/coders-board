import faker from 'faker';
import { random } from 'lodash';
import { getCustomRepository } from 'typeorm';

import { ChapterRepository } from '../../squads/chapters/chapter.repository';
import { Squad } from '../../squads/squad.model';
import { getDepartmentNames } from './seed.utils';

export const seedChapters = async (ctx: any) => {
  const chapterRepository = getCustomRepository(ChapterRepository);

  const squads = ctx.squads as Squad[];

  if (!squads) {
    throw new Error('No squads passed in context');
  }

  const chapterPromises = squads.flatMap(squad => {
    const departmentsCount = random(2, 6);
    const departmentNames = getDepartmentNames(departmentsCount);

    return departmentNames.map(name => {
      return chapterRepository.save({
        name,
        description: faker.lorem.sentences(4),
        squadId: squad.id,
      });
    });
  });

  ctx.chapters = await Promise.all(chapterPromises);
};

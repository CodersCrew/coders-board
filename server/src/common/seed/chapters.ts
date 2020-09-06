import faker from 'faker';
import { random, shuffle, times } from 'lodash';
import { getCustomRepository } from 'typeorm';

import { ChapterRepository } from '../../squads/chapters/chapter.repository';
import { Squad } from '../../squads/squad.model';

const departments = [
  'Human Resources',
  'Sales',
  'Social Media',
  'Web Development',
  'Public Relations',
  'Security',
  'Mobile Development',
  'Finance',
  'Business Contacts',
  'Data Analysis',
];

export const seedChapters = async (ctx: any) => {
  const chapterRepository = getCustomRepository(ChapterRepository);

  const squads = ctx.squads as Squad[];

  if (!squads) {
    throw new Error('No squads passed in context');
  }

  const chapterPromises = squads.flatMap(squad => {
    const names = shuffle(departments);

    return times(random(2, 6), i => {
      return chapterRepository.save({
        name: names[i],
        description: faker.lorem.sentences(4),
        squadId: squad.id,
      });
    });
  });

  ctx.chapters = await Promise.all(chapterPromises);
};

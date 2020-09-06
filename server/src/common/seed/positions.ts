import faker from 'faker';
import Listr from 'listr';
import { random, shuffle } from 'lodash';
import { getCustomRepository } from 'typeorm';

import { Clan } from '../../guilds/clans/clan.model';
import { Guild } from '../../guilds/guild.model';
import { PositionScope } from '../../positions/position.model';
import { PositionRepository } from '../../positions/position.repository';
import { getPositionNames } from './seed.utils';

export const seedPositions = async (ctx: any, task: Listr.ListrTaskWrapper<any>) => {
  const positionRepository = getCustomRepository(PositionRepository);

  const guilds = ctx.guilds as Guild[];
  const clans = ctx.clans as Clan[];

  if (!guilds || !clans) {
    throw new Error('No guilds or clans passed in context');
  }

  const scopes = [PositionScope.ORGANIZATION, PositionScope.GUILD, PositionScope.SQUAD];

  let count = 0;

  const positionPromises = getPositionNames(50).map(positionName => {
    const result = positionRepository.save({
      name: positionName,
      description: faker.lorem.sentences(random(3, 5)),
      scopes: shuffle(scopes).slice(0, random(1, 3)),
      guildId: Math.random() > 0.1 ? shuffle(guilds)[0].id : null,
    });

    count += 1;
    task.title = task.title.replace(/(\w+)(\/)/, `${count}$2`);

    return result;
  });

  ctx.positions = await Promise.all(positionPromises);
};

import axios, { AxiosResponse } from 'axios';
import faker from 'faker';
import Listr from 'listr';
import { keyBy } from 'lodash';
import { getCustomRepository } from 'typeorm';

import { ClanRepository } from '../../guilds/clans/clan.repository';
import { Guild } from '../../guilds/guild.model';

const clansEndpoint = 'https://run.mocky.io/v3/67626836-51a8-4108-8d60-b532f888c80b';

type MockedClan = { name: string; image: string; guildName: string };

export const seedClans = async (ctx: any, task: Listr.ListrTaskWrapper<any>) => {
  const clanRepository = getCustomRepository(ClanRepository);

  const clansResponse: AxiosResponse<MockedClan[]> = await axios.get(clansEndpoint);

  const guilds = ctx.guilds as Guild[];

  if (!guilds) {
    throw new Error('No guilds passed in context');
  }

  const guildsMap = keyBy(guilds, 'name');

  let count = 0;

  const clanPromises = clansResponse.data.map(async clan => {
    const result = await clanRepository.save({
      name: clan.name,
      image: clan.image,
      description: faker.lorem.sentences(6),
      guildId: guildsMap[clan.guildName].id,
    });

    count += 1;
    task.title = task.title.replace(/(\w+)(\/)/, `${count}$2`);

    return result;
  });

  ctx.clans = await Promise.all(clanPromises);
};

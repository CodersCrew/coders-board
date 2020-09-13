import axios, { AxiosResponse } from 'axios';
import faker from 'faker';
import Listr from 'listr';
import { getCustomRepository } from 'typeorm';

import { Guild } from '../../guilds/guild.model';
import { GuildRepository } from '../../guilds/guild.repository';

const guildsEndpoint = 'https://run.mocky.io/v3/27bfe074-8fd4-476a-b8eb-8fd8c5eafaae';

export const seedGuilds = async (ctx: any, task: Listr.ListrTaskWrapper<any>) => {
  const guildRepository = getCustomRepository(GuildRepository);

  const guildsResponse: AxiosResponse<Pick<Guild, 'name' | 'color' | 'image'>[]> = await axios.get(guildsEndpoint);

  let count = 0;

  const guildPromises = guildsResponse.data.map(async guild => {
    const result = await guildRepository.save({
      name: guild.name,
      color: guild.color,
      image: guild.image,
      description: faker.lorem.sentences(6),
    });

    count += 1;
    task.title = task.title.replace(/(\w+)(\/)/, `${count}$2`);

    return result;
  });

  ctx.guilds = await Promise.all(guildPromises);
};

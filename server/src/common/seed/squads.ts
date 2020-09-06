import axios, { AxiosResponse } from 'axios';
import faker from 'faker';
import Listr from 'listr';
import { getCustomRepository } from 'typeorm';

import { Squad } from '../../squads/squad.model';
import { SquadRepository } from '../../squads/squad.repository';

const squadsEndpoint = 'https://run.mocky.io/v3/ee4c1ebb-641d-4aeb-853d-42a23cdf4018';

export const seedsquads = async (ctx: any, task: Listr.ListrTaskWrapper<any>) => {
  const squadRepository = getCustomRepository(SquadRepository);

  const squadsResponse: AxiosResponse<Pick<Squad, 'name' | 'color' | 'image'>[]> = await axios.get(squadsEndpoint);

  let count = 0;

  const squadPromises = squadsResponse.data.map(async squad => {
    const result = await squadRepository.save({
      name: squad.name,
      color: squad.color,
      image: squad.image,
      description: faker.lorem.sentences(6),
    });

    count += 1;
    task.title = task.title.replace(/(\w+)(\/)/, `${count}$2`);

    return result;
  });

  ctx.squads = await Promise.all(squadPromises);
};

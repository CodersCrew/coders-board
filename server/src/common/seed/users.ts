import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';
import faker from 'faker';
import Listr from 'listr';
import { getCustomRepository } from 'typeorm';

import { UserRole } from '../../users/user.model';
import { UserRepository } from '../../users/user.repository';

type RandomUser = {
  gender: 'male' | 'female';
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

type RandomUserResponse = { results: RandomUser[] };

export const seedUsers = async (ctx: any, task: Listr.ListrTaskWrapper<any>) => {
  const userRepository = getCustomRepository(UserRepository);

  const randomUserData: AxiosResponse<RandomUserResponse> = await axios.get(
    'https://randomuser.me/api/?results=100&nat=us,gb&inc=gender,name,email,phone,picture',
  );

  let count = 0;

  const userPromises = randomUserData.data.results.map(async (user, i) => {
    const result = await userRepository.save({
      firstName: user.name.first,
      lastName: user.name.last,
      primaryEmail: `test${i + 1}@coderscrew.pl`,
      recoveryEmail: user.email,
      phone: user.phone,
      thumbnail: user.picture.thumbnail,
      image: user.picture.large,
      password: 'test',
      googleId: crypto.randomBytes(12).toString('hex'),
      slackId: Math.random() > 0.1 ? crypto.randomBytes(12).toString('hex') : null,
      deletedAt: Math.random() > 0.2 ? null : faker.date.past(1),
      role: i < 3 ? UserRole.ADMIN : UserRole.USER,
    });

    count += 1;
    task.title = task.title.replace(/(\w+)(\/)/, `${count}$2`);

    return result;
  });

  ctx.users = await Promise.all(userPromises);
};

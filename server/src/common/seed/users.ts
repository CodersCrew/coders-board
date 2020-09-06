import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';
import Listr from 'listr';
import { getCustomRepository } from 'typeorm';

import { UserRole, UserStatus } from '../../users/user.model';
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

export const seedUsers = async (task: Listr.ListrTaskWrapper<any>) => {
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
      slackId: Math.random() > 0.2 ? crypto.randomBytes(12).toString('hex') : null,
      status: UserStatus.ACTIVE,
      role: i < 3 ? UserRole.ADMIN : UserRole.USER,
    });

    count += 1;
    task.title = task.title.replace(/(\w+)(\/)/, `${count}$2`);

    return result;
  });

  const users = await Promise.all(userPromises);

  return users;
};

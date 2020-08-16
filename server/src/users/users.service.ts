import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { In } from 'typeorm';

import { brackets } from '../common/utils';
import { CloudinaryService, GsuiteService, SlackService } from '../integrations';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly gsuiteService: GsuiteService,
    private readonly slackService: SlackService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  findById(id: string): Promise<User | null> {
    if (!id) return null;

    return this.userRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<User> {
    if (!id) throw new BadRequestException();

    return this.userRepository.findOneOrFail(id);
  }

  findByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepository.findOne({ googleId });
  }

  findAll({ role, search, ids }: GetUsersArgs): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');

    if (ids) {
      query.andWhereInIds(ids);
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    if (search) {
      const searchQuery = brackets(
        ['user.fullName LIKE :search', 'user.primaryEmail LIKE :search', 'user.recoveryEmail LIKE :search'].join(
          ' OR ',
        ),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    query.orderBy('user.fullName', 'ASC');

    return query.getMany();
  }

  async create(input: CreateUserInput): Promise<User> {
    const googleId = await this.gsuiteService.createUser(input);

    return this.userRepository.save({ ...input, fullName: `${input.firstName} ${input.lastName}`, googleId });
  }

  async delete(userId: string): Promise<boolean> {
    const userRecord = await this.findByIdOrThrow(userId);

    await this.gsuiteService.deleteUser({ id: userRecord.googleId });
    await this.userRepository.delete(userId);

    return true;
  }

  async syncWithGoogle(): Promise<boolean> {
    const users = await this.gsuiteService.findAllUsers();

    for (const user of users) {
      const userRecord = await this.findByGoogleId(user.googleId);

      const updateChunk = {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
        image: !user.image || user.image.includes('gstatic') ? userRecord.image : user.image,
      };

      if (userRecord) {
        await this.userRepository.save({
          ...userRecord,
          ...updateChunk,
        });
      } else {
        await this.userRepository.save(updateChunk);
      }
    }

    return true;
  }

  async syncWithSlack() {
    const slackUsers = await this.slackService.findAllUsers();
    const slackUsersMap = keyBy(slackUsers, 'primaryEmail');
    const users = await this.userRepository.find({
      where: { primaryEmail: In(Object.keys(slackUsersMap)) },
    });

    for (const user of users) {
      const slackUser = slackUsersMap[user.primaryEmail];

      if (slackUser.image) {
        const image = await this.cloudinaryService.uploadUserImage(slackUser.image, user.id);
        const thumbnail = await this.cloudinaryService.uploadUserThumbnail(slackUser.thumbnail, user.id);

        await this.userRepository.save({
          ...user,
          image,
          thumbnail,
          slackId: slackUser.slackId,
        });
      }
    }

    return true;
  }
}

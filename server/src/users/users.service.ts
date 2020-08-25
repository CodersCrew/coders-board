import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { brackets, resolveAsyncRelation } from '../common/utils';
import { CloudinaryService, GsuiteService, SlackService } from '../integrations';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly gsuiteService: GsuiteService,
    private readonly slackService: SlackService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  getGuilds = resolveAsyncRelation(this.userRepository, 'guilds');
  getSquads = resolveAsyncRelation(this.userRepository, 'squads');

  findById(id: string) {
    if (!id) return null;

    return this.userRepository.findOne(id);
  }

  findByIdOrThrow(id: string) {
    if (!id) throw new BadRequestException();

    return this.userRepository.findOneOrFail(id);
  }

  findAll({ role, search, ids }: GetUsersArgs) {
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

  async create(input: CreateUserInput) {
    const { id: googleId } = await this.gsuiteService.createUser(input);

    try {
      const fullName = `${input.firstName} ${input.lastName}`;
      const user = await this.userRepository.save({ ...input, fullName, googleId });
      return user;
    } catch (ex) {
      await this.gsuiteService.deleteUser({ id: googleId });
      throw ex;
    }
  }

  async delete(userId: string) {
    const user = await this.findByIdOrThrow(userId);

    const slackUser = await this.slackService.getUser({ slackId: user.slackId });

    if (slackUser && !slackUser.deleted) {
      throw new ConflictException('You cannot delete user with active Slack account');
    }

    if (user.image.includes('cloudinary')) {
      await this.cloudinaryService.deleteUserImage(user.id);
    }

    if (user.thumbnail.includes('cloudinary')) {
      await this.cloudinaryService.deleteUserThumbnail(user.id);
    }

    await this.gsuiteService.deleteUser({ id: user.googleId });
    await this.userRepository.delete(userId);

    return true;
  }
}

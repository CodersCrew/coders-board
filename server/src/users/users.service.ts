import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { generate as generatePassword } from 'generate-password';

import { env } from '../common/env';
import { brackets, resolveAsyncRelation } from '../common/utils';
import { GsuiteService, SlackService } from '../integrations';
import { CloudinaryService, MailerService } from '../services';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly gsuiteService: GsuiteService,
    private readonly slackService: SlackService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly mailerService: MailerService,
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

    if (ids && ids.length) {
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
    const fullName = `${input.firstName} ${input.lastName}`;

    let user: User;

    if (env.NODE_ENV === 'production') {
      const password = generatePassword({ numbers: true });
      const { id: googleId } = await this.gsuiteService.createGsuiteUser({ ...input, password });

      user = await this.userRepository.save({ ...input, fullName, googleId, password: null });

      await this.mailerService.sendInvitationEmail({
        to: input.recoveryEmail,
        email: input.primaryEmail,
        password,
      });
    } else {
      if (!input.password?.trim()) {
        throw new BadRequestException('User password is a required field for all non-production environments');
      }

      const password = await bcrypt.hash(input.password, 10);
      user = await this.userRepository.save({ ...input, fullName, password });
    }

    return user;
  }

  async update({ id, ...input }: UpdateUserInput) {
    const rawUser = await this.userRepository.findOneOrFail(id);
    const fullName = `${input.firstName} ${input.lastName}`;
    const user = await this.userRepository.save({ ...rawUser, ...input, fullName });

    if (env.NODE_ENV === 'production') {
      if (user.googleId) {
        await this.gsuiteService.syncGsuiteUser({ googleId: user.googleId });
      }

      if (user.slackId) {
        await this.slackService.syncSlackUser({ slackId: user.slackId });
      }
    }

    return user;
  }

  async delete(userId: string) {
    const user = await this.userRepository.findOneOrFail(userId);

    if (env.NODE_ENV === 'production') {
      const slackUser = await this.slackService.getSlackUser({ slackId: user.slackId });

      if (slackUser && !slackUser.deleted) {
        throw new ConflictException('You cannot delete user with active Slack account');
      }

      const gsuiteUser = await this.slackService.getSlackUser({ slackId: user.slackId });

      if (gsuiteUser?.id) {
        throw new ConflictException('You cannot delete user with active Google account');
      }
    }

    if (user.image.includes('cloudinary')) {
      await this.cloudinaryService.deleteUserImage(user.id);
    }

    if (user.thumbnail.includes('cloudinary')) {
      await this.cloudinaryService.deleteUserThumbnail(user.id);
    }

    await this.userRepository.remove(user);

    return true;
  }
}

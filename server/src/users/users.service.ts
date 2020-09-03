import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { generate as generatePassword } from 'generate-password';

import { brackets, resolveAsyncRelation } from '../common/utils';
import { CloudinaryService, GsuiteService, SlackService } from '../integrations';
import { MailerService } from '../services/mailer/mailer.service';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { UpdateUserInput } from './dto/update-user.input';
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
    const password = generatePassword({ numbers: true });

    const { id: googleId } = await this.gsuiteService.createGoogleUser({ ...input, password });

    const fullName = `${input.firstName} ${input.lastName}`;
    const user = await this.userRepository.save({ ...input, fullName, googleId });

    await this.mailerService.sendInvitationEmail({
      to: input.recoveryEmail,
      email: input.primaryEmail,
      password,
    });

    return user;
  }

  async update({ id, ...input }: UpdateUserInput) {
    const rawUser = await this.userRepository.findOneOrFail(id);
    const fullName = `${input.firstName} ${input.lastName}`;
    const user = await this.userRepository.save({ ...rawUser, ...input, fullName });

    await this.gsuiteService.syncGoogleUser({ googleId: user.googleId });

    if (user.slackId) {
      await this.slackService.syncSlackUser({ slackId: user.slackId });
    }

    return user;
  }

  async delete(userId: string) {
    const user = await this.userRepository.findOneOrFail(userId);
    const slackUser = await this.slackService.getSlackUser({ slackId: user.slackId });

    if (slackUser && !slackUser.deleted) {
      throw new ConflictException('You cannot delete user with active Slack account');
    }

    if (user.image.includes('cloudinary')) {
      await this.cloudinaryService.deleteUserImage(user.id);
    }

    if (user.thumbnail.includes('cloudinary')) {
      await this.cloudinaryService.deleteUserThumbnail(user.id);
    }

    await this.gsuiteService.deleteGoogleUser({ googleId: user.googleId });
    await this.userRepository.delete(userId);

    return true;
  }
}

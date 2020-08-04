import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { brackets } from '../common/utils/brackets';
import { GsuiteService } from '../gsuite/gsuite.service';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { createGravatar } from './users.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  async getFullName(id: string) {
    const user = await this.findByIdOrThrow(id);
    return `${user.firstName} ${user.lastName}`;
  }

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
        [
          'user.firstName LIKE :search',
          'user.lastName LIKE :search',
          'user.primaryEmail LIKE :search',
          'user.recoveryEmail LIKE :search',
        ].join(' OR '),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    return query.getMany();
  }

  async create(input: CreateUserInput): Promise<User> {
    const googleId = await this.gsuiteService.createUser(input);

    return this.userRepository.save({ ...input, googleId });
  }

  async delete(userId: string): Promise<boolean> {
    const userRecord = await this.findByIdOrThrow(userId);

    await this.gsuiteService.deleteUser({ id: userRecord.googleId });
    await this.userRepository.delete(userId);

    return true;
  }

  async migrateGoogleUsers(): Promise<User[]> {
    const users = await this.gsuiteService.findAllUsers();
    const result: User[] = [];

    for (const user of users) {
      const userRecord = await this.findByGoogleId(user.googleId);

      if (userRecord) {
        result.push(
          await this.userRepository.save({
            ...userRecord,
            ...user,
          }),
        );
      } else {
        result.push(
          await this.userRepository.save({
            ...user,
            image: user.image || createGravatar(user.primaryEmail),
          }),
        );
      }
    }

    return result;
  }
}

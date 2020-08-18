import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { brackets } from '../common/utils';
import { GsuiteService } from '../integrations';
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

  async delete(userId: string): Promise<boolean> {
    const user = await this.findByIdOrThrow(userId);

    await this.gsuiteService.deleteUser({ id: user.googleId });
    await this.userRepository.delete(userId);

    return true;
  }
}

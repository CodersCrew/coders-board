import { BadRequestException, Injectable } from '@nestjs/common';

import { brackets } from '../common/utils';
import { CreateSuccessInput, DeleteSuccessArgs, GetSuccessesArgs } from './dto';
import { Success } from './success.model';
import { SuccessRepository } from './success.repository';

@Injectable()
export class SuccessesService {
  constructor(private readonly successRepository: SuccessRepository) {}

  async getUsers(success: Success) {
    const { users } = await this.successRepository.findOne(success.id, { relations: ['users'] });
    return users;
  }

  async getCreator(success: Success) {
    const { creator } = await this.successRepository.findOne(success.id, { relations: ['creator'] });
    return creator;
  }

  findById(id: string): Promise<Success | null> {
    if (!id) return null;

    return this.successRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<Success> {
    if (!id) throw new BadRequestException();

    return this.successRepository.findOneOrFail(id);
  }

  findAll({ search, type }: GetSuccessesArgs): Promise<Success[]> {
    const query = this.successRepository.createQueryBuilder('success');

    if (type) {
      query.andWhere('success.type = :type', { type });
    }

    if (search) {
      const searchQuery = brackets(['success.name LIKE :search', 'success.description LIKE :search'].join(' OR '));

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    query.orderBy('success.date', 'DESC');

    return query.getMany();
  }

  async create(input: CreateSuccessInput, creatorId: string): Promise<Success> {
    return this.successRepository.save({
      ...input,
      creatorId,
      users: input.usersIds.map(id => ({ id })),
    });
  }

  async delete({ id }: DeleteSuccessArgs): Promise<boolean> {
    const success = await this.findByIdOrThrow(id);

    await this.successRepository.remove(success);

    return true;
  }
}

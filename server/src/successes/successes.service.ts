import { BadRequestException, Injectable } from '@nestjs/common';

import { brackets, resolveAsyncRelation } from '../common/utils';
import { CreateSuccessInput, DeleteSuccessArgs, GetSuccessesArgs, UpdateSuccessInput } from './dto';
import { SuccessRepository } from './success.repository';

@Injectable()
export class SuccessesService {
  constructor(private readonly successRepository: SuccessRepository) {}

  getUsers = resolveAsyncRelation(this.successRepository, 'users');

  getCreator = resolveAsyncRelation(this.successRepository, 'creator');

  findById(id: string) {
    if (!id) return null;

    return this.successRepository.findOne(id);
  }

  findByIdOrThrow(id: string) {
    if (!id) throw new BadRequestException();

    return this.successRepository.findOneOrFail(id);
  }

  findAll({ search, type }: GetSuccessesArgs) {
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

  async create(input: CreateSuccessInput, creatorId: string) {
    return this.successRepository.save({
      ...input,
      creatorId,
      users: input.usersIds.map(id => ({ id })),
    });
  }

  async update(input: UpdateSuccessInput) {
    return this.successRepository.save({
      ...input,
      users: input.usersIds.map(id => ({ id })),
    });
  }

  async delete({ id }: DeleteSuccessArgs) {
    const success = await this.findByIdOrThrow(id);

    await this.successRepository.remove(success);

    return true;
  }
}

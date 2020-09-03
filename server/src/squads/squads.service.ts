import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { brackets, resolveAsyncRelation } from '../common/utils';
import { CreateSquadInput } from './dto/create-squad.input';
import { GetSquadsArgs } from './dto/get-squads.args';
import { UpdateSquadInput } from './dto/update-squad.input';
import { SquadRepository } from './squad.repository';

@Injectable()
export class SquadsService {
  constructor(private readonly squadRepository: SquadRepository) {}

  getChapters = resolveAsyncRelation(this.squadRepository, 'chapters');
  getMembers = resolveAsyncRelation(this.squadRepository, 'members');

  findByIdOrThrow(id: string) {
    if (!id) throw new BadRequestException();

    return this.squadRepository.findOneOrFail(id);
  }

  findAll({ search }: GetSquadsArgs) {
    const query = this.squadRepository.createQueryBuilder('squad');

    if (search) {
      const searchQuery = brackets(
        ['squad.name LIKE :search', 'squad.email LIKE :search', 'squad.description LIKE :search'].join(' OR '),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    return query.getMany();
  }

  create(input: CreateSquadInput) {
    return this.squadRepository.save(input);
  }

  async update({ id, ...input }: UpdateSquadInput) {
    const squad = await this.squadRepository.findOneOrFail(id);

    return this.squadRepository.save({ ...squad, ...input });
  }

  async delete(id: string) {
    const squad = await this.squadRepository.findOneOrFail(id, { relations: ['members', 'chapters'] });

    if (squad.members.length) {
      throw new ConflictException('You cannot remove a squad with members');
    }

    if (squad.chapters.length) {
      throw new ConflictException('You cannot remove a squad with chapters');
    }

    await this.squadRepository.remove(squad);

    return true;
  }
}

import { ConflictException, Injectable } from '@nestjs/common';

import { brackets, resolveAsyncRelation } from '../../common/utils';
import { ClanRepository } from './clan.repository';
import { CreateClanInput } from './dto/create-clan.input';
import { GetClansArgs } from './dto/get-clans.args';
import { UpdateClanInput } from './dto/update-clan.input';

@Injectable()
export class ClansService {
  constructor(private readonly clanRepository: ClanRepository) {}

  getGuild = resolveAsyncRelation(this.clanRepository, 'guild');
  getPositions = resolveAsyncRelation(this.clanRepository, 'positions');

  findAll({ search, guildId }: GetClansArgs) {
    const query = this.clanRepository.createQueryBuilder('clan');

    if (guildId) {
      query.andWhere('clan.guildId = :guildId', { guildId });
    }

    if (search) {
      const searchQuery = brackets(
        ['clan.name LIKE :search', 'clan.email LIKE :search', 'clan.description LIKE :search'].join(' OR '),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    return query.getMany();
  }

  create(input: CreateClanInput) {
    return this.clanRepository.save(input);
  }

  async update({ id, ...input }: UpdateClanInput) {
    const clan = await this.clanRepository.findOneOrFail(id);

    return this.clanRepository.save({ ...clan, ...input });
  }

  async delete(id: string) {
    const clan = await this.clanRepository.findOneOrFail(id, { relations: ['positions'] });

    if (clan.positions.length) {
      throw new ConflictException('You cannot remove a clan with positions');
    }

    await this.clanRepository.remove(clan);

    return true;
  }
}

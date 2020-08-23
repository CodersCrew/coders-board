import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { isEqual, pick } from 'lodash';

import { brackets, resolveAsyncRelation } from '../../common/utils';
import { GsuiteService, UpdateGroupParams } from '../../integrations';
import { ClanRepository } from './clan.repository';
import { CreateClanInput } from './dto/create-clan.input';
import { GetClansArgs } from './dto/get-clans.args';
import { UpdateClanInput } from './dto/update-clan.input';

@Injectable()
export class ClansService {
  constructor(private readonly clanRepository: ClanRepository, private readonly gsuiteService: GsuiteService) {}

  getGuild = resolveAsyncRelation(this.clanRepository, 'guild');
  getPositions = resolveAsyncRelation(this.clanRepository, 'positions');

  findById(id: string) {
    if (!id) return null;

    return this.clanRepository.findOne(id);
  }

  findByIdOrThrow(id: string) {
    if (!id) throw new BadRequestException();

    return this.clanRepository.findOneOrFail(id);
  }

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

  async create(input: CreateClanInput) {
    const googleId = await this.gsuiteService.createGroup(input);
    const clan = await this.clanRepository.save({ ...input, googleId });
    const guild = await this.getGuild(clan);

    await this.gsuiteService.updateGroup({ ...input, name: `${guild.name} | ${clan.name}`, id: googleId });

    return clan;
  }

  async update({ id, ...input }: UpdateClanInput) {
    const clan = await this.findByIdOrThrow(id);

    const googlePropNames: (keyof Omit<UpdateGroupParams, 'id'>)[] = ['name', 'description', 'email'];

    if (!isEqual(pick(input, googlePropNames), pick(clan, googlePropNames))) {
      const guild = await clan.guild;

      await this.gsuiteService.updateGroup({ ...input, id: clan.googleId, name: `${guild.name} | ${input.name}` });
    }

    return this.clanRepository.save({ ...clan, ...input });
  }

  async delete(id: string) {
    const clan = await this.findByIdOrThrow(id);

    const positions = await this.getPositions(clan);

    if (positions.length) {
      throw new ConflictException('You cannot remove a clan with positions');
    }

    await this.gsuiteService.deleteGroup({ id: clan.googleId });
    await this.clanRepository.delete(id);

    return true;
  }
}

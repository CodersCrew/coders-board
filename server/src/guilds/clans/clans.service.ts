import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual, pick } from 'lodash';

import { resolveAsyncRelation } from '../../common/utils';
import { brackets } from '../../common/utils/brackets';
import { GsuiteService, UpdateGroupParams } from '../../integrations';
import { Clan } from './clan.model';
import { ClanRepository } from './clan.repository';
import { CreateClanInput } from './dto/create-clan.input';
import { GetClansArgs } from './dto/get-clans.args';
import { UpdateClanInput } from './dto/update-clan.input';

@Injectable()
export class ClansService {
  constructor(
    @InjectRepository(ClanRepository)
    private readonly clanRepository: ClanRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  getGuild = resolveAsyncRelation<Clan, 'guild'>('guild', this.findByIdOrThrow);
  getPositions = resolveAsyncRelation<Clan, 'positions'>('positions', this.findByIdOrThrow);

  findById(id: string): Promise<Clan | null> {
    if (!id) return null;

    return this.clanRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<Clan> {
    if (!id) throw new BadRequestException();

    return this.clanRepository.findOneOrFail(id);
  }

  findAll({ search, guildId }: GetClansArgs): Promise<Clan[]> {
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

  async create(input: CreateClanInput): Promise<Clan> {
    const googleId = await this.gsuiteService.createGroup(input);
    const clan = await this.clanRepository.save({ ...input, googleId });
    const guild = await this.getGuild(clan);

    await this.gsuiteService.updateGroup({ ...input, name: `${guild.name} | ${clan.name}`, id: googleId });

    return clan;
  }

  async update({ id, ...input }: UpdateClanInput): Promise<Clan> {
    const clan = await this.findByIdOrThrow(id);

    const googlePropNames: (keyof Omit<UpdateGroupParams, 'id'>)[] = ['name', 'description', 'email'];

    if (!isEqual(pick(input, googlePropNames), pick(clan, googlePropNames))) {
      const guild = await clan.guild;

      await this.gsuiteService.updateGroup({ ...input, id: clan.googleId, name: `${guild.name} | ${input.name}` });
    }

    return this.clanRepository.save({ ...clan, ...input });
  }

  async delete(id: string): Promise<boolean> {
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

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual, pick } from 'lodash';

import { brackets, resolveAsyncRelation } from '../common/utils';
import { GsuiteService, UpdateGroupParams } from '../integrations';
import { CreateGuildInput } from './dto/create-guild.input';
import { GetGuildsArgs } from './dto/get-guilds.args';
import { UpdateGuildInput } from './dto/update-guild.input';
import { Guild } from './guild.model';
import { GuildRepository } from './guild.repository';

@Injectable()
export class GuildsService {
  constructor(
    @InjectRepository(GuildRepository)
    private readonly guildRepository: GuildRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  getClans = resolveAsyncRelation<Guild, 'clans'>('clans', this.findByIdOrThrow);
  getMembers = resolveAsyncRelation<Guild, 'members'>('members', this.findByIdOrThrow);

  findById(id: string): Promise<Guild | null> {
    if (!id) return null;

    return this.guildRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<Guild> {
    if (!id) throw new BadRequestException();

    return this.guildRepository.findOneOrFail(id);
  }

  findAll({ search }: GetGuildsArgs): Promise<Guild[]> {
    const query = this.guildRepository.createQueryBuilder('guild');

    if (search) {
      const searchQuery = brackets(
        ['guild.name LIKE :search', 'guild.email LIKE :search', 'guild.description LIKE :search'].join(' OR '),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    return query.getMany();
  }

  async create(input: CreateGuildInput): Promise<Guild> {
    const googleId = await this.gsuiteService.createGroup(input);

    return this.guildRepository.save({ ...input, googleId });
  }

  async update({ id, ...input }: UpdateGuildInput): Promise<Guild> {
    const guild = await this.findByIdOrThrow(id);

    const googlePropNames: (keyof Omit<UpdateGroupParams, 'id'>)[] = ['name', 'description', 'email'];

    if (!isEqual(pick(input, googlePropNames), pick(guild, googlePropNames))) {
      await this.gsuiteService.updateGroup({ ...input, id: guild.googleId });
    }

    return this.guildRepository.save({ ...guild, ...input });
  }

  async delete(id: string): Promise<boolean> {
    const guild = await this.findByIdOrThrow(id);

    const members = await guild.members;

    if (members.length) {
      throw new ConflictException('You cannot remove a guild with members');
    }

    const clans = await guild.clans;

    if (clans.length) {
      throw new ConflictException('You cannot remove a guild with clans');
    }

    await this.gsuiteService.deleteGroup({ id: guild.googleId });
    await this.guildRepository.delete(id);

    return true;
  }
}

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { brackets, resolveAsyncRelation } from '../common/utils';
import { CreateGuildInput } from './dto/create-guild.input';
import { GetGuildsArgs } from './dto/get-guilds.args';
import { UpdateGuildInput } from './dto/update-guild.input';
import { GuildRepository } from './guild.repository';

@Injectable()
export class GuildsService {
  constructor(private readonly guildRepository: GuildRepository) {}

  getClans = resolveAsyncRelation(this.guildRepository, 'clans');

  getMembers = resolveAsyncRelation(this.guildRepository, 'members');

  findByIdOrThrow(id: string) {
    if (!id) throw new BadRequestException();

    return this.guildRepository.findOneOrFail(id);
  }

  findAll({ search }: GetGuildsArgs) {
    const query = this.guildRepository.createQueryBuilder('guild');

    if (search) {
      const searchQuery = brackets(
        ['guild.name LIKE :search', 'guild.email LIKE :search', 'guild.description LIKE :search'].join(' OR '),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    return query.getMany();
  }

  create(input: CreateGuildInput) {
    return this.guildRepository.save(input);
  }

  async update({ id, ...input }: UpdateGuildInput) {
    const guild = await this.guildRepository.findOneOrFail(id);

    return this.guildRepository.save({ ...guild, ...input });
  }

  async delete(id: string) {
    const guild = await this.guildRepository.findOneOrFail(id, { relations: ['members', 'clans'] });

    if (guild.members.length) {
      throw new ConflictException('You cannot remove a guild with members');
    }

    if (guild.clans.length) {
      throw new ConflictException('You cannot remove a guild with clans');
    }

    await this.guildRepository.remove(guild);

    return true;
  }
}

import { Injectable } from '@nestjs/common';

import { resolveAsyncRelation } from '../../common/utils';
import { CreateGuildPositionInput } from './dto/create-guild-position.input';
import { GetGuildPositionsArgs } from './dto/get-guild-positions.args';
import { UpdateGuildPositionInput } from './dto/update-guild-position.input';
import { GuildPositionRepository } from './guild-position.repository';

@Injectable()
export class GuildPositionsService {
  constructor(private readonly guildPositionRepository: GuildPositionRepository) {}

  getMember = resolveAsyncRelation(this.guildPositionRepository, 'member');
  getClan = resolveAsyncRelation(this.guildPositionRepository, 'clan');

  findAll({ guildId, memberId }: GetGuildPositionsArgs) {
    const query = this.guildPositionRepository.createQueryBuilder('guildPosition');

    query.innerJoinAndSelect('guildPosition.member', 'member');
    query.where('member.guildId = :guildId', { guildId });

    if (memberId) {
      query.andWhere('guildPosition.memberId = :memberId', { memberId });
    }

    return query.getMany();
  }

  create({ guildId: _guildId, ...input }: CreateGuildPositionInput) {
    return this.guildPositionRepository.save(input);
  }

  async update({ id, guildId: _guildId, ...input }: UpdateGuildPositionInput) {
    const guildPosition = await this.guildPositionRepository.findOneOrFail(id);

    return this.guildPositionRepository.save({
      ...guildPosition,
      ...input,
    });
  }

  async delete(id: string) {
    const guildPosition = await this.guildPositionRepository.findOneOrFail(id);

    await this.guildPositionRepository.remove(guildPosition);

    return true;
  }
}

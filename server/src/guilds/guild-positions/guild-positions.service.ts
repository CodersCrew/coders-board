import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { resolveAsyncRelation } from '../../common/utils';
import { GuildMemberRepository } from '../guild-members/guild-member.repository';
import { CreateGuildPositionInput } from './dto/create-guild-position.input';
import { GetGuildPositionsArgs } from './dto/get-guild-positions.args';
import { UpdateGuildPositionInput } from './dto/update-guild-position.input';
import { GuildPosition } from './guild-position.model';
import { GuildPositionRepository } from './guild-position.repository';

@Injectable()
export class GuildPositionsService {
  constructor(
    @InjectRepository(GuildMemberRepository)
    private readonly guildMemberRepository: GuildMemberRepository,
    private readonly guildPositionRepository: GuildPositionRepository,
  ) {}

  getMember = resolveAsyncRelation(this.guildPositionRepository, 'member');

  getClan = resolveAsyncRelation(this.guildPositionRepository, 'clan');

  getPosition = resolveAsyncRelation(this.guildPositionRepository, 'position');

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
    const guildPosition = await this.guildPositionRepository.findOneOrFail(id, { relations: ['member'] });

    const result = await this.guildPositionRepository.save({
      ...guildPosition,
      ...input,
    });

    if (!guildPosition.to && input.to) {
      this.deleteMemberWithoutPositions(result, Boolean(guildPosition.member.deletedAt));
    }

    if (guildPosition.to && !input.to && guildPosition.member.deletedAt) {
      await this.guildMemberRepository.restore(guildPosition.memberId);
    }

    return result;
  }

  async delete(id: string) {
    const guildPosition = await this.guildPositionRepository.findOneOrFail(id, { relations: ['member'] });

    await this.guildPositionRepository.remove(guildPosition);

    await this.deleteMemberWithoutPositions(guildPosition, Boolean(guildPosition.member.deletedAt));

    return true;
  }

  private async deleteMemberWithoutPositions(guildPosition: GuildPosition, isMemberSoftDeleted: boolean) {
    const memberPositions = await this.guildPositionRepository.find({
      where: { memberId: guildPosition.memberId },
    });

    const activePositions = memberPositions.filter(p => !p.to);

    if (memberPositions.length === 0) {
      await this.guildMemberRepository.delete({ id: guildPosition.memberId });
      return;
    }

    if (!isMemberSoftDeleted && activePositions.length === 0) {
      await this.guildMemberRepository.softDelete({ id: guildPosition.memberId });
    }
  }
}

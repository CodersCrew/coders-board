import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUndefined } from 'lodash';

import { resolveAsyncRelation } from '../../common/utils';
import { PositionRepository } from '../../positions/position.repository';
import { GuildPosition } from '../guild-positions/guild-position.model';
import { CreateGuildMemberInput } from './dto/create-guild-member.input';
import { GetGuildMembersArgs } from './dto/get-guild-members.args';
import { UpdateGuildMemberInput } from './dto/update-guild-member.input';
import { GuildMember } from './guild-member.model';
import { GuildMemberRepository } from './guild-member.repository';

@Injectable()
export class GuildMembersService {
  constructor(
    @InjectRepository(PositionRepository)
    private readonly positionRepository: PositionRepository,
    private readonly guildMemberRepository: GuildMemberRepository,
  ) {}

  getUser = resolveAsyncRelation(this.guildMemberRepository, 'user');

  getGuild = resolveAsyncRelation(this.guildMemberRepository, 'guild');

  async getPositions(guildMember: GuildMember, isActive?: boolean) {
    const positions = await resolveAsyncRelation(this.guildMemberRepository, 'positions')(guildMember);

    if (!isUndefined(isActive)) {
      return positions.filter(position => (isActive ? !position.to : position.to));
    }

    return positions;
  }

  findAll({ guildId, archived }: GetGuildMembersArgs) {
    const query = this.guildMemberRepository.createQueryBuilder('guildMember');

    query.where('guildMember.guildId = :guildId', { guildId });

    if (archived) {
      query.withDeleted();
    }

    query.leftJoinAndSelect('guildMember.user', 'user');
    query.orderBy('user.fullName');

    return query.getMany();
  }

  async create({ positionId, ...input }: CreateGuildMemberInput) {
    const position = await this.positionRepository.findOneOrFail(positionId);

    const guildPosition = new GuildPosition();
    guildPosition.from = new Date();
    guildPosition.position = position;

    const guildMember = await this.guildMemberRepository.findOne({
      where: { userId: input.userId, guildId: input.guildId },
      withDeleted: true,
      relations: ['positions'],
    });

    if (guildMember?.deletedAt) {
      return this.guildMemberRepository.save({
        ...guildMember,
        ...input,
        positions: [...guildMember.positions, guildPosition],
        deletedAt: null,
      });
    }

    if (guildMember && !guildMember.deletedAt) {
      throw new ConflictException('Member already exists');
    }

    return this.guildMemberRepository.save({ ...input, positions: [guildPosition] });
  }

  async update({ id, guildId: _guildId, ...input }: UpdateGuildMemberInput) {
    const guildMember = await this.guildMemberRepository.findOneOrFail(id);

    return this.guildMemberRepository.save({
      ...guildMember,
      ...input,
    });
  }
}

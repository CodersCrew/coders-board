import { ConflictException, Injectable } from '@nestjs/common';

import { resolveAsyncRelation } from '../../common/utils';
import { GuildPosition, GuildPositionKind } from '../guild-positions/guild-position.model';
import { CreateGuildMemberInput } from './dto/create-guild-member.input';
import { GetGuildMembersArgs } from './dto/get-guild-members.args';
import { UpdateGuildMemberInput } from './dto/update-guild-member.input';
import { GuildMember } from './guild-member.model';
import { GuildMemberRepository } from './guild-member.repository';

const filterActivePositions = (positions: GuildPosition[], isActive?: boolean) => {
  if (typeof isActive !== 'undefined') {
    return positions.filter(position => (isActive ? !position.to : position.to));
  }

  return positions;
};

@Injectable()
export class GuildMembersService {
  constructor(private readonly guildMemberRepository: GuildMemberRepository) {}

  getUser = resolveAsyncRelation(this.guildMemberRepository, 'user');

  getGuild = resolveAsyncRelation(this.guildMemberRepository, 'guild');

  async getPositions(guildMember: GuildMember, isActive?: boolean) {
    const positions = await resolveAsyncRelation(this.guildMemberRepository, 'positions')(guildMember);

    return filterActivePositions(positions, isActive);
  }

  findAll({ guildId }: GetGuildMembersArgs) {
    return this.guildMemberRepository.find({ where: { guildId } });
  }

  async create(input: CreateGuildMemberInput) {
    const position = new GuildPosition();
    position.from = new Date();
    position.kind = GuildPositionKind.MEMBER;

    return this.guildMemberRepository.save({ ...input, positions: [position] });
  }

  async update({ id, guildId: _guildId, ...input }: UpdateGuildMemberInput) {
    const guildMember = await this.guildMemberRepository.findOneOrFail(id);

    return this.guildMemberRepository.save({
      ...guildMember,
      ...input,
    });
  }

  async delete(id: string) {
    const guildMember = await this.guildMemberRepository.findOneOrFail(id, { relations: ['positions'] });
    const activePositions = filterActivePositions(guildMember.positions, true);

    if (activePositions.length) {
      throw new ConflictException('You cannot remove guild member with active positions');
    }

    await this.guildMemberRepository.remove(guildMember);

    return true;
  }
}

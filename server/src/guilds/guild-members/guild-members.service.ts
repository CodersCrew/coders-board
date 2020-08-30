import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { resolveAsyncRelation } from '../../common/utils';
import { GsuiteService } from '../../integrations';
import { GuildPosition, GuildPositionKind } from '../guild-positions/guild-position.model';
import { GuildPositionsService } from '../guild-positions/guild-positions.service';
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
  constructor(
    private readonly guildMemberRepository: GuildMemberRepository,
    private readonly guildPositionService: GuildPositionsService,
    private readonly gsuiteService: GsuiteService,
  ) {}

  getUser = resolveAsyncRelation(this.guildMemberRepository, 'user');
  getGuild = resolveAsyncRelation(this.guildMemberRepository, 'guild');

  async getPositions(guildMember: GuildMember, isActive?: boolean) {
    const positions = await resolveAsyncRelation(this.guildMemberRepository, 'positions')(guildMember);

    return filterActivePositions(positions, isActive);
  }

  findById(id: string) {
    if (!id) return null;

    return this.guildMemberRepository.findOne(id);
  }

  findByIdOrThrow(id: string) {
    if (!id) throw new BadRequestException();

    return this.guildMemberRepository.findOneOrFail(id);
  }

  findAll({ guildId }: GetGuildMembersArgs) {
    return this.guildMemberRepository.find({ where: { guildId } });
  }

  async create(input: CreateGuildMemberInput) {
    const guildMember = await this.guildMemberRepository.save(input);
    const guild = await this.getGuild(guildMember);
    const user = await this.getUser(guildMember);

    try {
      await this.gsuiteService.createMember({
        groupId: guild.googleId,
        userId: user.googleId,
        role: input.role,
      });
    } catch (ex) {
      await this.guildMemberRepository.remove(guildMember);
      throw ex;
    }

    try {
      await this.guildPositionService.create({
        from: new Date(),
        kind: GuildPositionKind.MEMBER,
        guildId: guild.id,
        memberId: guildMember.id,
      });
    } catch (ex) {
      this.guildMemberRepository.remove(guildMember);
      this.gsuiteService.deleteMember({ userId: user.googleId, groupId: guild.googleId });
      throw ex;
    }

    return guildMember;
  }

  async update({ id, guildId: _guildId, ...input }: UpdateGuildMemberInput) {
    const guildMember = await this.findByIdOrThrow(id);

    await this.gsuiteService.updateMember({
      groupId: guildMember.guild.googleId,
      userId: guildMember.user.googleId,
      role: input.role,
    });

    return this.guildMemberRepository.save({
      ...guildMember,
      ...input,
    });
  }

  async delete(id: string) {
    const guildMember = await this.findByIdOrThrow(id);
    const positions = await this.getPositions(guildMember);
    const activePositions = filterActivePositions(positions, true);

    if (activePositions.length) {
      throw new ConflictException('You cannot remove guild member with active positions');
    }

    await this.gsuiteService.deleteMember({ groupId: guildMember.guild.googleId, userId: guildMember.user.googleId });

    if (positions.length) {
      await this.guildMemberRepository.softRemove(guildMember);
    } else {
      await this.guildMemberRepository.remove(guildMember);
    }

    return true;
  }
}

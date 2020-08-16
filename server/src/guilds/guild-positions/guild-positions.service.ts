import { BadRequestException, Injectable } from '@nestjs/common';

import { TeamRole } from '../../common/enums/team-role.enum';
import { resolveAsyncRelation } from '../../common/utils';
import { GsuiteService } from '../../gsuite/gsuite.service';
import { Clan } from '../clans/clan.model';
import { GuildMember } from '../guild-members/guild-member.model';
import { CreateGuildPositionInput } from './dto/create-guild-position.input';
import { GetGuildPositionsArgs } from './dto/get-guild-positions.args';
import { UpdateGuildPositionInput } from './dto/update-guild-position.input';
import { GuildPosition } from './guild-position.model';
import { GuildPositionRepository } from './guild-position.repository';

@Injectable()
export class GuildPositionsService {
  constructor(
    private readonly guildPositionRepository: GuildPositionRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  getMember = resolveAsyncRelation<GuildPosition, 'member'>('member', this.findByIdOrThrow);
  getClan = resolveAsyncRelation<GuildPosition, 'clan'>('clan', this.findByIdOrThrow);

  findById(id: string): Promise<GuildPosition | null> {
    if (!id) return null;

    return this.guildPositionRepository.findOne(id);
  }

  findByIdOrThrow(id: string, withRelations?: boolean): Promise<GuildPosition> {
    if (!id) throw new BadRequestException();

    return this.guildPositionRepository.findOneOrFail(id, { relations: withRelations ? ['member', 'clan'] : [] });
  }

  findAll({ guildId, memberId }: GetGuildPositionsArgs): Promise<GuildPosition[]> {
    const query = this.guildPositionRepository.createQueryBuilder('guildPosition');

    query.innerJoinAndSelect('guildPosition.member', 'member');
    query.where('member.guildId = :guildId', { guildId });

    if (memberId) {
      query.andWhere('guildPosition.memberId = :memberId', { memberId });
    }

    return query.getMany();
  }

  async create({ guildId: _guildId, ...input }: CreateGuildPositionInput) {
    const guildPosition = await this.guildPositionRepository.save(input);

    try {
      await this.updateInGoogle(guildPosition);
    } catch (ex) {
      this.guildPositionRepository.delete(guildPosition.id);
      throw ex;
    }

    return guildPosition;
  }

  async update({ id, guildId: _guildId, ...input }: UpdateGuildPositionInput) {
    const guildPosition = await this.findByIdOrThrow(id);

    const updatedGuildPosition = await this.guildPositionRepository.save({
      ...guildPosition,
      ...input,
    });

    try {
      await this.updateInGoogle(guildPosition);
    } catch (ex) {
      await this.guildPositionRepository.save(guildPosition);
      throw ex;
    }

    return updatedGuildPosition;
  }

  async delete(id: string) {
    const guildPosition = await this.findByIdOrThrow(id, true);
    const clan = await this.getClan(guildPosition);
    const member = await this.getMember(guildPosition);

    await this.guildPositionRepository.delete(id);

    try {
      await this.updateInGoogle(guildPosition, clan, member);
    } catch (ex) {
      await this.guildPositionRepository.save(guildPosition);
      throw ex;
    }

    return true;
  }

  async updateInGoogle(guildPosition: GuildPosition, clan?: Clan, member?: GuildMember) {
    const { memberId, clanId } = guildPosition;

    if (!clanId) return true;

    const guildPositions = await this.guildPositionRepository.find({ where: { memberId, clanId } });
    const { googleId: groupId } = clan || (await this.getClan(guildPosition));
    const memberRecord = member || (await this.getMember(guildPosition));
    const { googleId: userId } = await memberRecord.user;

    const isActive = guildPositions.some(({ to }) => !to);
    const isMember = await this.gsuiteService.hasMember({ groupId, userId });

    if (isActive && !isMember) {
      await this.gsuiteService.createMember({ groupId, userId, role: TeamRole.MEMBER });
    }

    if (!isActive && isMember) {
      await this.gsuiteService.deleteMember({ groupId, userId });
    }

    return true;
  }
}

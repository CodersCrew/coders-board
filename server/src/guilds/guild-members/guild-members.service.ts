import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { GsuiteService } from '../../gsuite/gsuite.service';
import { CreateGuildMemberInput } from './dto/create-guild-member.input';
import { GetGuildMembersArgs } from './dto/get-guild-members.args';
import { UpdateGuildMemberInput } from './dto/update-guild-member.input';
import { GuildMember } from './guild-member.model';
import { GuildMemberRepository } from './guild-member.repository';

@Injectable()
export class GuildMembersService {
  constructor(
    private readonly guildMemberRepository: GuildMemberRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  async getUser(id: string) {
    const guildMember = await this.findByIdOrThrow(id);
    return guildMember.user;
  }

  async getGuild(id: string) {
    const guildMember = await this.findByIdOrThrow(id);
    return guildMember.guild;
  }

  async getPositions(id: string, isActive?: boolean) {
    const guildMember = await this.findByIdOrThrow(id);
    const positions = await guildMember.positions;

    if (typeof isActive !== 'undefined') {
      return positions.filter(position => (isActive ? !position.to : position.to));
    }

    return positions;
  }

  findById(id: string): Promise<GuildMember | null> {
    if (!id) return null;

    return this.guildMemberRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<GuildMember> {
    if (!id) throw new BadRequestException();

    return this.guildMemberRepository.findOneOrFail(id);
  }

  findAll({ guildId }: GetGuildMembersArgs): Promise<GuildMember[]> {
    const query = this.guildMemberRepository.createQueryBuilder('guildMember');

    query.where('guildMember.guildId = :guildId', { guildId });

    return query.getMany();
  }

  async create(input: CreateGuildMemberInput) {
    const guildMember = await this.guildMemberRepository.save(input);
    const guild = await this.getGuild(guildMember.id);
    const user = await this.getUser(guildMember.id);

    try {
      await this.gsuiteService.createMember({
        groupId: guild.googleId,
        userId: user.googleId,
        role: input.role,
      });
    } catch {
      this.guildMemberRepository.delete(guildMember.id);
    }

    return guildMember;
  }

  async update({ id, guildId: _guildId, ...input }: UpdateGuildMemberInput) {
    const guildMember = await this.findByIdOrThrow(id);
    const guild = await this.getGuild(guildMember.id);
    const user = await this.getUser(guildMember.id);

    await this.gsuiteService.updateMember({
      groupId: guild.googleId,
      userId: user.googleId,
      role: input.role,
    });

    return this.guildMemberRepository.save({
      ...guildMember,
      ...input,
    });
  }

  async delete(id: string) {
    const guildMember = await this.findByIdOrThrow(id);
    const positions = await guildMember.positions;

    if (positions.length) {
      throw new ConflictException('You cannot remove guild member with attached positions');
    }

    const guild = await this.getGuild(guildMember.id);
    const user = await this.getUser(guildMember.id);

    await this.gsuiteService.deleteMember({ groupId: guild.googleId, userId: user.googleId });
    await this.guildMemberRepository.delete(id);

    return true;
  }
}

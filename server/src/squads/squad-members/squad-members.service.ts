import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { GsuiteService } from '../../gsuite/gsuite.service';
import { CreateSquadMemberInput } from './dto/create-squad-member.input';
import { GetSquadMembersArgs } from './dto/get-squad-members.args';
import { UpdateSquadMemberInput } from './dto/update-squad-member.input';
import { SquadMember } from './squad-member.model';
import { SquadMemberRepository } from './squad-member.repository';

@Injectable()
export class SquadMembersService {
  constructor(
    private readonly squadMemberRepository: SquadMemberRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  async getUser(id: string) {
    const squadMember = await this.findByIdOrThrow(id);
    return squadMember.user;
  }

  async getSquad(id: string) {
    const squadMember = await this.findByIdOrThrow(id);
    return squadMember.squad;
  }

  async getPositions(id: string, isActive?: boolean) {
    const squadMember = await this.findByIdOrThrow(id);
    const positions = await squadMember.positions;

    if (typeof isActive !== 'undefined') {
      return positions.filter(position => (isActive ? !position.to : position.to));
    }

    return positions;
  }

  findById(id: string): Promise<SquadMember | null> {
    if (!id) return null;

    return this.squadMemberRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<SquadMember> {
    if (!id) throw new BadRequestException();

    return this.squadMemberRepository.findOneOrFail(id);
  }

  findAll({ squadId }: GetSquadMembersArgs): Promise<SquadMember[]> {
    const query = this.squadMemberRepository.createQueryBuilder('squadMember');

    query.where('squadMember.squadId = :squadId', { squadId });

    return query.getMany();
  }

  async create(input: CreateSquadMemberInput) {
    const squadMember = await this.squadMemberRepository.save(input);
    const squad = await this.getSquad(squadMember.id);
    const user = await this.getUser(squadMember.id);

    try {
      await this.gsuiteService.createMember({
        groupId: squad.googleId,
        userId: user.googleId,
        role: input.role,
      });
    } catch {
      this.squadMemberRepository.delete(squadMember.id);
    }

    return squadMember;
  }

  async update({ id, squadId, ...input }: UpdateSquadMemberInput) {
    const squadMember = await this.squadMemberRepository.findOneOrFail({ where: { id, squadId } });
    const squad = await this.getSquad(squadMember.id);
    const user = await this.getUser(squadMember.id);

    await this.gsuiteService.updateMember({
      groupId: squad.googleId,
      userId: user.googleId,
      role: input.role,
    });

    return this.squadMemberRepository.save({
      ...squadMember,
      ...input,
    });
  }

  async delete(id: string) {
    const squadMember = await this.findByIdOrThrow(id);
    const positions = await squadMember.positions;

    if (positions.length) {
      throw new ConflictException('You cannot remove squad member with attached positions');
    }

    const squad = await this.getSquad(squadMember.id);
    const user = await this.getUser(squadMember.id);

    await this.gsuiteService.deleteMember({ groupId: squad.googleId, userId: user.googleId });
    await this.squadMemberRepository.delete(id);

    return true;
  }
}

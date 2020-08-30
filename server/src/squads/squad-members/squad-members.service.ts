import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { resolveAsyncRelation } from '../../common/utils';
import { GsuiteService } from '../../integrations';
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

  getUser = resolveAsyncRelation(this.squadMemberRepository, 'user');
  getSquad = resolveAsyncRelation(this.squadMemberRepository, 'squad');

  async getPositions(squadMember: SquadMember, isActive?: boolean) {
    const positions = await resolveAsyncRelation(this.squadMemberRepository, 'positions')(squadMember);

    if (typeof isActive !== 'undefined') {
      return positions.filter(position => (isActive ? !position.to : position.to));
    }

    return positions;
  }

  findById(id: string) {
    if (!id) return null;

    return this.squadMemberRepository.findOne(id);
  }

  findByIdOrThrow(id: string) {
    if (!id) throw new BadRequestException();

    return this.squadMemberRepository.findOneOrFail(id);
  }

  findAll({ squadId }: GetSquadMembersArgs) {
    const query = this.squadMemberRepository.createQueryBuilder('squadMember');

    query.where('squadMember.squadId = :squadId', { squadId });
    query.leftJoinAndSelect('squadMember.user', 'user');
    query.orderBy('user.fullName');

    return query.getMany();
  }

  async create(input: CreateSquadMemberInput) {
    const squadMember = await this.squadMemberRepository.save(input);
    const squad = await this.getSquad(squadMember);
    const user = await this.getUser(squadMember);

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

    await this.gsuiteService.updateMember({
      groupId: squadMember.squad.googleId,
      userId: squadMember.user.googleId,
      role: input.role,
    });

    return this.squadMemberRepository.save({
      ...squadMember,
      ...input,
    });
  }

  async delete(id: string) {
    const squadMember = await this.findByIdOrThrow(id);
    const positions = await this.getPositions(squadMember);

    if (positions.length) {
      throw new ConflictException('You cannot remove squad member with attached positions');
    }

    await this.gsuiteService.deleteMember({ groupId: squadMember.squad.googleId, userId: squadMember.user.googleId });
    await this.squadMemberRepository.remove(squadMember);

    return true;
  }
}

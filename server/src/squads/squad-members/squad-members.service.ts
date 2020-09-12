import { ConflictException, Injectable } from '@nestjs/common';

import { resolveAsyncRelation } from '../../common/utils';
import { CreateSquadMemberInput } from './dto/create-squad-member.input';
import { GetSquadMembersArgs } from './dto/get-squad-members.args';
import { UpdateSquadMemberInput } from './dto/update-squad-member.input';
import { SquadMember } from './squad-member.model';
import { SquadMemberRepository } from './squad-member.repository';

@Injectable()
export class SquadMembersService {
  constructor(private readonly squadMemberRepository: SquadMemberRepository) {}

  getUser = resolveAsyncRelation(this.squadMemberRepository, 'user');

  getSquad = resolveAsyncRelation(this.squadMemberRepository, 'squad');

  async getPositions(squadMember: SquadMember, isActive?: boolean) {
    const positions = await resolveAsyncRelation(this.squadMemberRepository, 'positions')(squadMember);

    if (typeof isActive !== 'undefined') {
      return positions.filter(position => (isActive ? !position.to : position.to));
    }

    return positions;
  }

  async findAll({ squadId, archived }: GetSquadMembersArgs) {
    const query = this.squadMemberRepository.createQueryBuilder('squadMember');

    query.where('squadMember.squadId = :squadId', { squadId });

    if (archived) {
      query.withDeleted();
    }

    query.leftJoinAndSelect('squadMember.user', 'user');
    query.orderBy('user.fullName');

    return query.getMany();
  }

  create(input: CreateSquadMemberInput) {
    return this.squadMemberRepository.save(input);
  }

  async update({ id, squadId, ...input }: UpdateSquadMemberInput) {
    const squadMember = await this.squadMemberRepository.findOneOrFail({ where: { id, squadId } });

    return this.squadMemberRepository.save({
      ...squadMember,
      ...input,
    });
  }

  async archive(id: string) {
    const squadMember = await this.squadMemberRepository.findOneOrFail(id);
    const positions = await this.getPositions(squadMember, true);

    if (positions.length) {
      throw new ConflictException('You cannot archive squad member with active positions');
    }

    await this.squadMemberRepository.softRemove(squadMember);

    return true;
  }

  async delete(id: string) {
    const squadMember = await this.squadMemberRepository.findOneOrFail(id);
    const positions = await this.getPositions(squadMember);

    if (positions.length) {
      throw new ConflictException('You cannot remove squad member with attached positions');
    }

    await this.squadMemberRepository.remove(squadMember);

    return true;
  }
}

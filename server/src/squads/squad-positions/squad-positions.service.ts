import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { resolveAsyncRelation } from '../../common/utils';
import { SquadMemberRepository } from '../squad-members/squad-member.repository';
import { CreateSquadPositionInput } from './dto/create-squad-position.input';
import { GetSquadPositionsArgs } from './dto/get-squad-positions.args';
import { UpdateSquadPositionInput } from './dto/update-squad-position.input';
import { SquadPosition } from './squad-position.model';
import { SquadPositionRepository } from './squad-position.repository';

@Injectable()
export class SquadPositionsService {
  constructor(
    @InjectRepository(SquadMemberRepository)
    private readonly squadMemberRepository: SquadMemberRepository,
    private readonly squadPositionRepository: SquadPositionRepository,
  ) {}

  getMember = resolveAsyncRelation(this.squadPositionRepository, 'member');

  getChapter = resolveAsyncRelation(this.squadPositionRepository, 'chapter');

  getPosition = resolveAsyncRelation(this.squadPositionRepository, 'position');

  async findAll({ squadId, memberId }: GetSquadPositionsArgs) {
    const query = this.squadPositionRepository.createQueryBuilder('squadPosition');

    query.innerJoinAndSelect('squadPosition.member', 'member');
    query.where('member.squadId = :squadId', { squadId });

    if (memberId) {
      query.andWhere('squadPosition.memberId = :memberId', { memberId });
    }

    return query.getMany();
  }

  create({ squadId: _squadId, ...input }: CreateSquadPositionInput) {
    return this.squadPositionRepository.save(input);
  }

  async update({ id, squadId: _squadId, ...input }: UpdateSquadPositionInput) {
    const squadPosition = await this.squadPositionRepository.findOne({ id }, { relations: ['member'] });

    const result = await this.squadPositionRepository.save({
      ...squadPosition,
      ...input,
    });

    if (!squadPosition.to && input.to) {
      this.deleteMemberWithoutPositions(result, Boolean(squadPosition.member.deletedAt));
    }

    if (squadPosition.to && !input.to && squadPosition.member.deletedAt) {
      await this.squadMemberRepository.restore(squadPosition.memberId);
    }

    return result;
  }

  async delete(id: string) {
    const squadPosition = await this.squadPositionRepository.findOneOrFail(id, { relations: ['member'] });

    await this.squadPositionRepository.remove(squadPosition);

    await this.deleteMemberWithoutPositions(squadPosition, Boolean(squadPosition.member.deletedAt));

    return true;
  }

  private async deleteMemberWithoutPositions(squadPosition: SquadPosition, isMemberSoftDeleted: boolean) {
    const memberPositions = await this.squadPositionRepository.find({
      where: { memberId: squadPosition.memberId },
    });

    const activePositions = memberPositions.filter(p => !p.to);

    if (memberPositions.length === 0) {
      await this.squadMemberRepository.delete({ id: squadPosition.memberId });
      return;
    }

    if (!isMemberSoftDeleted && activePositions.length === 0) {
      await this.squadMemberRepository.softDelete({ id: squadPosition.memberId });
    }
  }
}

import { ConflictException, Injectable } from '@nestjs/common';

import { resolveAsyncRelation } from '../../common/utils';
import { CreateSquadPositionInput } from './dto/create-squad-position.input';
import { GetSquadPositionsArgs } from './dto/get-squad-positions.args';
import { UpdateSquadPositionInput } from './dto/update-squad-position.input';
import { SquadPositionRepository } from './squad-position.repository';

@Injectable()
export class SquadPositionsService {
  constructor(private readonly squadPositionRepository: SquadPositionRepository) {}

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

    if (squadPosition.member.deletedAt) {
      throw new ConflictException(' You cannot update role of archived member');
    }

    return this.squadPositionRepository.save({
      ...squadPosition,
      ...input,
    });
  }

  async delete(id: string) {
    const squadPosition = await this.squadPositionRepository.findOneOrFail({
      where: { id },
      relations: ['member'],
    });

    if (squadPosition.member.deletedAt) {
      throw new ConflictException(' You cannot delete role of archived member');
    }

    await this.squadPositionRepository.remove(squadPosition);

    return true;
  }
}

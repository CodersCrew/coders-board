import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUndefined } from 'lodash';

import { resolveAsyncRelation } from '../../common/utils';
import { PositionRepository } from '../../positions/position.repository';
import { SquadPosition } from '../squad-positions/squad-position.model';
import { CreateSquadMemberInput } from './dto/create-squad-member.input';
import { GetSquadMembersArgs } from './dto/get-squad-members.args';
import { UpdateSquadMemberInput } from './dto/update-squad-member.input';
import { SquadMember } from './squad-member.model';
import { SquadMemberRepository } from './squad-member.repository';

@Injectable()
export class SquadMembersService {
  constructor(
    @InjectRepository(PositionRepository)
    private readonly positionRepository: PositionRepository,
    private readonly squadMemberRepository: SquadMemberRepository,
  ) {}

  getUser = resolveAsyncRelation(this.squadMemberRepository, 'user');

  getSquad = resolveAsyncRelation(this.squadMemberRepository, 'squad');

  async getPositions(squadMember: SquadMember, isActive?: boolean) {
    const positions = await resolveAsyncRelation(this.squadMemberRepository, 'positions')(squadMember);

    if (!isUndefined(isActive)) {
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

  async create({ positionId, ...input }: CreateSquadMemberInput) {
    const position = await this.positionRepository.findOneOrFail(positionId);

    const squadPosition = new SquadPosition();
    squadPosition.from = new Date();
    squadPosition.position = position;

    const squadMember = await this.squadMemberRepository.findOne({
      where: { userId: input.userId, squadId: input.squadId },
      withDeleted: true,
      relations: ['positions'],
    });

    if (squadMember?.deletedAt) {
      return this.squadMemberRepository.save({
        ...squadMember,
        ...input,
        positions: [...squadMember.positions, squadPosition],
        deletedAt: null,
      });
    }

    if (squadMember && !squadMember.deletedAt) {
      throw new ConflictException('Member already exists');
    }

    return this.squadMemberRepository.save({ ...input, positions: [squadPosition] });
  }

  async update({ id, squadId, ...input }: UpdateSquadMemberInput) {
    const squadMember = await this.squadMemberRepository.findOneOrFail({ where: { id, squadId } });

    return this.squadMemberRepository.save({
      ...squadMember,
      ...input,
    });
  }
}

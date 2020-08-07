import { BadRequestException, Injectable } from '@nestjs/common';

import { TeamRole } from '../../common/enums/team-role.enum';
import { GsuiteService } from '../../gsuite/gsuite.service';
import { Chapter } from '../chapters/chapter.model';
import { SquadMember } from '../squad-members/squad-member.model';
import { CreateSquadPositionInput } from './dto/create-squad-position.input';
import { GetSquadPositionsArgs } from './dto/get-squad-positions.args';
import { UpdateSquadPositionInput } from './dto/update-squad-position.input';
import { SquadPosition } from './squad-position.model';
import { SquadPositionRepository } from './squad-position.repository';

@Injectable()
export class SquadPositionsService {
  constructor(
    private readonly squadPositionRepository: SquadPositionRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  async getMember(id: string) {
    const squadPosition = await this.findByIdOrThrow(id);
    return squadPosition.member;
  }

  async getChapter(id: string) {
    const squadPosition = await this.findByIdOrThrow(id);
    return squadPosition.chapter;
  }

  findById(id: string): Promise<SquadPosition | null> {
    if (!id) return null;

    return this.squadPositionRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<SquadPosition> {
    if (!id) throw new BadRequestException();

    return this.squadPositionRepository.findOneOrFail(id);
  }

  findAll({ squadId, memberId }: GetSquadPositionsArgs): Promise<SquadPosition[]> {
    const query = this.squadPositionRepository.createQueryBuilder('squadPosition');

    query.innerJoinAndSelect('squadPosition.member', 'member');
    query.where('member.squadId = :squadId', { squadId });

    if (memberId) {
      query.andWhere('squadPosition.memberId = :memberId', { memberId });
    }

    return query.getMany();
  }

  async create({ squadId: _squadId, ...input }: CreateSquadPositionInput) {
    const squadPosition = await this.squadPositionRepository.save(input);

    try {
      await this.updateInGoogle(squadPosition);
    } catch (ex) {
      this.squadPositionRepository.delete(squadPosition.id);
      throw ex;
    }

    return squadPosition;
  }

  async update({ id, squadId: _squadId, ...input }: UpdateSquadPositionInput) {
    const squadPosition = await this.findByIdOrThrow(id);

    const updatedSquadPosition = await this.squadPositionRepository.save({
      ...squadPosition,
      ...input,
    });

    try {
      await this.updateInGoogle(squadPosition);
    } catch (ex) {
      await this.squadPositionRepository.save(squadPosition);
      throw ex;
    }

    return updatedSquadPosition;
  }

  async delete(id: string) {
    const squadPosition = await this.squadPositionRepository.findOneOrFail({
      where: { id },
      relations: ['member', 'chapter'],
    });
    const chapter = await this.getChapter(id);
    const member = await this.getMember(id);

    await this.squadPositionRepository.delete(id);

    try {
      await this.updateInGoogle(squadPosition, chapter, member);
    } catch (ex) {
      await this.squadPositionRepository.save(squadPosition);
      throw ex;
    }

    return true;
  }

  async updateInGoogle({ memberId, chapterId, id }: SquadPosition, chapter?: Chapter, member?: SquadMember) {
    if (!chapterId) return true;

    const squadPositions = await this.squadPositionRepository.find({ where: { memberId, chapterId } });
    const { googleId: groupId } = chapter || (await this.getChapter(id));
    const memberRecord = member || (await this.getMember(id));
    const { googleId: userId } = await memberRecord.user;

    const isActive = squadPositions.some(({ to }) => !to);
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

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateMemberPositionInput } from './dto/create-member-position.input';
import { GetMemberPositionsArgs } from './dto/get-member-positions.args';
import { UpdateMemberPositionInput } from './dto/update-member-position.input';
import { MemberPosition } from './member-position.model';
import { MemberPositionRepository } from './member-position.repository';

@Injectable()
export class MemberPositionsService {
  constructor(
    @InjectRepository(MemberPositionRepository)
    private readonly memberPositionRepository: MemberPositionRepository,
  ) {}

  async getPosition(memberPositionId: string) {
    const memberPosition = await this.findByIdOrThrow(memberPositionId);
    return memberPosition.position;
  }

  async getTeamMember(memberPositionId: string) {
    const memberPosition = await this.findByIdOrThrow(memberPositionId);
    return memberPosition.teamMember;
  }

  findByIdOrThrow(memberPositionId: string): Promise<MemberPosition> {
    if (!memberPositionId) throw new BadRequestException();

    return this.memberPositionRepository.findOneOrFail(memberPositionId);
  }

  findAll({ teamMemberId }: GetMemberPositionsArgs) {
    return this.memberPositionRepository.find({ where: { teamMemberId } });
  }

  async create(input: CreateMemberPositionInput): Promise<MemberPosition> {
    return this.memberPositionRepository.save(input);
  }

  async update({ id, ...input }: UpdateMemberPositionInput): Promise<MemberPosition> {
    const position = await this.findByIdOrThrow(id);

    return this.memberPositionRepository.save({
      ...position,
      ...input,
    });
  }

  async delete(memberPositionId: string): Promise<boolean> {
    const memberPosition = await this.memberPositionRepository.findOne(memberPositionId);

    if (!memberPosition) {
      throw new NotFoundException();
    }

    await this.memberPositionRepository.delete(memberPositionId);

    return true;
  }
}

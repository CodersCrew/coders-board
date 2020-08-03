import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual, pick } from 'lodash';

import { brackets } from '../common/utils/brackets';
import { GsuiteService } from '../gsuite/gsuite.service';
import { UpdateGroupParams } from '../gsuite/interfaces/update-group.params';
import { CreateSquadInput } from './dto/create-squad.input';
import { GetSquadsArgs } from './dto/get-squads.args';
import { UpdateSquadInput } from './dto/update-squad.input';
import { Squad } from './squad.model';
import { SquadRepository } from './squad.repository';

@Injectable()
export class SquadsService {
  constructor(
    @InjectRepository(SquadRepository)
    private readonly squadRepository: SquadRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  async getChapters(id: string) {
    const squad = await this.findByIdOrThrow(id);
    return squad.chapters;
  }

  async getMembers(id: string) {
    const squad = await this.findByIdOrThrow(id);
    return squad.members;
  }

  findById(id: string): Promise<Squad | null> {
    if (!id) return null;

    return this.squadRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<Squad> {
    if (!id) throw new BadRequestException();

    return this.squadRepository.findOneOrFail(id);
  }

  findAll({ search }: GetSquadsArgs): Promise<Squad[]> {
    const query = this.squadRepository.createQueryBuilder('squad');

    if (search) {
      const searchQuery = brackets(
        ['squad.name LIKE :search', 'squad.email LIKE :search', 'squad.description LIKE :search'].join(' OR '),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    return query.getMany();
  }

  async create(input: CreateSquadInput): Promise<Squad> {
    const googleId = await this.gsuiteService.createGroup(input);

    return this.squadRepository.save({ ...input, googleId });
  }

  async update({ id, ...input }: UpdateSquadInput): Promise<Squad> {
    const squad = await this.findByIdOrThrow(id);

    const googlePropNames: (keyof Omit<UpdateGroupParams, 'id'>)[] = ['name', 'description', 'email'];

    if (!isEqual(pick(input, googlePropNames), pick(squad, googlePropNames))) {
      await this.gsuiteService.updateGroup({ ...input, id: squad.googleId });
    }

    return this.squadRepository.save({ ...squad, ...input });
  }

  async delete(id: string): Promise<boolean> {
    const squad = await this.findByIdOrThrow(id);

    const members = await squad.members;

    if (members.length) {
      throw new ConflictException('You cannot remove a squad with members');
    }

    const chapters = await squad.chapters;

    if (chapters.length) {
      throw new ConflictException('You cannot remove a squad with chapters');
    }

    await this.gsuiteService.deleteGroup({ id: squad.googleId });
    await this.squadRepository.delete(id);

    return true;
  }
}

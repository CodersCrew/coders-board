import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { brackets } from '../common/utils/brackets';
import { GsuiteService } from '../gsuite/gsuite.service';
import { CreateTeamInput } from './dto/create-team.input';
import { GetTeamsArgs } from './dto/get-teams.args';
import { Team } from './team.model';
import { TeamRepository } from './team.repository';
import { checkKindRelation } from './teams.utils';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamRepository)
    private readonly teamRepository: TeamRepository,
    private readonly gsuiteService: GsuiteService,
  ) {}

  async getParent(teamId: string) {
    const team = await this.findByIdOrThrow(teamId);
    return team.parent;
  }

  async getChildren(teamId: string) {
    const team = await this.findByIdOrThrow(teamId);
    const children = await team.children;
    return children || [];
  }

  async getPositions(teamId: string) {
    const team = await this.findByIdOrThrow(teamId);
    return team.positions;
  }

  async getMembers(teamId: string) {
    const team = await this.findByIdOrThrow(teamId);
    return team.members;
  }

  findById(id: string): Promise<Team | null> {
    if (!id) return null;

    return this.teamRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<Team> {
    if (!id) throw new BadRequestException();

    return this.teamRepository.findOneOrFail(id);
  }

  findAll({ kind, search, parentId }: GetTeamsArgs): Promise<Team[]> {
    const query = this.teamRepository.createQueryBuilder('team');

    if (parentId) {
      query.andWhere('team.parentId = :parentId', { parentId });
    }

    if (kind) {
      query.andWhere('team.kind = :kind', { kind });
    }

    if (search) {
      const searchQuery = brackets(
        ['team.name LIKE :search', 'team.email LIKE :search', 'team.description LIKE :search'].join(' OR '),
      );

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    return query.getMany();
  }

  async create({ parentId, ...input }: CreateTeamInput): Promise<Team> {
    let parent: Team | undefined;

    if (parentId) {
      parent = await this.teamRepository.findOne(parentId);
    }

    checkKindRelation(input.kind, parent);

    const googleId = await this.gsuiteService.createGroup({
      ...input,
      name: parent ? `${parent.name} | ${input.name}` : input.name,
    });

    return this.teamRepository.save({ ...input, googleId, parent: Promise.resolve(parent) });
  }

  async delete(teamId: string): Promise<boolean> {
    const team = await this.findByIdOrThrow(teamId);

    const children = await this.getChildren(teamId);

    if (children.length) {
      throw new ConflictException("You can't remove team that contains children teams");
    }

    const members = await this.getMembers(teamId);

    if (members.length) {
      throw new ConflictException("You can't remove team that contains members");
    }

    const positions = await this.getPositions(teamId);

    if (positions.length) {
      throw new ConflictException("You can't remove team that contains positions");
    }

    await this.gsuiteService.deleteGroup(team.googleId);
    await this.teamRepository.delete(teamId);

    return true;
  }
}

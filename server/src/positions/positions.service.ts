import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { brackets } from '../common/utils/brackets';
import { CreatePositionInput } from './dto/create-position.input';
import { GetPositionsArgs } from './dto/get-positions.args';
import { UpdatePositionInput } from './dto/update-position.input';
import { Position } from './position.model';
import { PositionRepository } from './position.repository';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(PositionRepository)
    private readonly positionRepository: PositionRepository,
  ) {}

  findById(id: string): Promise<Position | null> {
    if (!id) return null;

    return this.positionRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<Position | null> {
    if (!id) throw new BadRequestException();

    return this.positionRepository.findOneOrFail(id);
  }

  findAll({ search, teamId, global }: GetPositionsArgs): Promise<Position[]> {
    if (Boolean(global) && Boolean(teamId)) {
      throw new UnprocessableEntityException('"global" and "teamId" filters cannot be specified together');
    }

    const query = this.positionRepository.createQueryBuilder('position');

    if (teamId) {
      query.andWhere('position.teamId = :teamId', { teamId });
    }

    if (typeof global !== 'undefined') {
      query.andWhere(`position.teamId IS ${global ? '' : 'NOT'} NULL`);
    }

    if (search) {
      const searchQuery = brackets(['position.name LIKE :search', 'position.description LIKE :search'].join(' OR '));

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    return query.getMany();
  }

  async getTeam(positionId: string) {
    const position = await this.findByIdOrThrow(positionId);
    return position.team;
  }

  async create(input: CreatePositionInput): Promise<Position> {
    return this.positionRepository.save(input);
  }

  async update({ id, ...input }: UpdatePositionInput): Promise<Position> {
    const position = await this.findByIdOrThrow(id);

    return this.positionRepository.save({
      ...position,
      ...input,
    });
  }

  async delete(positionId: string): Promise<boolean> {
    const position = await this.positionRepository.findOne(positionId);

    if (!position) {
      throw new NotFoundException();
    }

    const users = await position.users;

    if (users.length) {
      throw new ConflictException("You can't remove position as it's assigned to users");
    }

    await this.positionRepository.delete(positionId);

    return true;
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';

import { brackets } from '../common/utils/brackets';
import { CreatePositionInput } from './dto/create-position.input';
import { GetPositionsArgs } from './dto/get-positions.args';
import { UpdatePositionInput } from './dto/update-position.input';
import { Area, areaKeys, Position } from './position.model';
import { PositionRepository } from './position.repository';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(PositionRepository)
    private readonly positionRepository: PositionRepository,
  ) {}

  async getArea(id: string): Promise<Area | null> {
    const position = await this.findByIdOrThrow(id);

    if (position.guildId) {
      const guild = await position.guild;
      return pick(guild, areaKeys);
    }

    if (position.clanId) {
      const clan = await position.clan;
      return pick(clan, areaKeys);
    }

    return null;
  }

  async getImage(id: string): Promise<string | null> {
    const position = await this.findByIdOrThrow(id);

    if (position.image) return position.image;

    if (position.guildId) {
      const guild = await position.guild;
      return guild.image;
    }

    if (position.clanId) {
      const clan = await position.clan;
      return clan.image;
    }

    return null;
  }

  findById(id: string): Promise<Position | null> {
    if (!id) return null;

    return this.positionRepository.findOne(id);
  }

  findByIdOrThrow(id: string): Promise<Position> {
    if (!id) throw new BadRequestException();

    return this.positionRepository.findOneOrFail(id);
  }

  findAll({ search, clanId, guildId }: GetPositionsArgs): Promise<Position[]> {
    const query = this.positionRepository.createQueryBuilder('position');

    if (search) {
      const searchQuery = brackets(['position.name LIKE :search', 'position.description LIKE :search'].join(' OR '));

      query.andWhere(searchQuery, { search: `%${search}%` });
    }

    if (clanId) {
      query.andWhere('position.clanId = :clanId', { clanId });
    }

    if (guildId) {
      query.andWhere('position.guildId = :guildId', { guildId });
    }

    return query.getMany();
  }

  async create(input: CreatePositionInput): Promise<Position> {
    return this.positionRepository.save(input);
  }

  async update({ id, ...input }: UpdatePositionInput): Promise<Position> {
    const position = await this.findByIdOrThrow(id);

    return this.positionRepository.save({ ...position, ...input });
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.positionRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException();
    }

    return true;
  }
}

import { EntityRepository, Repository } from 'typeorm';

import { Position } from './position.model';

@EntityRepository(Position)
export class PositionRepository extends Repository<Position> {}

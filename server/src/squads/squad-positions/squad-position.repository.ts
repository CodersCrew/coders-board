import { EntityRepository, Repository } from 'typeorm';

import { SquadPosition } from './squad-position.model';

@EntityRepository(SquadPosition)
export class SquadPositionRepository extends Repository<SquadPosition> {}

import { EntityRepository, Repository } from 'typeorm';

import { Squad } from './squad.model';

@EntityRepository(Squad)
export class SquadRepository extends Repository<Squad> {}

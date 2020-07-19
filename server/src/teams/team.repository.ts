import { EntityRepository, Repository } from 'typeorm';

import { Team } from './team.model';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {}

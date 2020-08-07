import { EntityRepository, Repository } from 'typeorm';

import { GuildPosition } from './guild-position.model';

@EntityRepository(GuildPosition)
export class GuildPositionRepository extends Repository<GuildPosition> {}

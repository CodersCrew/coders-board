import { EntityRepository, Repository } from 'typeorm';

import { Guild } from './guild.model';

@EntityRepository(Guild)
export class GuildRepository extends Repository<Guild> {}

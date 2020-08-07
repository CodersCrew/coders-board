import { EntityRepository, Repository } from 'typeorm';

import { Clan } from './clan.model';

@EntityRepository(Clan)
export class ClanRepository extends Repository<Clan> {}
